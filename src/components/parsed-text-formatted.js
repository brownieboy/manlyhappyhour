import React from "react";
import ParsedText from "react-native-parsed-text";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { email, text, web, phonecall } from "react-native-communications";
import nodeEmoji from "node-emoji";

// Probably belongs in here, but never mind..
// import { parsedTextArray } from "../helper-functions/text-links.js";

const touchStyles = StyleSheet.create({
  text: {
    color: "blue"
  }
});

// \*(\S(.*?\S)?)\*

// const boldPattern = /(\*|^\*)(?=\S)([\s\S]*?\S)\*\s(?![**])/gm;
// const italicPattern = /(_|^_)(?=\S)([\s\S]*?\S)_\s(?![_*])/gm;
// const strikethroughPattern = /(-|^-)(?=\S)([\s\S]*?\S)-\s(?![-*])/gm;

// Latest regex patterns taken from:
// https://stackoverflow.com/questions/47016770/replace-markdown-characters-with-regex/47016951#47016951
const boldPattern = /\*(\S(.*?\S)?)\*/gm;
const italicPattern = /_(\S(.*?\S)?)\_/gm;
const strikethroughPattern = /-(\S(.*?\S)?)\-/gm;
const emojiPattern = /:(\S(.*?\S)?)\:/gm;

const markdownStyles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  boldItalic: {
    fontWeight: "bold",
    fontStyle: "italic"
  },
  strikethrough: {
    textDecorationLine: "line-through"
  }
});

const renderBoldText = (matchingString, matches) => {
  const match = matchingString.match(boldPattern);
  return `${match[0].replace(/\*(.*)\*/, "$1")}`;
};

const renderItalicText = (matchingString, matches) => {
  const match = matchingString.match(italicPattern);
  return `${match[0].replace(/_(.*)_/, "$1")}`;
};

const renderStrikethroughText = (matchingString, matches) => {
  const match = matchingString.match(strikethroughPattern);
  return `${match[0].replace(/-(.*)-/, "$1")}`;
};

const renderEmoji = (matchingString, matches) => {
  const match = matchingString.match(emojiPattern);
  // console.log("remderEmoji match");
  // console.log(match);
  return `${match[0].replace(
    /:(.*):/,
    nodeEmoji.get(match[0].replace(/:/g, ""))
  )}`;
};

const parsedTextArray = [
  {
    style: touchStyles.text,
    type: "url",
    onPress: url => web(url)
  },
  {
    style: touchStyles.text,
    type: "email",
    onPress: emailAddress =>
      email(
        [decodeURI(emailAddress)],
        null,
        null,
        emailAddress.indexOf("brownieboy") >= 0 ? "Mobile App Development" : "",
        ""
      )
  },
  // {
  //   // Bold and italics (matching underscores inside asterisks)
  //   // This must go before the separate bold and italic entries
  //   pattern: boldItalicPattern,
  //   style: markdownStyles.boldItalic,
  //   renderText: renderBoldItalicText
  // },
  {
    // Emoji (matching colons)
    pattern: emojiPattern,
    style: {},
    renderText: renderEmoji
  },
  {
    // Bold (matching asterisks)
    pattern: boldPattern,
    style: markdownStyles.bold,
    renderText: renderBoldText
  },
  {
    // Italic (matching underscores)
    pattern: italicPattern,
    style: markdownStyles.italic,
    renderText: renderItalicText
  },
  {
    // strikethrough (matching dashes)
    pattern: strikethroughPattern,
    style: markdownStyles.strikethrough,
    renderText: renderStrikethroughText
  }
];

const ParsedTextFormatted = ({ children }) => (
  <ParsedText
    style={{ fontSize: 15 }}
    parse={parsedTextArray}
    childrenProps={{ allowFontScaling: false }}
  >
    {children}
  </ParsedText>
);

ParsedTextFormatted.propTypes = {
  children: PropTypes.string.isRequired
};

export default ParsedTextFormatted;
