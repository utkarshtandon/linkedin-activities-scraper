require('dotenv').config();

import express from 'express';
import { LinkedInActivitiesScraper } from '../index';

const app = express();

(async () => {
  // Setup environment variables to fill the sessionCookieValue
  const scraper = new LinkedInActivitiesScraper({
    sessionCookieValue: `${process.env.LINKEDIN_SESSION_COOKIE_VALUE}`,
    keepAlive: true,
  })

  // Prepare the scraper
  // Loading it in memory
  await scraper.setup()

  // Usage: http://localhost:3000/?url=https://www.linkedin.com/in/jvandenaardweg/
  app.get('/', async (req, res) => {
    const urlToScrape = req.query.url as string;

    const result = await scraper.run(urlToScrape)

    return res.json(result)
  })

  app.listen(process.env.PORT || 3000)
})()

