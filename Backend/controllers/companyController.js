const Company = require('../models/Company');

// @desc    Create a new company
// @route   POST /api/companies
// @access  Admin
const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get company recommendations based on student profile
// @route   POST /api/companies/recommendations
// @access  Public
const getCompanyRecommendations = async (req, res) => {
  try {
    const studentData = req.body; // the student payload from the frontend

    // Send the student data to the ML API
    const axios = require('axios'); // Ensure axios is required or add it at the top if possible. We'll require it locally here for simplicity if it's not at the top.
    
    let mlResponse;
    try {
        const mlPort = process.env.ML_PORT || 5001;
        mlResponse = await axios.post(`http://127.0.0.1:${mlPort}/predict-company-recs`, studentData);
    } catch (mlError) {
        console.error("ML Service Unavailable for Recommendations:", mlError.message);
        return res.status(503).json({ message: "ML Service Unavailable" });
    }

    res.status(200).json(mlResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  getCompanyRecommendations
};
