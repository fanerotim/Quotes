const generateSvgMarkup = (textArr) => {
    const svg = [];

    for (let i = 0; i < textArr.length - 1; i++) {
        svg.push(`
        <text 
            x="5%" 
            y="140px" 
            dy="${60 * (i + 1)}px" 
            class="text">
            ${textArr[i + 1]}
        </text>`
        )
    }
    console.log(svg);
    return svg;
}

module.exports = {
    generateSvgMarkup
}