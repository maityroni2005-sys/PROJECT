const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true,
    index: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentPhone: {
    type: String,
    default: ''
  },
  studentBranch: {
    type: String,
    default: 'Other'
  },
  studentCGPA: {
    type: Number,
    default: 0
  },
  studentProfileSnapshot: {
    type: Object,
    default: {}
  },
  mlMatchScore: {
    type: Number,
    default: 0
  },
  matchedSkills: [{
    type: String
  }],
  missingSkills: [{
    type: String
  }],
  atsScore: {
    type: Number,
    default: 75
  },
  resumeType: {
    type: String,
    enum: ['generated', 'uploaded'],
    default: 'generated'
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  resumeFileName: {
    type: String,
    default: 'EduScope_Resume.pdf'
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
    default: 'Applied'
  },
  statusHistory: [{
    status: { type: String },
    updatedAt: { type: Date, default: Date.now },
    comment: { type: String, default: '' }
  }],
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

jobApplicationSchema.index({ job: 1, studentEmail: 1 }, { unique: true });
jobApplicationSchema.index({ studentEmail: 1, status: 1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
