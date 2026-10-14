const mongoose = require('mongoose');
const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');
const DEMO_JOBS = require('../config/seedJobs');

const isMongoConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all applications submitted by a student
// @route   GET /api/applications/my
// @access  Student
const getMyApplications = async (req, res) => {
  try {
    const email = (req.query.email || req.headers['x-student-email'] || '').toLowerCase().trim();

    if (!email) {
      return res.status(400).json({ success: false, message: 'Student email is required' });
    }

    if (isMongoConnected()) {
      const apps = await JobApplication.find({ studentEmail: email })
        .populate('job')
        .sort({ appliedAt: -1 });

      return res.status(200).json({ success: true, count: apps.length, data: apps });
    }

    return res.status(200).json({ success: true, count: 0, data: [] });
  } catch (error) {
    console.error('getMyApplications error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Admin Pipeline)
// @route   PATCH /api/applications/:id/status
// @access  Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, comment } = req.body;

    const validStatuses = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Valid values: ${validStatuses.join(', ')}` });
    }

    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      const app = await JobApplication.findById(id);
      if (!app) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }

      app.status = status;
      app.statusHistory.push({
        status,
        updatedAt: new Date(),
        comment: comment || `Status updated to ${status}`
      });

      await app.save();
      return res.status(200).json({
        success: true,
        message: `Applicant status updated to ${status}! 🚀`,
        data: app
      });
    }

    return res.status(200).json({
      success: true,
      message: `Applicant status updated to ${status}! 🚀`,
      data: { _id: id, status, comment, updatedAt: new Date().toISOString() }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single application detail
// @route   GET /api/applications/:id
// @access  Admin / Student
const getApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected() && mongoose.isValidObjectId(id)) {
      const app = await JobApplication.findById(id).populate('job');
      if (app) {
        return res.status(200).json({ success: true, data: app });
      }
    }

    return res.status(404).json({ success: false, message: 'Application not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyApplications,
  updateApplicationStatus,
  getApplicationById
};
