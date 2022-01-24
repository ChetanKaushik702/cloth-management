const express = require('express');
const { addOutfit, updateDetails, deleteCloth, getAllOutfits } = require('../controllers/clothController');
const { isAuthenticatedUser, isAuthorizedRole } = require('../middleware/auth');
const router = express.Router();

router.route('/add').post(isAuthenticatedUser, isAuthorizedRole('admin'), addOutfit);
router.route('/update').put(isAuthenticatedUser, isAuthorizedRole('admin'), updateDetails);
router.route('/delete').delete(isAuthenticatedUser, isAuthorizedRole('admin'), deleteCloth);
router.route('/all').get(isAuthenticatedUser, getAllOutfits);

module.exports = router;