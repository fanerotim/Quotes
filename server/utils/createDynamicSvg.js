const { promises } = require('fs');
const { join } = require('path');

const createDynamicSvg = async (text) => {

    const content = `
    <svg 
        viewBox="0 0 1200 250"
        xmlns="http://www.w3.org/2000/svg"
    >
        
        <text 
            x="150" 
            y="75"
            font-size="15px"
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