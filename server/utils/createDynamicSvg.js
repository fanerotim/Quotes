const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text) => {
    console.log('I was called to create a dynamic svg with this text', text);
    const content = `
    <svg viewBox="0 0 1200 250" xmlns="http://www.w3.org/2000/svg">
        <style>
            .small {
            font: italic 5px sans-serif;
            }

        </style>
        <text x="20" y="35" class="small">${text}</text>
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