const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    // Found a useful information that will save me a lot of useless commits, as I should be able to replicate the facebook preview locally now
    // Rectangular image thumbnails appear at 470x246 pixels in the feed.

    const content = `
    <svg
  width="1200"
  height="630"
  viewBox="0 0 1200 630"
  xmlns="http://www.w3.org/2000/svg"
>
  <style>
    .quote {
      font-family: Arial, sans-serif;
      font-size: 60px;
      font-weight: 600;
      fill: #222;
    }

    .author {
      font-family: Arial, sans-serif;
      font-size: 40px;
      font-weight: 700;
      fill: #444;
    }

    .mark {
      font-family: Arial, sans-serif;
      font-size: 140px;
      font-weight: 900;
      fill: #e63946;
    }
  </style>

  <!-- background -->
  <rect width="1200" height="630" fill="#f3f3f3" />

  <!-- opening quote mark -->
  <text x="60" y="160" class="mark">“</text>

  <!-- quote text (multi-line friendly position) -->
  <text x="140" y="160" class="quote">
    TESTING QUOTE TEXT GOES HERE
  </text>

  <!-- author -->
  <text x="140" y="520" class="author">
    — Author Name
  </text>
</svg>
`

    try {
        await promises.writeFile(join(__dirname, '../views/quoteOgImage.svg'), content);
        return { message: 'Svg file was written / created successfully!' }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createDynamicSvg
}