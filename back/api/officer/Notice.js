const express = require('express');
const multer = require('multer');
const { storage, ref, deleteObject, uploadBytes, getDownloadURL } = require('../../firebase');
const Notice = require('../../models/notice');
const { v4: uuidv4 } = require('uuid'); // To generate unique file names
const cron = require('node-cron');
const mongoose = require('mongoose');

const app = express();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Function to handle notice upload
const handleNoticeUpload = async (req, res) => {
  try {
    const { notice } = req.body;
    const file = req.file;
    const uniqueFilename = `${uuidv4()}_${file.originalname}`;

    // Upload file to Firebase Storage
    const fileRef = ref(storage, `notices/${uniqueFilename}`);
    await uploadBytes(fileRef, file.buffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);

    const newNotice = new Notice({
      notice,
      image: downloadURL,
      createdAt: new Date(), // Ensure createdAt field is set
    });

    await newNotice.save();

    res.json({ message: 'Notice added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

app.post('/photos', upload.single('image'), handleNoticeUpload);

// Routes
app.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/notices/:id
app.delete('/notices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);

    if (notice) {
      // Delete the image from Firebase Storage
      const fileRef = ref(storage, notice.image);
      await deleteObject(fileRef);
    }

    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Cron job to delete notices and images older than 1 month
cron.schedule('0 0 * * *', async () => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const oldNotices = await Notice.find({ createdAt: { $lt: oneMonthAgo } });

    for (const notice of oldNotices) {
      const fileRef = ref(storage, notice.image);
      await deleteObject(fileRef);
      await Notice.findByIdAndDelete(notice._id);
    }

    console.log('Old notices and their images deleted successfully.');
  } catch (error) {
    console.error('Error deleting old notices and their images:', error);
  }
});

module.exports = app;
