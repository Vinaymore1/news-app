const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
require('dotenv').config();
const { scrapeAndSaveNews } = require('./Controllers/newsController');
const cron = require('node-cron');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4153', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


connectDB();

// cron.schedule('0 */6 * * *', async () => {
//   console.log('Running scheduled news scraping task...');
//   try {
//       await scrapeAndSaveNews();
//       console.log('News scraping completed successfully!');
//   } catch (error) {
//       console.error('Error running scheduled scraping:', error);
//   }
// }, {
//   scheduled: true,
//   timezone: "Asia/Kolkata" 
// });

app.get('/', (req, res) => {
  res.send('🚩 Jai Shree Ram 🚩');
});

app.use('/api', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
