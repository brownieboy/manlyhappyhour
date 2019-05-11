import React, { Fragment } from "react";
import { Dimensions, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Body, Content, Item, Left, ListItem, Right } from "native-base";

import ParsedTextFormatted from "../components/parsed-text-formatted.js";

// Current types are:
//    * fullcard: full width of screen, and a proportionate height, assumed Landscape
//    * card: 90% width of screen, and a proportionate height, assumed Landscape
//    * listitem: a Nativebase ListItem with thumbnail, square image on left and text on right.
//    * listitemreverse: a Nativebase ListItem with test on left, and thumbnail, square image on right.

export const renderTextImageElements = (
  elementsDataArray,
  options = { padderText: false }
) => {
  let key = 0,
    imageWidth,
    imageHeight;
  const newDimensions = Dimensions.get("window");
  const thumbnailStyle = { width: 55, height: 40 };
  const ListItemStyle = {
    // borderWidth: 1,
    // borderColor: "red",
    // marginTop: 0,
    // marginBottom: 0
  };

  console.log("elementsDataArray:");
  console.log(elementsDataArray);

  const returnElements = elementsDataArray.map(item => {
    key++;

    // First switch sets width and height for the card types
    if (item.type === "image") {
      switch (item.data.type) {
        case "fullcard":
          imageWidth = newDimensions.width;
          imageHeight = Math.round((imageWidth * 0.9 * 9) / 16);
          break;
        case "card": // Deliberate, triple fall through here
        case "":
        default:
          imageWidth = newDimensions.width * 0.9;
          imageHeight = Math.round((imageWidth * 0.9 * 9) / 16);
      }

      // Yes, a second switch on the same variable!
      switch (item.data.type) {
        case "listitem":
          return (
            <ListItem key={key} style={ListItemStyle}>
              <Left style={{ flex: 2 }}>
                <FastImage
                  source={{ uri: item.data.imageUrl }}
                  style={thumbnailStyle}
                />
              </Left>
              <Body style={{ flex: 6 }}>
                <Text>{item.data.title}</Text>
              </Body>
            </ListItem>
          );

        case "listitemreverse":
          return (
            <ListItem key={key} style={ListItemStyle}>
              <Body style={{ flex: 6 }}>
                <Text>{item.data.title}</Text>
              </Body>
              <Right style={{ flex: 2 }}>
                <FastImage
                  source={{ uri: item.data.imageUrl }}
                  style={thumbnailStyle}
                />
              </Right>
            </ListItem>
          );

        case "fullcard": // Deliberate, quadruple fall through!
        case "card": // Deliberate fall through here
        case "":
        default:
          if (item.data.title && item.data.title !== "") {
            return (
              <View key={key}>
                <FastImage
                  source={{ uri: item.data.imageUrl }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    alignSelf: "center"
                  }}
                />
                <Text style={{ alignSelf: "center", fontSize: 12 }}>
                  {item.data.title}
                </Text>
              </View>
            );
          }
          return (
            <FastImage
              key={key}
              source={{ uri: item.data.imageUrl }}
              style={{
                width: imageWidth,
                height: imageHeight,
                alignSelf: "center"
              }}
            />
          );
      }
    }
    const textParsed = (
      <ParsedTextFormatted key={key}>{item.data}</ParsedTextFormatted>
    );
    return options.padderText ? (
      <Content key={key} padder>
        {textParsed}
      </Content>
    ) : (
      textParsed
    );
  });
  return <Fragment>{returnElements}</Fragment>;
};

/*
        case "listitem":
          return (
            <ListItem thumbnail key={key}>
              <Left>
                <FastImage
                  source={{ uri: item.data.imageUrl }}
                  style={thumbnailStyle}
                />
              </Left>
              <Body>
                <Text>{item.data.title}</Text>
              </Body>
            </ListItem>
          );

        case "listitemreverse":
          return (
            <ListItem thumbnail key={key}>
              <Body>
                <Text>{item.data.title}</Text>
              </Body>
              <Right>
                <FastImage
                  source={{ uri: item.data.imageUrl }}
                  style={thumbnailStyle}
                />
              </Right>
            </
*/
