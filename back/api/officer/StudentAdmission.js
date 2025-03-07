const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const Student = require("../../models/Officer/StudentAdmission");
const ApprovedStudent = require("../../models/Officer/ApprovedStudents");

const router = express.Router();

// Multer storage configuration for handling file uploads
const sanitizeFilename = (name) => {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/capadmin/studentsphoto/');
  },
  filename: function (req, file, cb) {
    const fileId = new mongoose.Types.ObjectId();
    const studentName = sanitizeFilename(req.body.name || 'unknown'); // Fallback to 'unknown' if name is not provided
    const filename = `${studentName}_${fileId}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.post('/studentAdmission', upload.single('photo'), async (req, res) => {
  try {
    
    photo = req.file ? req.file.path : null;


    // Check if student is already registered by email and course in both collections
    const existingStudent = await Student.findOne({
      email: req.body.email,
      course: req.body.course
    });
    const existingApprovedStudent = await ApprovedStudent.findOne({
      email: req.body.email,
      course: req.body.course
    });

    if (existingStudent || existingApprovedStudent) {
      return res.status(400).json({ message: "Student is already registered for this course" });
    }

    // Generate new admission ID
    const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of current year
    const lastStudent = await ApprovedStudent.findOne().sort({ admissionId: -1 });

    let newAdmissionId = "001"; // Default ID if no previous students found
    if (lastStudent && lastStudent.admissionId) {
      const lastAdmissionId = lastStudent.admissionId.split("/")[0];
      const newIdNumber = (parseInt(lastAdmissionId, 10) + 1)
        .toString()
        .padStart(3, "0");
      newAdmissionId = `${newIdNumber}/${currentYear}`;
    } else {
      newAdmissionId = `001/${currentYear}`;
    }

    const newStudent = new Student({
      ...req.body,
      admissionId: newAdmissionId,
      photo: photo,
      submissionDate: new Date(),
      qualify: {
        exam: req.body["qualify.exam"],
        board: req.body["qualify.board"],
        regNo: req.body["qualify.regNo"],
        examMonthYear: req.body["qualify.examMonthYear"],
        percentage: req.body["qualify.percentage"],
        cgpa: req.body["qualify.cgpa"],
        institution: req.body["qualify.institution"],
      },
      parentDetails: {
        fatherName: req.body["parentDetails.fatherName"],
        fatherOccupation: req.body["parentDetails.fatherOccupation"],
        fatherMobileNo: req.body["parentDetails.fatherMobileNo"],
        motherName: req.body["parentDetails.motherName"],
        motherOccupation: req.body["parentDetails.motherOccupation"],
        motherMobileNo: req.body["parentDetails.motherMobileNo"],
      },
      bankDetails: {
        bankName: req.body["bankDetails.bankName"],
        branch: req.body["bankDetails.branch"],
        accountNo: req.body["bankDetails.accountNo"],
        ifscCode: req.body["bankDetails.ifscCode"],
      },
      achievements: {
        arts: req.body["achievements.arts"],
        sports: req.body["achievements.sports"],
        other: req.body["achievements.other"],
      },
      marks: {
        boardType: req.body["marks.boardType"],
        physics: req.body["marks.physics"],
        chemistry: req.body["marks.chemistry"],
        maths: req.body["marks.maths"],
      },
      certificates: {
        tenth: req.body["certificates.tenth"],
        plusTwo: req.body["certificates.plusTwo"],
        tcandconduct: req.body["certificates.tcandconduct"],
        allotmentmemo: req.body["certificates.allotmentmemo"],
        Datasheet: req.body["certificates.Datasheet"],
        physicalfitness: req.body["certificates.physicalfitness"],
        passportsizephoto: req.body["certificates.passportsizephoto"],
        incomecertificates: req.body["certificates.incomecertificates"],
        communitycertificate: req.body["certificates.communitycertificate"],
        castecertificate: req.body["certificates.castecertificate"],
        aadhaar: req.body["certificates.aadhaar"],
        marklist: req.body["certificates.marklist"],
        degreecertificates: req.body["certificates.degreecertificates"],
        other: req.body["certificates.other"],
      },
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student data saved successfully", data: newStudent });
  } catch (error) {
    console.error("Error saving student data:", error);
    res.status(500).json({ message: "Error saving student data", error });
  }
  
});


module.exports = router;