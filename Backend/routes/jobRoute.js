const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  toggleJobStatus,
  deleteJob,
  applyToJob,
  getJobApplications
} = require('../controllers/jobController');

router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

router.patch('/:id/status', toggleJobStatus);
router.post('/:id/apply', applyToJob);
router.get('/:id/applications', getJobApplications);

module.exports = router;
