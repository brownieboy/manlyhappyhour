export const parseTextFieldToDataTypesArray = sourceString => {
  // const findMarkdownImageReg = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  // Taken from https://stackoverflow.com/questions/7236911/how-to-get-both-the-start-and-end-positions-of-regex-matches-in-javascript
  // let match, startIndex, endIndex;
  // const imageArrayIndexes = [];
  // while ((match = findMarkdownImageReg.exec(sourceString))) {
  //   startIndex = findMarkdownImageReg.lastIndex - match[0].length;
  //   endIndex = findMarkdownImageReg.lastIndex - 1;
  //   imageArrayIndexes.push({
  //     start: startIndex,
  //     end: endIndex,
  //     type: "image"
  //   });
  // }

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
      type: "emoji"
    });
  }

  console.log("early stop");
  console.log("nonTextElementArrayIndexes");
  console.log(nonTextElementArrayIndexes);
  return;

  // console.log("imageArrayIndexes");
  // console.log(imageArrayIndexes);

  // Now need another loop to fill in the gaps between those numbers to get the (still) Text elements
  const allArrayIndexes = [];
  let currentImageObj,
    imageMetaMatches,
    imageUrlMatches,
    imageData,
    imageMetaArray = [];
  let lastImageEnd = 0;
  for (let x = 0; x < nonTextElementArrayIndexes.length; x++) {
    currentImageObj = nonTextElementArrayIndexes[x];

    if (currentImageObj.start !== 0) {
      allArrayIndexes.push({
        start: lastImageEnd === 0 ? 0 : lastImageEnd + 1,
        end: currentImageObj.start,
        type: "text",
        data: sourceString.slice(
          lastImageEnd === 0 ? 0 : lastImageEnd + 1,
          currentImageObj.start
        )
      });
    }

    imageData = sourceString.slice(
      currentImageObj.start,
      currentImageObj.end + 1
    );

    imageMetaMatches = imageData.match(/\[(.*?)\]/);
    imageUrlMatches = imageData.match(/\]\((.*?)\)/);

    imageMetaArray = imageMetaMatches[1].split("|").map(item => item.trim());
    // console.log("imageMetaArray");
    // console.log(imageMetaArray);

    allArrayIndexes.push({
      ...currentImageObj,
      imageData,
      type: "image",
      data: {
        title: imageMetaArray[0] ? imageMetaArray[0] : "",
        type: imageMetaArray[1] ? imageMetaArray[1] : "",
        position: imageMetaArray[2] ? imageMetaArray[2] : "",
        imageUrl: imageUrlMatches[1]
      },
      imageMeta: imageMetaMatches[1]
    });

    // last text, if necessary (i.e. it's after the last image)
    if (x === nonTextElementArrayIndexes.length - 1) {
      if (currentImageObj.end < sourceString.length) {
        allArrayIndexes.push({
          start: currentImageObj.end + 1,
          end: sourceString.length,
          type: "text",
          data: sourceString.slice(currentImageObj.end + 1, sourceString.length)
        });
      }
    }
    lastImageEnd = currentImageObj.end;
  }

  // console.log("allArrayIndexes");
  // console.log(allArrayIndexes);

  const allArrayScrubbed = allArrayIndexes.map(item => ({
    data: item.data,
    type: item.type
  }));

  // console.log("allArrayScrubbed");
  // console.log(allArrayScrubbed);

  // Parsing elements further
  // https://stackoverflow.com/questions/37578988/yet-another-regex-getting-image-from-markdown-bugged-if-markdown-inside

  return allArrayScrubbed;
};
