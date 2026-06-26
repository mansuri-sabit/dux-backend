const express = require('express');
const router = express.Router();
const { protect, verifyExtensionKey, validateAccountId } = require('../middleware/auth');
const {
    getProfileData,
    getProfileById,
    saveProfileData,
    deleteProfileData,
    deleteAllProfileData,
    getProfileStats
} = require('../controllers/profileDataController');

// Combined auth middleware - accept either JWT or Extension API Key
const protectOrExtension = (req, res, next) => {
    const hasExtensionKey = req.headers['x-extension-key'];

    if (hasExtensionKey) {
        // Use extension key auth
        return verifyExtensionKey(req, res, next);
    } else {
        // Use JWT auth
        return protect(req, res, next);
    }
};

// All routes require authentication (JWT or Extension Key)
router.use(protectOrExtension);

router.route('/')
    .get(getProfileData)
    .post(saveProfileData)
    .delete(deleteAllProfileData);

router.route('/stats')
    .get(getProfileStats);

router.route('/:id')
    .get(getProfileById)
    .delete(deleteProfileData);

module.exports = router;

