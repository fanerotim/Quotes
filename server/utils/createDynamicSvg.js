const { promises } = require('fs');
const { join } = require('path');
const { prepareOgImageText } = require('./prepareOgImageText');
const { generateSvgMarkup } = require('./generateSvgMarkup');

const createDynamicSvg = async (text, author) => {

    const ogImageTextArray = prepareOgImageText(text);
    const svg = generateSvgMarkup(ogImageTextArray, author);

    try {
        await promises.writeFile(join(__dirname, '../views/quoteOgImage.svg'), svg);
        return { message: 'Svg file was written / created successfully!' }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {    createDynamicSvg
}
