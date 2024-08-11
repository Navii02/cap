const mongoose = require('mongoose');

const ApprovedStudentSchema = new mongoose.Schema({
  customId: String,
  admissionNumber: { type: String },
  name: { type: String},
  admissionType: String,
  admissionId: String,
  allotmentCategory: String,
  feeCategory: String,
  otherCertificate: String,
  category:String,
  photo: String, // Store file path for photo
  address: String,
  permanentAddress: { type: String, default: 'N/A' },
  pincode: String,
  religion: { type: String, default: 'N/A' },
  community:{ type: String, default: 'N/A' },
  gender: String,
  dateOfBirth: Date,
  bloodGroup: { type: String, default: 'N/A' },
  mobileNo: String,
  whatsappNo: String,
  entranceExam: { type: String, default: 'N/A' },
  entranceRollNo: { type: String, default: 'N/A' },
  entranceRank: { type: String, default: 'N/A' },
  aadharNo: { type: String, default: 'N/A' },
  physics: String,
  chemistry: String,
  maths: String,
  RollNo: String,
  boardType:String, 
  course: String,
  qualify: {
    exam: { type: String, default: 'N/A' },
    board: { type: String, default: 'N/A' },
    regNo:{ type: String, default: 'N/A' },
    examMonthYear: { type: String, default: 'N/A' },
    percentage:{ type: String, default: 'N/A' },
    institution: { type: String, default: 'N/A' },
    cgpa:{ type: String, default: 'N/A' },
  },
  parentDetails: {
    fatherName: { type: String, default: 'Nil' },
    fatherOccupation: { type: String, default: 'Nil' },
    fatherMobileNo: { type: String, default: 'Nil' },
    motherName: { type: String, default: 'Nil' },
    motherOccupation: { type: String, default: 'Nil' },
    motherMobileNo: { type: String, default: 'Nil' },
  },
  annualIncome: { type: String, default: 'N/A' },
  nativity:  { type: String, default: 'N/A' },
  bankDetails: {
    bankName: { type: String, default: 'N/A' },
    branch:  { type: String, default: 'N/A' },
    accountNo:  { type: String, default: 'N/A' },
    ifscCode:  { type: String, default: 'N/A' },
  },
  achievements: {
    arts: { type: String, default: 'Nil' },
    sports:  { type: String, default: 'Nil' },
    other: { type: String, default: 'Nil' },
  },
  marks:{
    boardType: { type: String, default: 'Nil' },
    physics:{ type: String, default: 'Nil' },
    chemistry:{ type: String, default: 'Nil' },
    maths: { type: String, default: 'Nil' },
  },
  
  certificates: {
    tenth: { type: Boolean, default: false },
    plusTwo: { type: Boolean, default: false },
    tcandconduct: { type: Boolean, default: false },
    allotmentmemo: { type: Boolean, default: false },
    Datasheet: { type: Boolean, default: false },
    physicalfitness: { type: Boolean, default: false },
    passportsizephoto: { type: Boolean, default: false },
    incomecertificates: { type: Boolean, default: false },
    communitycertificate: { type: Boolean, default: false },
    castecertificate: { type: Boolean, default: false },
    aadhaar: { type: Boolean, default: false },
    marklist: { type: Boolean, default: false },
    degreecertificates: { type:Boolean, default: false},
    other: { type: Boolean, default: false },
  },
  RollNo: { type: String,default: 'Nil'},
  academicYear: String,
  semester: String,
  assignments: { type: String, default: 'Not Assigned' },
  exams: { type: String, default: 'Not Scheduled' },
  
  installmentsPaid: [Number],
 
 RegisterNo: { type: String,default: 'Nil'},
  email: { type: String, required: true },
  collegemail:{ type: String,default: 'Nil'}, // Array of strings (email addresses)
  tutormessage: [String], // Array of strings
  isMinor: { type: Boolean, default: true},
  internalMarks: [
    {
      subject: String,
  examMarks1: { type: Number, default: 0 },
  examMarks2: { type: Number, default: 0 },
  assignmentMarks1: { type: Number, default: 0 },
  assignmentMarks2: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  internalMarks: { type: Number, default: 0 },
  recordMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
    }
  ],
  LabInternal:[
    {
      subject:String,
      attendance: { type: Number, default: 0 },
  internalMarks: { type: Number, default: 0 },
  recordMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },

    }
  ],
  attendance: [
    {
    date: { type: String, required: true },
    subject: { type: String, required: true },
    hour: { type: String, required: true },
    teachername: { type: String, required: true },
    status: { type: String, required: true },
    lab: { type: String},
    }
  ],
  lab: { type: String,default:'Lab 1'},
  subjectPercentages: [{
    subject: { type: String, required: true },
    percentage: { type: Number, required: true }
  }],
  submissionDate: {
    type: Date,
    // Set the default value to the current date and time
  },

});

// Pre-save middleware to generate custom ID before saving
ApprovedStudentSchema.pre('save', function(next) {
  const currentYear = new Date().getFullYear();
  this.customId = `${this.admissionNumber}/${currentYear}`;
  next();
});

const ApprovedStudent = mongoose.model('ApprovedStudent', ApprovedStudentSchema);

module.exports = ApprovedStudent;
