const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const parser = new Parser();

const app = express();
app.use(cors());

app.get("/api/rss", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const feed = await parser.parseURL(url);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to parse RSS feed" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`RSS API is running on port ${PORT}`);
});
