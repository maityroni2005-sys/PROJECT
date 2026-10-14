const express = require('express');
const router = express.Router();
const {
  getMyApplications,
  updateApplicationStatus,
  getApplicationById
} = require('../controllers/applicationController');

router.get('/my', getMyApplications);
router.patch('/:id/status', updateApplicationStatus);
router.get('/:id', getApplicationById);

module.exports = router;
