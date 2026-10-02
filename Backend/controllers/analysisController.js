const Student = require('../models/Student');
const Company = require('../models/Company');
const { generateExplainableScore } = require('../services/skillGapService');
const axios = require('axios');

// @desc    Analyze student against a specific company
// @route   POST /api/analysis/company
// @access  Public
const analyzeCompanySuitability = async (req, res) => {
    try {
        const student = req.body.student || req.body; // accept student directly
        const company = req.body.company || { companyName: "TCS" }; // Mock company if not provided
        
        if (!student) {
            return res.status(400).json({ message: "Student data not provided" });
        }
        
        let mlScore = 0;
        let scoreSource = 'ml';
        
        try {
            // Attempt to call the Python ML API
            const mlPort = process.env.ML_PORT || 5001;
            const mlResponse = await axios.post(`http://127.0.0.1:${mlPort}/predict-company`, {
                student: student,
                company: company
            });
            mlScore = mlResponse.data.score;
        } catch (mlError) {
            // ML service down — fall back to the SAME transparent academic formula the
            // ML service uses (cgpa*10 − backlogs*5, clamped 30–99). Never return a
            // random score: the number shown to the student must be reproducible.
            console.warn("ML Service Unavailable, using deterministic academic fallback.");
            const cgpa = parseFloat(student?.academicDetails?.cgpa) || 7.0;
            const backlogs = parseInt(student?.academicDetails?.backlogs) || 0;
            mlScore = Math.max(30, Math.min(99, Math.round(cgpa * 10 - backlogs * 5)));
            scoreSource = 'fallback';
        }
        
        const analysis = generateExplainableScore(student, company, mlScore);
        analysis.scoreSource = scoreSource; // let the UI label the calculation honestly
        
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ML predicted roles for a student
// @route   POST /api/analysis/roles
// @access  Public
const analyzeRoles = async (req, res) => {
    try {
        const student = req.body.student || req.body;
        
        if (!student || Object.keys(student).length === 0) return res.status(400).json({ message: "Student data not provided" });

        try {
            const mlPort = process.env.ML_PORT || 5001;
            const mlResponse = await axios.post(`http://127.0.0.1:${mlPort}/predict-role`, { student });
            return res.status(200).json(mlResponse.data);
        } catch (mlError) {
            console.error("ML Service Unavailable:", mlError.message);
            return res.status(503).json({ message: "ML Service Unavailable" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ML skill gap analysis for a target role
// @route   POST /api/analysis/skill-gap
// @access  Public
const analyzeSkillGap = async (req, res) => {
    try {
        const student = req.body.student || req.body;
        const targetRole = req.body.targetRole || 'Backend Developer';
        
        if (!student || Object.keys(student).length === 0) return res.status(400).json({ message: "Student data not provided" });

        try {
            const mlPort = process.env.ML_PORT || 5001;
            const mlResponse = await axios.post(`http://127.0.0.1:${mlPort}/skill-gap`, { student, targetRole });
            return res.status(200).json(mlResponse.data);
        } catch (mlError) {
            console.error("ML Service Unavailable:", mlError.message);
            return res.status(503).json({ message: "ML Service Unavailable" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    analyzeCompanySuitability,
    analyzeRoles,
    analyzeSkillGap
};
