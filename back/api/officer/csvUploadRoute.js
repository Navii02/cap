const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const ApprovedStudent = require('../../models/Officer/ApprovedStudents');

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// CSV upload endpoint
router.post('/csv/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await ApprovedStudent.insertMany(results);
        fs.unlinkSync(filePath); // Remove the file after processing
        res.status(200).json({ message: 'CSV file processed and data inserted successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error processing CSV file.', error });
      }
    });
});

module.exports = router;
