const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    // Found a useful information that will save me a lot of useless commits, as I should be able to replicate the facebook preview locally now
    // Rectangular image thumbnails appear at 470x246 pixels in the feed.

    const content = `
    <svg 
        width="1200"
        height="630"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 40px;
                fill: rgba(40, 40, 40, 0.8);
            }

        </style>

        <text
            x="5%"
            y="100px"
            class="text"
            textLength="900"
        >
            ${text}
            <tspan 
                fill="red"
                font-size="100px"
                x="3%"
                y="100px"
            >
                "
            </tspan>

        </text>

        <text
            x="800px"
            y="200px"
            font-size="20px"
            textLength="300px"
        >
           ${author}
        </text>
    </svg>`

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