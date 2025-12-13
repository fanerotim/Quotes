const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const linesCount = 5;
    const textToRender = textArr.length > linesCount ? textArr.slice(0, linesCount) : textArr.slice(0)
    
    const quoteTextSize = 25;
    const quoteTextColor = "rgba(1, 1, 1, 1)";
    const quoteTextYOffset = 90;
    
    const backgroundColor = "rgba(245, 245, 245, 1)";
    
    const quotesSignColor = 'rgba(148, 45, 45, 1)';
    const quotesSignSize = 150;
    const quotesSignYOffset = 120;

    const authorTextColor = 'rgba(152, 67, 67, 1)';

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
            fill="${backgroundColor}"
        />

        <text
            x="8%"
            y="${quoteTextYOffset}px"
            font-size="${quoteTextSize}px"
            font-weight="bold"
            fill="${quoteTextColor}"
            stroke="${backgroundColor}"
            stroke-width=".1px"
        >
            ${textToRender.shift()}
        <tspan 
            fill="${quotesSignColor}"
            font-size="${quotesSignSize}px"
            font-weight="bold"
            x="3%"
            y="${quotesSignYOffset}px"
        >
            “
        </tspan>

        </text>`

    svg.push(firstLineOfText);

    for (let i = 0; i < textToRender.length; i++) {
        svg.push(
        `<text 
            x="8%" 
            y="${quoteTextYOffset}px" 
            dy="${26 * (i + 1)}px" 
            font-weight="bold"
            font-size="${quoteTextSize}px"
            fill="${quoteTextColor}"
            stroke="${backgroundColor}"
            stroke-width=".1px"
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
            y="240px"
            font-size="16px"
            font-weight="bold"
            stroke="${authorTextColor}"
            fill="${authorTextColor}"
            storke-width="2px"
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