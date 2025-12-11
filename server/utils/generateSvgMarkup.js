const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const linesCount = 6;
    const textToRender = textArr.length > linesCount ? textArr.slice(0, linesCount) : textArr.slice(0)

    const firstLineOfText = `
    <svg 
        viewBox="0 0 2400 1260"
        width="2400"
        height="1260"
        xmlns="http://www.w3.org/2000/svg"
    >

        <rect 
            width="2400" 
            height="1260" 
            fill="rgba(245, 245, 245)"
            shape-rendering="crispEdges" 
        />

        <text
            x="8%"
            y="280px"
            font-size="200px"
            fill="rgb(35, 35, 35)"
            font-weight="bold"
            stroke="rgb(35, 35, 35)"
            stroke-width="15px"
        >
            ${textToRender.shift()}
        <tspan 
            fill="red"
            font-size="300px"
            x="3%"
            y="280px"
        >
            “
        </tspan>

        </text>`

    svg.push(firstLineOfText);

    for (let i = 0; i < textToRender.length; i++) {
        svg.push(
        `<text 
            x="8%" 
            y="280px" 
            dy="${192 * (i + 1)}px" 
            font-size="200px"
            fill="rgb(35, 35, 35)"
            font-weight="bold"
            stroke="rgb(35, 35, 35)"
            stroke-width="15px"
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
            y="1160px"
            font-size="160px"
            fill="rgba(40, 40, 40, .9)"
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