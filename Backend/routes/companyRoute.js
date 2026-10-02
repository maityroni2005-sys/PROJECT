const express = require('express');
const router = express.Router();
const { createCompany, getCompanies, getCompanyById, getCompanyRecommendations } = require('../controllers/companyController');

router.post('/', createCompany);
router.get('/', getCompanies);
router.post('/recommendations', getCompanyRecommendations);
router.get('/:id', getCompanyById);

module.exports = router;
