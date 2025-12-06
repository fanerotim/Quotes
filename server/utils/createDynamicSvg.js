const { promises } = require('fs');
const { join } = require('path');
const { prepareOgImageText } = require('./prepareOgImageText');
const { generateSvgMarkup } = require('./generateSvgMarkup');

const createDynamicSvg = async (text, author) => {

    const outputText = prepareOgImageText(text);
    const lines = generateSvgMarkup(outputText);

    let content = `
    <svg 
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 40px;
                font-weight: 600;
                font-variant: small-caps;
                fill: rgba(0, 0, 0, 0.8);
                background: "pink";
            }

        </style>

        <rect width="1200" height="630" fill="rgba(200, 200, 200, 0.7)" />

        <text
            x="5%"
            y="140px"
            class="text"
        >
            ${outputText[0]}
        <tspan 
            fill="red"
            font-size="110px"
            x="3%"
            y="100px"
        >
            “
        </tspan>

        </text>

        ${[...lines]}

        <text
            x="5%"
            y="580px"
            font-size="28px"
            font-weight="700"
            fill="rgba(27, 27, 27, 0.7)"
        >
          - ${author}
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
