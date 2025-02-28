const News = require('../models/News');
const scrapeNews = require('../services/newsService');

const getAllNews = async (req, res) => {
    try {
        const allNews = await News.find({});

        const uniqueURLMap = new Map();
        const uniqueNews = [];

        allNews.forEach(article => {
            if (!uniqueURLMap.has(article.url)) {
                uniqueURLMap.set(article.url, true);
                uniqueNews.push(article);
            }
        });

        res.json({ articles: uniqueNews }); 
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getNewsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const categoryNews = await News.find({ category });

        if (!categoryNews.length) {
            return res.status(404).json({ message: 'No news found for this category' });
        }

        const uniqueURLMap = new Map();
        const uniqueNews = [];

        categoryNews.forEach(article => {
            if (!uniqueURLMap.has(article.url)) {
                uniqueURLMap.set(article.url, true);
                uniqueNews.push(article);
            }
        });

        res.json({ articles: uniqueNews }); 
    } catch (error) {
        console.error('Error fetching news by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const scrapeAndSaveNews = async (req, res) => {
    try {
        const articles = await scrapeNews();
        // console.log('Scraped Articles:', articles);

        if (!articles || articles.length === 0) {
            return res.status(500).json({ message: 'No articles scraped' });
        }

        await News.collection.drop();
        console.log('Dropped existing news collection');

        await News.insertMany(articles);
        res.status(201).json({ 
            message: 'News saved successfully', 
            savedArticles: articles.length
        });

    } catch (error) {
        console.error('Scraping Error:', error);
        res.status(500).json({ error: 'Error scraping and saving news' });
    }
};

module.exports = {
    getAllNews,
    getNewsByCategory,
    scrapeAndSaveNews
};
