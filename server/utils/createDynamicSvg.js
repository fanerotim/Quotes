const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    // Found a useful information that will save me a lot of useless commits, as I should be able to replicate the facebook preview locally now
    // Rectangular image thumbnails appear at 470x246 pixels in the feed.

    const content = `
    <svg 
        width="470"
        height="246"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 20px;
                fill: rgba(0, 0, 0, 0.8);
            }

        </style>

        <text
            x="5%"
            y="100px"
            class="text"
        >
            ${text}
            <tspan 
                fill="red"
                font-size="110px"
                x="3%"
                y="100px"
            >
                "
            </tspan>

        </text>

        <text
            x="250px"
            y="150px"
            font-size="10px"
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