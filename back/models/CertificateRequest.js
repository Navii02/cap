// models/CertificateRequest.js

const mongoose = require('mongoose');

const certificateRequestSchema = new mongoose.Schema({
  RegisterNo:  { type: String },
  name: { type: String },
  userEmail: String,
  reason: String,
  branch: String,
  semester: String,
  course: String,
  selectedDocuments: [String],
  HoDstatus: { type: String, default: 'Pending' },
  status: { type: String, default: 'Pending' },
  studentName: { type: String },
  fileUrl: { type: String },
  declineReason: String,
  acceptedBy: String,
  hodDeclineReason: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  },
}, { timestamps: true });

const CertificateRequest = mongoose.model('CertificateRequest', certificateRequestSchema);

module.exports = CertificateRequest;