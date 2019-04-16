export const parseTextFieldToDataTypesArray = sourceString => {
  // const findMarkdownImageReg = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  // Taken from https://stackoverflow.com/questions/7236911/how-to-get-both-the-start-and-end-positions-of-regex-matches-in-javascript

  // Emoji regex pattern taken from https://stackoverflow.com/questions/49745304/regex-to-find-and-replace-emoji-names-within-colons
  const findMarkdownEmojiReg = /:[^:\s]*(?:::[^:\s]*)*:/g;
  let match, startIndex, endIndex;
  const nonTextElementArrayIndexes = [];
  while ((match = findMarkdownEmojiReg.exec(sourceString))) {
    startIndex = findMarkdownEmojiReg.lastIndex - match[0].length;
    endIndex = findMarkdownEmojiReg.lastIndex - 1;
    nonTextElementArrayIndexes.push({
      start: startIndex,
      end: endIndex,
      type: "emoji",
      data: sourceString.slice(startIndex + 1, endIndex)
    });
  }

  // console.log("nonTextElementArrayIndexes");
  // console.log(nonTextElementArrayIndexes);

  // console.log("imageArrayIndexes");
  // console.log(imageArrayIndexes);

  // Now need another loop to fill in the gaps between those numbers to get the (still) Text elements
  const textArrayIndexes = [];
  let currentNonTextObj;

  let lastNonTextEnd = 0;
  for (let x = 0; x < nonTextElementArrayIndexes.length; x++) {
    currentNonTextObj = nonTextElementArrayIndexes[x];

    if (currentNonTextObj.start !== 0) {
      textArrayIndexes.push({
        start: lastNonTextEnd === 0 ? 0 : lastNonTextEnd + 1,
        end: currentNonTextObj.start,
        type: "text",
        data: sourceString.slice(
          lastNonTextEnd === 0 ? 0 : lastNonTextEnd + 1,
          currentNonTextObj.start
        )
      });
    }

    // last text, if necessary (i.e. it's after the last image)
    if (x === nonTextElementArrayIndexes.length - 1) {
      if (currentNonTextObj.end < sourceString.length) {
        textArrayIndexes.push({
          start: currentNonTextObj.end + 1,
          end: sourceString.length,
          type: "text",
          data: sourceString.slice(
            currentNonTextObj.end + 1,
            sourceString.length
          )
        });
      }
    }
    lastNonTextEnd = currentNonTextObj.end;
  }

  // console.log("textArrayIndexes");
  // console.log(textArrayIndexes);

  const allArrayIndexes = [
    ...textArrayIndexes,
    ...nonTextElementArrayIndexes
  ].sort((a, b) => a.start - b.start);
  // console.log("allArrayIndexes");
  // console.log(allArrayIndexes);


  // Parsing elements further
  // https://stackoverflow.com/questions/37578988/yet-another-regex-getting-image-from-markdown-bugged-if-markdown-inside

  return allArrayIndexes;
};
