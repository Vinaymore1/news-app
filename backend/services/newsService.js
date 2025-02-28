const puppeteer = require('puppeteer');

const categories = [
    'news',
    'business',
    'innovation',
    'culture',
    'future-planet',
    'travel',
    'arts'
];

const scrapeBBCNews = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
        });
        
        let page = await browser.newPage();
        console.log('🔍 Scraper started...');
        
        let allArticles = [];
        
        for (const category of categories) {
            const categoryUrl = `https://www.bbc.com/${category}`;
            console.log(`📂 Scraping category: ${category}`);
            
            // Step 1: Get Article Links
            await page.goto(categoryUrl, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('[data-testid="internal-link"]', { timeout: 2000 });
            
            const articleLinks = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('[data-testid="internal-link"]'))
                    .map(el => el.href.startsWith("http") ? el.href : "https://www.bbc.com" + el.href)
                    .filter(url => url.includes('/news/'));
            });
            
            console.log(`🔗 Found ${articleLinks.length} articles in ${category}.`);
                        
            // Step 2: Scrape Article Details
            for (let [index, link] of articleLinks.entries()) {
                try {
                    await page.goto(link, { waitUntil: 'domcontentloaded' });
                    await page.waitForSelector('h1', { timeout: 500 });
                    
                    const articleDetails = await page.evaluate((category) => {
                        const getText = (selector, defaultValue) => document.querySelector(selector)?.innerText.trim() || defaultValue;
                        const getAttribute = (selector, attr, defaultValue) => document.querySelector(selector)?.getAttribute(attr) || defaultValue;
                        
                        // Updated selectors for author and time
                        const authorSelector = '.sc-b42e7a8f-7.kItaYD, .kItaYD, [class*="kItaYD"]';
                        const timeSelector = 'time[datetime], time[class*="jViTsK"]';
                        const cardTimeSelector = '[data-testid="card-metadata-lastupdated"]';
                        
                        let author = getText(authorSelector, 'Unknown Author');
                        let timestamp = getAttribute(timeSelector, 'datetime', '');
                        
                        // If we couldn't find the timestamp with the primary selector, try the card selector
                        if (!timestamp) {
                            timestamp = getText(cardTimeSelector, 'No timestamp');
                        }
                        
                        return {
                            title: getText('h1', 'No title'),
                            description: getText('p', 'No description available'),
                            author: author,
                            timestamp: timestamp,
                            imageUrl: getAttribute('article img', 'src', 'No image available'),
                            content: Array.from(document.querySelectorAll('article p')).map(p => p.innerText.trim()).join('\n'),
                            url: window.location.href,
                            scrapedAt: new Date().toISOString(),
                            category
                        };
                    }, category);
                    
                    allArticles.push(articleDetails);
                    console.log(`✅ Scraped: ${articleDetails.title}`);
                    
                    // Add delay to avoid rate-limiting
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    // Restart page every 10 articles (prevents memory leaks)
                    if (index % 10 === 0 && index !== 0) {
                        await page.close();
                        page = await browser.newPage();
                    }
                } catch (err) {
                    console.error(`❌ Error scraping ${link}:`, err);
                }
            }
        }
        
        await browser.close();
        console.log(`✅ Scraped ${allArticles.length} articles successfully.`);
        return allArticles;
    } catch (error) {
        console.error('❌ Scraping Error:', error);
        return [];
    }
};

module.exports = scrapeBBCNews;


