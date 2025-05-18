const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body} = require('express-validator');

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('fullName.firstName').isLength({ min : 3}).withMessage('First name must be at least 3 characters long'),
        body('fullName.lastName').isLength({ min : 3}).withMessage('Last name must be at least 3 characters long'),
        body('password').isLength({ min : 6}).withMessage('Password must be at least 6 characters long'),
        body('vehicle.color').isLength({ min : 3}).withMessage('Vehicle color must be at least 3 characters long'),
        body('vehicle.plate').isLength({ min : 3}).withMessage('Vehicle plate must be at least 3 characters long'),
        body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
    ] 
    ,captainController.register);

module.exports = router;