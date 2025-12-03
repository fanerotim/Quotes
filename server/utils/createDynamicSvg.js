const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    const content = `
    <svg 
        viewBox="0 0 1200 150"
        xmlns="http://www.w3.org/2000/svg"
        height="150"
        width="400"
    >
        <style>

            .text {
                font-size: 25px;
                fill: rgba(40, 40, 40, 0.8);
            }

        </style>

        <text
            x="5"
            y="35" 
            class="text"
            textLength="900"
        >
            ${text.substring(0, 80)}...
        </text>

        <text
            x="5"
            y="35"
            dy="55"
            dx="510" 
            class="text"
        >
            A quote by ${author}
        </text>
    </svg>`

    try {
        await promises.writeFile(join(__dirname, '../views/test.svg'), content);
        return { message: 'Svg file was written / created successfully!' }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createDynamicSvg
}