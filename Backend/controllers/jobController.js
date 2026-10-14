const mongoose = require('mongoose');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const DEMO_JOBS = require('../config/seedJobs');

// In-memory runtime fallback cache if MongoDB is offline
let memoryJobs = [...DEMO_JOBS];
let memoryApplications = [];

// Helper to check MongoDB health
const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Deterministic ML Match Score & Skill Comparison
 */
function calculateJobMatch(student, job) {
  const studentSkills = [
    ...(student.programmingLanguages || student.programming ? (student.programming || '').split(',').map(s => s.trim()) : []),
    ...(student.webTechnologies || student.web ? (student.web || '').split(',').map(s => s.trim()) : []),
    ...(student.databases ? (student.databases || '').split(',').map(s => s.trim()) : []),
    ...(student.otherSkills || [])
  ].map(s => String(s).toLowerCase().trim()).filter(Boolean);

  const reqSkills = (job.requiredSkills || []).map(s => String(s).toLowerCase().trim());
  const prefSkills = (job.preferredSkills || []).map(s => String(s).toLowerCase().trim());

  let matched = [];
  let missing = [];

  (job.requiredSkills || []).forEach(orig => {
    const s = orig.toLowerCase().trim();
    if (studentSkills.some(st => st.includes(s) || s.includes(st))) {
      matched.push(orig);
    } else {
      missing.push(orig);
    }
  });

  // Calculate ratio
  const totalReq = reqSkills.length || 1;
  const matchRatio = matched.length / totalReq;

  // Academic score
  const studentCGPA = parseFloat(student.cgpa) || 7.0;
  const reqCGPA = job.eligibility?.minimumCGPA || 6.0;
  const backlogs = parseInt(student.backlogs) || 0;
  const maxBacklogs = job.eligibility?.maximumBacklogs ?? 0;

  // Hard eligibility
  let isEligible = true;
  let eligibilityReasons = [];

  if (studentCGPA < reqCGPA) {
    isEligible = false;
    eligibilityReasons.push(`CGPA (${studentCGPA}) is below the required ${reqCGPA}`);
  }
  if (backlogs > maxBacklogs) {
    isEligible = false;
    eligibilityReasons.push(`Backlogs (${backlogs}) exceed allowed limit (${maxBacklogs})`);
  }
  if (job.eligibility?.eligibleBranches?.length && student.branch) {
    if (!job.eligibility.eligibleBranches.includes(student.branch) && student.branch !== 'Other') {
      isEligible = false;
      eligibilityReasons.push(`Branch ${student.branch} not in eligible list`);
    }
  }

  // Score computation: 60% skills, 30% CGPA, 10% projects
  let score = Math.round(matchRatio * 60 + Math.min(studentCGPA / 10, 1) * 30 + (student.projects?.length ? 10 : 5));
  if (backlogs > 0) score -= backlogs * 5;
  score = Math.max(35, Math.min(98, score));

  return {
    mlScore: score,
    isEligible,
    eligibilityReasons,
    matchedSkills: matched,
    missingSkills: missing
  };
}

// @desc    Get all jobs (with query filters)
// @route   GET /api/jobs
// @access  Public / Admin
const getJobs = async (req, res) => {
  try {
    const { search, category, role, workMode, status, batch } = req.query;

    if (isMongoConnected()) {
      let filter = {};
      if (status && status !== 'All') {
        filter.status = status;
      } else if (!status) {
        // By default show active jobs for students, unless explicitly requested
        filter.status = { $in: ['Active', 'Draft', 'Closed'] };
      }

      if (category && category !== 'All') filter.category = category;
      if (workMode && workMode !== 'All') filter.workMode = workMode;
      if (role && role !== 'All') filter.technicalRole = new RegExp(role, 'i');

      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [
          { title: regex },
          { companyName: regex },
          { requiredSkills: regex },
          { location: regex }
        ];
      }

      let jobs = await Job.find(filter).sort({ createdAt: -1 });
      
      // If DB is empty, seed with demo jobs
      if (!jobs || jobs.length === 0) {
        try {
          await Job.insertMany(DEMO_JOBS);
          jobs = await Job.find(filter).sort({ createdAt: -1 });
        } catch (seedErr) {
          jobs = memoryJobs;
        }
      }

      // Attach applicant counts
      const counts = await JobApplication.aggregate([
        { $group: { _id: "$job", count: { $sum: 1 } } }
      ]);
      const countMap = {};
      counts.forEach(c => { countMap[String(c._id)] = c.count; });

      const enriched = jobs.map(j => {
        const obj = j.toObject();
        obj.applicantCount = countMap[String(j._id)] || 0;
        return obj;
      });

      return res.status(200).json({ success: true, count: enriched.length, data: enriched });
    }

    // Memory Fallback
    let result = [...memoryJobs];
    if (status && status !== 'All') {
      result = result.filter(j => j.status === status);
    }
    if (category && category !== 'All') {
      result = result.filter(j => j.category === category);
    }
    if (workMode && workMode !== 'All') {
      result = result.filter(j => j.workMode === workMode);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        (j.requiredSkills || []).some(s => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q)
      );
    }

    result = result.map(j => ({
      ...j,
      applicantCount: memoryApplications.filter(a => String(a.job) === String(j._id)).length
    }));

    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    console.error('getJobs error:', error);
    return res.status(200).json({ success: true, count: memoryJobs.length, data: memoryJobs });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      const job = await Job.findById(id);
      if (job) {
        const applicantCount = await JobApplication.countDocuments({ job: id });
        const obj = job.toObject();
        obj.applicantCount = applicantCount;
        return res.status(200).json({ success: true, data: obj });
      }
    }

    const memJob = memoryJobs.find(j => String(j._id) === String(id));
    if (memJob) {
      return res.status(200).json({
        success: true,
        data: {
          ...memJob,
          applicantCount: memoryApplications.filter(a => String(a.job) === String(id)).length
        }
      });
    }

    return res.status(404).json({ success: false, message: 'Job posting not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new job posting
// @route   POST /api/jobs
// @access  Admin
const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body };
    if (!jobData.title || !jobData.companyName) {
      return res.status(400).json({ success: false, message: 'Job title and Company name are required' });
    }

    if (!jobData.deadline) {
      jobData.deadline = new Date(Date.now() + 14 * 86400000);
    }

    if (isMongoConnected()) {
      const created = await Job.create(jobData);
      return res.status(201).json({ success: true, message: 'Job created successfully', data: created });
    }

    // Memory fallback
    jobData._id = 'job_' + Date.now();
    jobData.createdAt = new Date().toISOString();
    jobData.updatedAt = new Date().toISOString();
    memoryJobs.unshift(jobData);

    return res.status(201).json({ success: true, message: 'Job created successfully (cached)', data: jobData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job posting
// @route   PUT /api/jobs/:id
// @access  Admin
const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      const updated = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.status(200).json({ success: true, message: 'Job updated successfully', data: updated });
      }
    }

    const idx = memoryJobs.findIndex(j => String(j._id) === String(id));
    if (idx !== -1) {
      memoryJobs[idx] = { ...memoryJobs[idx], ...req.body, updatedAt: new Date().toISOString() };
      return res.status(200).json({ success: true, message: 'Job updated successfully', data: memoryJobs[idx] });
    }

    return res.status(404).json({ success: false, message: 'Job not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle job status (Active, Draft, Closed)
// @route   PATCH /api/jobs/:id/status
// @access  Admin
const toggleJobStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!['Active', 'Draft', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      const updated = await Job.findByIdAndUpdate(id, { status }, { new: true });
      if (updated) {
        return res.status(200).json({ success: true, message: `Job marked as ${status}`, data: updated });
      }
    }

    const idx = memoryJobs.findIndex(j => String(j._id) === String(id));
    if (idx !== -1) {
      memoryJobs[idx].status = status;
      return res.status(200).json({ success: true, message: `Job marked as ${status}`, data: memoryJobs[idx] });
    }

    return res.status(404).json({ success: false, message: 'Job not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete job posting
// @route   DELETE /api/jobs/:id
// @access  Admin
const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      await Job.findByIdAndDelete(id);
      await JobApplication.deleteMany({ job: id });
      return res.status(200).json({ success: true, message: 'Job deleted successfully' });
    }

    memoryJobs = memoryJobs.filter(j => String(j._id) !== String(id));
    memoryApplications = memoryApplications.filter(a => String(a.job) !== String(id));

    return res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Apply to job posting
// @route   POST /api/jobs/:id/apply
// @access  Student
const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { studentProfile, resumeType, resumeUrl, resumeFileName, atsScore } = req.body;

    if (!studentProfile || !studentProfile.email) {
      return res.status(400).json({ success: false, message: 'Student profile with valid email is required' });
    }

    // Retrieve the job
    let job = null;
    if (isMongoConnected() && mongoose.isValidObjectId(jobId)) {
      job = await Job.findById(jobId);
    }
    if (!job) {
      job = memoryJobs.find(j => String(j._id) === String(jobId));
    }
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }

    if (job.status !== 'Active') {
      return res.status(400).json({ success: false, message: `This job is currently ${job.status} and cannot receive applications.` });
    }

    if (new Date(job.deadline) < new Date()) {
      return res.status(400).json({ success: false, message: 'The deadline for this job posting has expired.' });
    }

    // Check duplicate application
    const studentEmail = studentProfile.email.toLowerCase().trim();
    if (isMongoConnected() && mongoose.isValidObjectId(jobId)) {
      const existing = await JobApplication.findOne({ job: jobId, studentEmail });
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already applied for this position.' });
      }
    } else {
      const existing = memoryApplications.find(a => String(a.job) === String(jobId) && a.studentEmail === studentEmail);
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already applied for this position.' });
      }
    }

    // Run ML match calculation
    const matchAnalysis = calculateJobMatch(studentProfile, job);

    const applicationData = {
      job: jobId,
      jobTitle: job.title,
      companyName: job.companyName,
      studentEmail,
      studentName: studentProfile.name || studentProfile.fullName || 'Student',
      studentPhone: studentProfile.phone || '',
      studentBranch: studentProfile.branch || 'Other',
      studentCGPA: parseFloat(studentProfile.cgpa) || 0,
      studentProfileSnapshot: studentProfile,
      mlMatchScore: matchAnalysis.mlScore,
      matchedSkills: matchAnalysis.matchedSkills,
      missingSkills: matchAnalysis.missingSkills,
      atsScore: atsScore || 78,
      resumeType: resumeType || 'generated',
      resumeUrl: resumeUrl || '',
      resumeFileName: resumeFileName || `${(studentProfile.name || 'Student').replace(/\s+/g, '_')}_CV.pdf`,
      status: 'Applied',
      statusHistory: [{ status: 'Applied', updatedAt: new Date(), comment: 'Application received' }],
      appliedAt: new Date()
    };

    if (isMongoConnected() && mongoose.isValidObjectId(jobId)) {
      const appDoc = await JobApplication.create(applicationData);
      return res.status(201).json({
        success: true,
        message: 'Application submitted successfully! 🎉',
        data: appDoc,
        matchAnalysis
      });
    }

    // Memory fallback
    applicationData._id = 'app_' + Date.now();
    memoryApplications.unshift(applicationData);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! 🎉',
      data: applicationData,
      matchAnalysis
    });
  } catch (error) {
    console.error('applyToJob error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications for a specific job (Admin Pipeline)
// @route   GET /api/jobs/:id/applications
// @access  Admin
const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (isMongoConnected() && mongoose.isValidObjectId(jobId)) {
      const apps = await JobApplication.find({ job: jobId }).sort({ mlMatchScore: -1, appliedAt: -1 });
      return res.status(200).json({ success: true, count: apps.length, data: apps });
    }

    const apps = memoryApplications
      .filter(a => String(a.job) === String(jobId))
      .sort((a, b) => (b.mlMatchScore || 0) - (a.mlMatchScore || 0));

    return res.status(200).json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  toggleJobStatus,
  deleteJob,
  applyToJob,
  getJobApplications,
  calculateJobMatch
};
