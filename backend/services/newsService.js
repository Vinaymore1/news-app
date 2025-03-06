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
        console.log('🚀 Starting Puppeteer...');
        const browser = await puppeteer.launch({
            headless: "new", 
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
        });

        let page = await browser.newPage();
        console.log('🔍 Scraper initialized.');

        let allArticles = [];

        for (const category of categories) {
            const categoryUrl = `https://www.bbc.com/${category}`;
            console.log(`📂 Scraping category: ${category}`);

            try {
                await page.goto(categoryUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
                await page.waitForSelector('[data-testid="internal-link"]', { timeout: 5000 });

                const articleLinks = await page.evaluate(() => {
                    return Array.from(document.querySelectorAll('[data-testid="internal-link"]'))
                        .map(el => el.href.startsWith("http") ? el.href : "https://www.bbc.com" + el.href)
                        .filter(url => url.includes('/news/'));
                });

                console.log(`🔗 Found ${articleLinks.length} articles in ${category}.`);

                for (let [index, link] of articleLinks.entries()) {
                    try {
                        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 10000 });
                        await page.waitForSelector('h1', { timeout: 2000 });

                        const articleDetails = await page.evaluate((category) => {
                            const getText = (selector, defaultValue) => document.querySelector(selector)?.innerText.trim() || defaultValue;
                            const getAttribute = (selector, attr, defaultValue) => document.querySelector(selector)?.getAttribute(attr) || defaultValue;

                            let author = getText('.sc-b42e7a8f-7.kItaYD, .kItaYD, [class*="kItaYD"]', 'Unknown Author');
                            let timestamp = getAttribute('time[datetime], time[class*="jViTsK"]', 'datetime', '');

                            if (!timestamp) {
                                timestamp = getText('[data-testid="card-metadata-lastupdated"]', 'No timestamp');
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

                        await new Promise(resolve => setTimeout(resolve, 2000));

                        if (index % 10 === 0 && index !== 0) {
                            await page.close();
                            page = await browser.newPage();
                        }
                    } catch (err) {
                        console.error(`❌ Error scraping ${link}:`, err.message);
                    }
                }
            } catch (err) {
                console.error(`⚠️ Failed to scrape category ${category}:`, err.message);
            }
        }

        await browser.close();
        console.log(`✅ Scraped ${allArticles.length} articles successfully.`);
        return allArticles;
    } catch (error) {
        console.error('❌ Scraping Error:', error.message);
        return [];
    }
};

module.exports = scrapeBBCNews;
