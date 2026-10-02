const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for now, assuming auth is separate or linked later
  },

  // ── Personal Details ─────────────────────────────────────────────────────
  personalDetails: {
    fullName:             { type: String, required: true },
    email:                { type: String, required: true, unique: true },
    phone:                { type: String },
    location:             { type: String },
    college:              { type: String },
    branch: {
      type: String,
      enum: ['CS', 'IT', 'TT', 'APM', 'ECE', 'EE', 'ME', 'Other'],
      required: true
    },
    graduationYear:       { type: Number, required: true },
    communicationAddress: { type: String }   // ← NEW: full formatted address
  },

  // ── Academic Details ─────────────────────────────────────────────────────
  academicDetails: {
    // Graduation
    cgpa:                 { type: Number, required: true },
    backlogs:             { type: Number, default: 0 },
    graduationUniversity: { type: String },

    // Class 10 — Madhyamik / Secondary
    madhyamikSchool:      { type: String },
    madhyamikBoard:       { type: String },
    madhyamikPercent:     { type: Number },
    madhyamikYear:        { type: Number },

    // Class 12 — Higher Secondary
    higherSecSchool:      { type: String },
    higherSecBoard:       { type: String },
    higherSecStream:      { type: String },
    higherSecPercent:     { type: Number },
    higherSecYear:        { type: Number },

    // Legacy fields kept for backward compat
    tenthPercentage:      { type: Number },
    twelfthPercentage:    { type: Number },
    diplomaPercentage:    { type: Number }
  },

  // ── Technical Skills ─────────────────────────────────────────────────────
  technicalSkills: {
    programmingLanguages: [{ type: String }],
    webTechnologies:      [{ type: String }],
    databases:            [{ type: String }],
    otherSkills:          [{ type: String }],
    dsaLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'None'],
      default: 'Beginner'
    }
  },

  // ── Projects ─────────────────────────────────────────────────────────────
  projects: [{
    projectName:       { type: String },
    description:       { type: String },
    technologiesUsed:  [{ type: String }],
    projectType:       { type: String },
    duration:          { type: String },
    githubUrl:         { type: String },
    liveUrl:           { type: String }
  }],

  // ── 4. Hackathons & Flagship Projects ────────────────────────────────────
  hackathons: [{
    name:        { type: String },
    role:        { type: String },
    techStack:   { type: String },
    description: { type: String },
    links:       { type: String }
  }],

  // ── 5. Coding Contests & Competitive Programming ─────────────────────────
  codingContests: [{
    platform:    { type: String },   // e.g. LeetCode, Codeforces, HackerRank
    rating:      { type: String },   // Rating / Rank
    achievement: { type: String }    // Notable contest achievement
  }],

  // ── 6. Internships & Work Experience (expanded) ──────────────────────────
  internships: [{
    company:      { type: String },
    role:         { type: String },
    startDate:    { type: String },
    endDate:      { type: String },
    deliverables: { type: String },   // Key deliverables / technologies
    // Legacy field kept for backward compat
    duration:     { type: String },
    technologies: [{ type: String }],
    description:  { type: String }
  }],

  // ── 7. Workshops & Seminars Attended ─────────────────────────────────────
  workshops: [{
    title:     { type: String },
    organizer: { type: String },
    date:      { type: String },
    duration:  { type: String },
    learnings: { type: String }   // Key learnings / certifications
  }],

  // ── 8. Extracurricular Activities ────────────────────────────────────────
  extracurricular: [{
    activity:    { type: String },
    role:        { type: String },
    description: { type: String }
  }],

  // ── Legacy: Certifications & Achievements ────────────────────────────────
  certifications: [{
    certificateName: { type: String },
    organization:    { type: String },
    technology:      { type: String },
    date:            { type: Date }
  }],
  achievements: [{
    achievement:  { type: String },
    description:  { type: String }
  }]

}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
