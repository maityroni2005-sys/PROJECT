const Company = require('../models/Company');
const SEED_COMPANIES = require('../config/seedCompanies');

// Deterministic ML scoring helper for fallback
function computeCompanyScore(student, company) {
  const studentSkills = [
    ...(student.programming ? (student.programming || '').split(',') : []),
    ...(student.web ? (student.web || '').split(',') : []),
    ...(student.databases ? (student.databases || '').split(',') : []),
    ...(student.technicalSkills?.programmingLanguages || []),
    ...(student.technicalSkills?.webTechnologies || []),
    ...(student.technicalSkills?.databases || []),
    ...(student.technicalSkills?.otherSkills || [])
  ].map(s => String(s || '').trim().toLowerCase()).filter(Boolean);

  const reqSkills = (company.requiredSkills || []).map(s => String(s || '').toLowerCase());
  const matched = reqSkills.filter(r => studentSkills.some(st => st.includes(r) || r.includes(st)));

  const skillRatio = reqSkills.length ? matched.length / reqSkills.length : 0.6;
  const studentCGPA = parseFloat(student.cgpa || student.academicDetails?.cgpa || 7.5);
  const minCGPA = company.minimumCGPA || 6.0;
  const backlogs = parseInt(student.backlogs ?? student.academicDetails?.backlogs ?? 0, 10);

  let acadScore = studentCGPA >= minCGPA ? 85 + Math.min(15, (studentCGPA - minCGPA) * 10) : (studentCGPA / minCGPA) * 70;
  let score = Math.round(skillRatio * 55 + acadScore * 0.35 + 10) - backlogs * 8;
  score = Math.max(30, Math.min(98, score));

  return {
    name: company.companyName,
    companyName: company.companyName,
    category: company.category,
    officialUrl: company.officialUrl,
    logo: company.logo,
    packageCTC: company.packageCTC,
    minimumCGPA: company.minimumCGPA,
    score,
    matchedCount: matched.length,
    totalCount: reqSkills.length,
    isEligible: studentCGPA >= minCGPA && backlogs === 0
  };
}

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

// @desc    Get all companies (with seed fallback)
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    let companies = [];
    try {
      companies = await Company.find();
    } catch (dbErr) {
      companies = [];
    }
    if (!companies || companies.length === 0) {
      companies = SEED_COMPANIES;
    }
    res.status(200).json(companies);
  } catch (error) {
    res.status(200).json(SEED_COMPANIES);
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      const fallback = SEED_COMPANIES.find(c => c.companyName.toLowerCase() === req.params.id.toLowerCase());
      if (fallback) return res.status(200).json(fallback);
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    const fallback = SEED_COMPANIES.find(c => c.companyName.toLowerCase() === req.params.id.toLowerCase());
    if (fallback) return res.status(200).json(fallback);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get company recommendations based on student profile (with 50 seed fallback)
// @route   POST /api/companies/recommendations
// @access  Public
const getCompanyRecommendations = async (req, res) => {
  try {
    const studentData = req.body || {};

    // 1. Try ML Service if available
    let mlSuccess = false;
    let mlData = null;
    try {
      const axios = require('axios');
      const mlPort = process.env.ML_PORT || 5001;
      const mlResponse = await axios.post(`http://127.0.0.1:${mlPort}/predict-company-recs`, studentData, { timeout: 1500 });
      if (mlResponse && mlResponse.data) {
        mlData = mlResponse.data;
        mlSuccess = true;
      }
    } catch (mlErr) {
      // ML Service offline, fallback to deterministic engine below
    }

    if (mlSuccess && mlData) {
      return res.status(200).json(mlData);
    }

    // 2. Deterministic 50-Company ML Scoring Engine
    const service = SEED_COMPANIES.filter(c => c.category === 'Service-Based').map(c => computeCompanyScore(studentData, c)).sort((a, b) => b.score - a.score);
    const product = SEED_COMPANIES.filter(c => c.category === 'Product-Based').map(c => computeCompanyScore(studentData, c)).sort((a, b) => b.score - a.score);
    const unicorns = SEED_COMPANIES.filter(c => c.category === 'Unicorns').map(c => computeCompanyScore(studentData, c)).sort((a, b) => b.score - a.score);

    res.status(200).json({
      status: "success",
      source: "placementpro-hybrid-engine",
      totalAnalyzed: SEED_COMPANIES.length,
      serviceBased: service,
      productBased: product,
      unicorns: unicorns,
      startupBased: unicorns // legacy alias
    });
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
