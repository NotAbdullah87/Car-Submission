const express = require('express');
const { submitCar, getUserSubmissions } = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST api/cars
// @desc    Submit a car
// @access  Private
router.post('/', authMiddleware, upload.array('images'), submitCar);

// @route   GET api/cars
// @desc    Get user submissions
// @access  Private
router.get('/', authMiddleware, getUserSubmissions);

module.exports = router;
