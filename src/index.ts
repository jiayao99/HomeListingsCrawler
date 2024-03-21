import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Crawler } from './crawler';

const app = express();
const port = 20001;

app.use(bodyParser.json());

app.post('/crawl', async (req: Request, res: Response) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    const crawler = new Crawler();
    try {
        const listings = await crawler.crawlListings(city);
        res.send({ listings });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to crawl listings' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
