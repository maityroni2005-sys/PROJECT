const express = require('express');
const router = express.Router();
const { createOrUpdateStudent, getStudentById } = require('../controllers/studentController');

router.post('/', createOrUpdateStudent);
router.get('/:id', getStudentById);

module.exports = router;
