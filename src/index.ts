import express from 'express';
import { Crawler } from './crawler';

const app = express();
const port = 20001;


app.get('/crawl', async (req, res) => {
    const { city, pageNumber = '1', size = '5' } = req.query;

    const crawler = new Crawler();
    try {
        if (typeof city !== 'string') {
            return res.status(400).send({ error: 'city is required' });
        }
        if (typeof pageNumber !== 'string') {
            return res.status(400).send({ error: 'city is required' });
        }
        if (typeof size !== 'string') {
            return res.status(400).send({ error: 'city is required' });
        }
        const listings = await crawler.crawlListings(city, pageNumber, size);
        res.send({ listings });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to crawl listings' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
