const ShortURL = require('../models/ShortURL');

const generateCandidate = () => Math.random().toString(36).substring(2, 8);

const generateUniqueCode = async () => {
  let unique = false;
  let candidate;

  while (!unique) {
    candidate = generateCandidate();
    const existing = await ShortURL.exists({ shortcode: candidate });
    unique = !existing;
  }

  return candidate;
};

module.exports = generateUniqueCode;