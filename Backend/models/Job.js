const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  officialUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Product-Based', 'Service-Based', 'Unicorns', 'Startups', 'FinTech', 'Consulting', 'Other'],
    default: 'Product-Based'
  },
  technicalRole: {
    type: String,
    required: [true, 'Technical role is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  responsibilities: [{
    type: String
  }],
  requiredSkills: [{
    type: String
  }],
  preferredSkills: [{
    type: String
  }],
  eligibility: {
    requiredDegree: {
      type: String,
      default: 'B.Tech / B.E. / MCA'
    },
    eligibleBranches: [{
      type: String
    }],
    minimumCGPA: {
      type: Number,
      default: 6.0
    },
    maximumBacklogs: {
      type: Number,
      default: 0
    },
    eligibleBatches: [{
      type: Number
    }],
    experienceLevel: {
      type: String,
      enum: ['Fresher', '0-1 Years', '1-2 Years', '2+ Years'],
      default: 'Fresher'
    }
  },
  location: {
    type: String,
    default: 'Bangalore / Pan India'
  },
  workMode: {
    type: String,
    enum: ['On-site', 'Hybrid', 'Remote'],
    default: 'Hybrid'
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Internship', 'Contract', 'Intern to Full-time'],
    default: 'Full-time'
  },
  salary: {
    type: String,
    default: '6.5 - 12 LPA'
  },
  vacancies: {
    type: Number,
    default: 5
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: [true, 'Application deadline is required']
  },
  selectionProcess: [{
    type: String
  }],
  additionalInstructions: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Closed'],
    default: 'Active'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ companyName: 1, title: 1 });

module.exports = mongoose.model('Job', jobSchema);
