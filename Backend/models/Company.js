const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Service-Based', 'Product-Based', 'Startups'],
    required: true 
  },
  description: { type: String },
  minimumCGPA: { type: Number, required: true },
  maximumBacklogs: { type: Number, required: true },
  eligibleBranches: [{ type: String }],
  graduationYears: [{ type: Number }],
  requiredSkills: [{ type: String }],
  preferredSkills: [{ type: String }],
  requiredProgrammingLanguages: [{ type: String }],
  requiredDatabaseSkills: [{ type: String }],
  requiredWebSkills: [{ type: String }],
  requiredDSALevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'None'],
    default: 'None'
  },
  projectRequired: { type: Boolean, default: false },
  internshipPreferred: { type: Boolean, default: false },
  certificationPreferred: { type: Boolean, default: false },
  jobRoles: [{ type: String }] // e.g., ["Backend Developer", "Frontend Developer"]
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
