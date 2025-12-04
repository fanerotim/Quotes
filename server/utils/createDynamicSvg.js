const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    const content = `
    <svg 
        width="1200"
        height="630"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 18px;
                fill: rgba(40, 40, 40, 0.8);
            }

        </style>

        <text
            x="20%"
            y="40%"
            class="text"
        >
            ${text}
            <tspan 
                fill="red"
                font-size="20px"
                x="35"
                y="30%"
            >
                "
            </tspan>

        </text>

        <text
            dx="60%"
            dy="80%"
            font-size="3px"
        >
            A quote by ${author}
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