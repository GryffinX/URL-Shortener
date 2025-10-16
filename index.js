const express = require('express');
const validator = require('validator');

const app = express();
const PORT = 3000;

app.use(express.json());

const urlMap = {};

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl || !validator.isURL(longUrl)) {
        return res.status(400).send({ error: "Invalid or missing URL in request body." });
    }

    let shortCode;
    do {
        shortCode = generateShortCode();
    } while (urlMap[shortCode]);

    urlMap[shortCode] = {
        originalUrl: longUrl,
        clicks: 0,
        createdAt: new Date().toISOString()
    };

    const shortUrl = `http://localhost:${PORT}/${shortCode}`;

    res.status(201).send({
        shortCode: shortCode,
        shortUrl: shortUrl
    });
});

app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = urlMap[shortCode];

    if (!urlEntry) {
        return res.status(404).send({ error: "Short URL not found." });
    }

    urlEntry.clicks++;

    res.redirect(301, urlEntry.originalUrl);
});

app.get('/stats/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = urlMap[shortCode];

    if (!urlEntry) {
        return res.status(404).send({ error: "Short URL stats not found." });
    }

    res.status(200).send({
        originalUrl: urlEntry.originalUrl,
        clicks: urlEntry.clicks,
        code: shortCode
    });
});

app.listen(PORT, () => {
    console.log(`URL Shortener API running on http://localhost:${PORT}`);
});