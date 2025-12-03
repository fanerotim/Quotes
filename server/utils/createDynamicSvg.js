const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    const content = `
    <svg 
        viewBox="0 0 150 100"
        width="150"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 10px;
                fill: rgba(40, 40, 40, 0.8);
            }

        </style>

        <text
            x="10"
            y="35"
            class="text"
        >
            ${text}
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