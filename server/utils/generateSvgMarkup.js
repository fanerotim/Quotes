const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const linesCount = 6;
    const textToRender = textArr.length > linesCount ? textArr.slice(0, linesCount) : textArr.slice(0)
    const quoteTextSize = 26;
    const quotesSignSize = 300;

    const firstLineOfText = `
    <svg 
        viewBox="0 0 500 261"
        width="2400"
        height="1260"
        xmlns="http://www.w3.org/2000/svg"
    >

        <rect 
            width="2400" 
            height="1260" 
            fill="rgba(255, 255, 255)"
        />

        <text
            x="8%"
            y="120px"
            font-size="${quoteTextSize}px"
            fill="rgb(0, 0, 0)"
            stroke="rgb(255, 255, 255)"
            stroke-width="1px"
        >
            ${textToRender.shift()}
        <tspan 
            fill="red"
            font-size="${quotesSignSize}px"
            x="3%"
            y="228px"
        >
            “
        </tspan>

        </text>`

    svg.push(firstLineOfText);

    for (let i = 0; i < textToRender.length; i++) {
        svg.push(
        `<text 
            x="8%" 
            y="120px" 
            dy="${32 * (i + 1)}px" 
            font-size="${quoteTextSize}px"
            fill="rgb(0, 0, 0)"
            stroke="rgb(255, 255, 255)"
            stroke-width="1px"
        >
            ${
                // if text is longer that what we can show add ellipsis at the end 
                textArr.length > linesCount && i === textToRender.length - 1 
                    ? `${textToRender[i]}...` 
                    : textToRender[i]
            }
        </text>`)
    }

    const lastLineOfText = `
        <text
            x="8%"
            y="500px"
            font-size="33px"
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