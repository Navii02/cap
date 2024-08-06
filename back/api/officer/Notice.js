const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cron = require('node-cron');
const fs = require('fs');
const Notice = require('../../models/Notice');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });



// Function to handle notice upload
const handleNoticeUpload = async (req, res) => {
  try {
    const { notice } = req.body;
    const { filename } = req.file;

    const newNotice = new Notice({
      notice,
      image: filename,
    });

    await newNotice.save();
    console.log("Success");

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

app.delete('/notices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);

    if (notice) {
      // Delete the image from local storage
      fs.unlink(path.join(__dirname, '../../uploads', notice.image), (err) => {
        if (err) {
          console.error('Failed to delete image:', err);
        }
      });
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
      fs.unlink(path.join(__dirname, '../../uploads', notice.image), (err) => {
        if (err) {
          console.error('Failed to delete image:', err);
        }
      });
      await Notice.findByIdAndDelete(notice._id);
    }
  } catch (error) {
    console.error('Error deleting old notices and their images:', error);
  }
});


module.exports = app;