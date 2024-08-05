// HODDetailSchema.js
const mongoose = require('mongoose');

const hodDetailSchema = new mongoose.Schema({
  teacherId: mongoose.Schema.Types.ObjectId,
  teachername: String,
  email: String,
  subjects: [String],
  subjectCode: [String],
  branches: [String],
  semesters: [String],
  academicYear: String,
  department: String,
  isHOD: {
    type: Boolean,
    default: false,
  },
});

const HODDetail = mongoose.model('hoddetails', hodDetailSchema);

module.exports = HODDetail;
