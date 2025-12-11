const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const linesCount = 6;
    const textToRender = textArr.length > linesCount ? textArr.slice(0, linesCount) : textArr.slice(0)

    const firstLineOfText = `
    <svg 
        viewBox="0 0 500 261"
        width="500"
        height="261"
        xmlns="http://www.w3.org/2000/svg"
    >

        <rect 
            width="500" 
            height="261" 
            fill="rgba(245, 245, 245)"
            shape-rendering="crispEdges" 
        />

        <text
            x="8%"
            y="50px"
            font-size="32px"
            fill="rgb(35, 35, 35)"
            stroke="rgb(35, 35, 35)"
            stroke-width="2px"
            font-weight="bold"
        >
            ${textToRender.shift()}
        <tspan 
            fill="red"
            font-size="42px"
            x="3%"
            y="50px"
        >
            “
        </tspan>

        </text>`

    svg.push(firstLineOfText);

    for (let i = 0; i < textToRender.length; i++) {
        svg.push(
        `<text 
            x="8%" 
            y="50px" 
            dy="${30 * (i + 1)}px" 
            font-size="32px"
            fill="rgb(35, 35, 35)"
            stroke="rgb(35, 35, 35)"
            stroke-width="2px"
            font-weight="bold"
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