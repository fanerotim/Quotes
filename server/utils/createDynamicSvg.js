const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text) => {

    const content = `
    <svg 
        viewBox="0 0 1200 150"
        xmlns="http://www.w3.org/2000/svg"
        height="150"
        width="600"
    >
        <style>

            .text {
                font-size: 25px;
                fill: rgba(17, 179, 84, 0.8);
            }

        </style>

        <text
            x="5"
            y="30" 
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