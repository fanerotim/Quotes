const prepareOgImageText = (text) => {

    // convert text into an string[];
    const wordsInText = text.split(' ');
    const lastWord = wordsInText[wordsInText.length - 1];
    const textOutput = [];

    let line = '';

    // TODO; this is the first idea i got when writing this functionality. i am still testing it, so it is not optimized and from my tests it works. 
    // See if it can be optimized
    for (word of wordsInText) {

        if (line.length === 0) {
            line += word;
        } else if (line.length + word.length <= 50) {
            line += ` ${word}`;

            // if no more words in wordsInText[] (quote ended) add the line. 
            // otherwise this line is not handled by other conditionals and it gets lost
            if (word === lastWord) {
                textOutput.push(line);
            }

        } else {
            textOutput.push(line);
            line = '';
            line += word;
        }
    }

    return textOutput;
}

module.exports = {
    prepareOgImageText
}