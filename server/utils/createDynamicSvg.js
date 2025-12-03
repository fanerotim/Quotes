const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text, author) => {

    const content = `
    <svg 
        viewBox="0 0 300 150"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 15px;
                fill: rgba(40, 40, 40, 0.8);
            }

        </style>

        <text
            x="5"
            y="35"
            dy="55"
            dx="50" 
            class="text"
        >
            ${author}
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