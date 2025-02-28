const express = require('express');
const router = express.Router();
const { getAllNews, getNewsByCategory, scrapeAndSaveNews } = require('../controllers/newsController'); // Check path

router.get('/all', getAllNews);
router.get('/category/:category', getNewsByCategory); 
router.get('/scrape', scrapeAndSaveNews);

module.exports = router;


