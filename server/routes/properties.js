const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Import controllers
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
  getFeaturedProperties,
  getPropertiesByUser,
  toggleFavoriteProperty
} = require('../controllers/properties');

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getProperty);

// Protected routes
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.post('/:id/images', protect, uploadPropertyImages);
router.get('/user/:userId', protect, getPropertiesByUser);
router.put('/:id/favorite', protect, toggleFavoriteProperty);

module.exports = router; 