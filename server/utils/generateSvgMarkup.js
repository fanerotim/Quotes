const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const linesCount = 6;
    const textToRender = textArr.length > linesCount ? textArr.slice(0, linesCount) : textArr.slice(0)

    const firstLineOfText = `
    <svg 
        viewBox="0 0 1200 630"
        width="1200"
        height="630"
        xmlns="http://www.w3.org/2000/svg"
    >

        <rect width="1200" height="630" fill="rgba(18, 18, 18)" />

        <text
            x="8%"
            y="140px"
            font-size="40px"
            font-weight="700"
            font-variant="small-caps"
            fill="rgba(255, 255, 255)"
        >
            ${textToRender.shift()}
        <tspan 
            fill="red"
            font-size="110px"
            x="3%"
            y="140px"
        >
            “
        </tspan>

        </text>`

    svg.push(firstLineOfText);

    for (let i = 0; i < textToRender.length; i++) {
        svg.push(
        `<text 
            x="8%" 
            y="140px" 
            dy="${55 * (i + 1)}px" 
            font-size="40px"
            font-weight="700"
            font-variant="small-caps"
            fill="rgba(255, 255, 255)"
        >
            ${
                // if text is longer that what we can show add ellipsis at the end 
                textArr.length > linesCount && i === textToRender.length - 1 
                    ? `${textToRender[i]}...` 
                    : textToRender[i]
            }
        </text>`
        )
    }

    const lastLineOfText = `
        <text
            x="8%"
            y="580px"
            font-size="28px"
            font-weight="700"
            font-variant="small-caps"
            fill="rgba(255, 255, 255)"
        >
          - ${author}
        </text>
    </svg>`

    svg.push(lastLineOfText);
    // return svg as text
    return svg.join(' ');
}

module.exports = {
    generateSvgMarkup
}