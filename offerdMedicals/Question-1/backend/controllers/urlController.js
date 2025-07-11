const ShortURL = require('../models/ShortURL');
const generateUniqueCode = require('../utils/codeGenerator');

exports.createShortURL = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const code = shortcode || await generateUniqueCode();

    let validUntil = null;
    if (validity) {
      const duration = parseInt(validity);
      validUntil = new Date(Date.now() + duration * 60000);
    }

    const exists = await ShortURL.findOne({ shortcode: code });
    if (exists) return res.status(409).json({ error: 'Shortcode already in use' });

    const newLink = new ShortURL({ url, shortcode: code, validUntil });
    await newLink.save();
    res.status(201).json({ shortcode: code });
  } catch {
    res.status(500).json({ error: 'Creation failed' });
  }
};

exports.handleRedirect = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const entry = await ShortURL.findOne({ shortcode });

    if (!entry) return res.status(404).json({ error: 'Link not found' });
    if (entry.validUntil && entry.validUntil < Date.now()) {
      return res.status(410).json({ error: 'Link has expired' });
    }

    entry.visits += 1;
    await entry.save();
    res.redirect(entry.url);
  } catch {
    res.status(500).json({ error: 'Redirection error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const data = await ShortURL.findOne({ shortcode });
    if (!data) return res.status(404).json({ error: 'Shortcode not found' });
    res.status(200).json({ visits: data.visits, validUntil: data.validUntil || 'Permanent' });
  } catch {
    res.status(500).json({ error: 'Stats retrieval failed' });
  }
};