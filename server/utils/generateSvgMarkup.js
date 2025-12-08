const generateSvgMarkup = (textArr, author) => {
    const svg = [];

    const firstLineOfText = `
    <svg 
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>

            .text {
                font-size: 40px;
                font-weight: 600;
                font-variant: small-caps;
                fill: rgba(255, 255, 255);
                background: "pink";
            }

        </style>

        <rect width="1200" height="630" fill="rgba(18, 18, 18, 0.7)" />

        <text
            x="8%"
            y="140px"
            class="text"
        >
            ${textArr.shift()}
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

    for (let i = 0; i < textArr.length; i++) {
        svg.push(`
        <text 
            x="8%" 
            y="140px" 
            dy="${55 * (i + 1)}px" 
            class="text">
            ${textArr[i]}
        </text>`
        )
    }

    const lastLineOfText = `
        <text
            x="8%"
            y="580px"
            font-size="28px"
            font-weight="700"
            fill="rgba(243, 243, 243)"
        >
          - ${author}
        </text>
    </svg>
    `
    svg.push(lastLineOfText);
    // return svg as text
    return svg.join(' ');
}

module.exports = {
    generateSvgMarkup
}