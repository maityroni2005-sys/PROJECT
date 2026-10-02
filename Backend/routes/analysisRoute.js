const express = require('express');
const router = express.Router();
const { analyzeCompanySuitability, analyzeRoles, analyzeSkillGap } = require('../controllers/analysisController');

router.post('/company', analyzeCompanySuitability);
router.post('/roles', analyzeRoles);
router.post('/skill-gap', analyzeSkillGap);

module.exports = router;
