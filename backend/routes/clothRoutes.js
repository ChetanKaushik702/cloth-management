const express = require('express');
const { addOutfit } = require('../controllers/clothController');
const { isAuthenticatedUser, isAuthorizedRole } = require('../middleware/auth');
const router = express.Router();

router.route('/add').post(isAuthenticatedUser, isAuthorizedRole('admin'), addOutfit);

module.exports = router;