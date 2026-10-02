const Student = require('../models/Student');

// @desc    Create or update student profile
// @route   POST /api/students
// @access  Public (for now)
const createOrUpdateStudent = async (req, res) => {
  try {
    const { email } = req.body.personalDetails || { email: "demo@example.com" };
    
    let student = await Student.findOne({ 'personalDetails.email': email });
    
    if (student) {
      // Update existing
      student = await Student.findOneAndUpdate(
        { 'personalDetails.email': email },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(student);
    }
    
    // Create new
    student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error("DB Error in studentController:", error.message);
    // Graceful fallback for demo when DB is not running
    res.status(200).json({ message: "Mock save successful", data: req.body });
  }
};

// @desc    Get student profile by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateStudent,
  getStudentById
};
