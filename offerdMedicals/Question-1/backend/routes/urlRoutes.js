const express = require('express');
const router = express.Router();
const {
  createShortURL,
  handleRedirect,
  getStats
} = require('../controllers/urlController');

router.post('/shorten', createShortURL);
router.get('/:shortcode', handleRedirect);
router.get('/stats/:shortcode', getStats);

module.exports = router;