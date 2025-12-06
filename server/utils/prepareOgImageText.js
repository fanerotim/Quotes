const prepareOgImageText = (text) => {

    // convert the text of the current quote into a string[];
    const wordsInText = text.split(' ');
    const lastWord = wordsInText[wordsInText.length - 1];
    const lineLength = 40;
    const textOutput = [];

    let line = [];

    for (word of wordsInText) {
        const currentLineLength = line.join(' ').length;

        // if current word is the last word in the text we have unique case - the loop ends and it wil. 
        // so we need to add the current word to the current line at this point despite the fact that the current line length is < textLength and then add this line to the arr to be returned
        if (word === lastWord) {
            line.push(word);
            textOutput.push(line.join(' '));
            return textOutput;
        }

        if (currentLineLength + word.length <= lineLength) {
            line.push(word);
        } else {
            const lineOfText = line.join(' ');
            textOutput.push(lineOfText);
            line = [word];
        }
    }

    return textOutput;
}

module.exports = {
    prepareOgImageText
}