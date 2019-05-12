import React, { Fragment } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
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

  // console.log("elementsDataArray:");
  // console.log(elementsDataArray);

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
          return {
            jsx: (
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
            ),
            type: "image"
          };

        case "listitemreverse":
          return {
            jsx: (
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
            ),
            type: "image"
          };

        case "fullcard": // Deliberate, quadruple fall through!
        case "card": // Deliberate fall through here
        case "":
        default:
          if (item.data.title && item.data.title !== "") {
            return {
              jsx: (
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
              ),
              type: "image"
            };
          }
          return {
            jsx: (
              <FastImage
                key={key}
                source={{ uri: item.data.imageUrl }}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  alignSelf: "center"
                }}
              />
            ),
            type: "image"
          };
      }
    } else if (item.type === "nav") {
      // console.log("options:");
      // console.log(options);
      // console.log("item:");
      // console.log(item);
      if (typeof options.navCallbackObj === "object") {
        return {
          jsx: (
            <Text
              key={{ key }}
              onPress={() =>
                options.navCallbackObj.navigate("VenueScreen", {
                  id: item.data.navId,
                  parentList: "VenuesList"
                })
              }
              style={{ color: "blue" }}
            >
              {item.data.title ? item.data.title : "no title"}
            </Text>
          ),
          type: "nav"
        };
      }

      // Nav with no callback specified is just rendered as text
      return {
        jsx: (
          <Text key={key}>
            {item.data.title ? item.data.title : "no title"}
          </Text>
        ),
        type: "text"
      };
    }

    return {
      jsx: <ParsedTextFormatted key={key}>{item.data}</ParsedTextFormatted>,
      type: "text"
    };

  });

  // console.log("returnElements:");
  // console.log(returnElements);
  // const returnElementsProcessed = returnElements.map(element => element.jsx);
  const returnElementsLength = returnElements.length;

  const returnElementsProcessed = [];
  let elementsForTextArrayWrapper = [];

  let isTextWrapperElementOpen = false;
  let currentObj;
  for (let x = 0; x < returnElementsLength; x++) {
    currentObj = returnElements[x];
    // console.log("currentObj:");
    // console.log(currentObj);
    if (currentObj.type === "text" || currentObj.type === "nav") {
      if (isTextWrapperElementOpen) {
        elementsForTextArrayWrapper.push(currentObj.jsx);
      } else {
        isTextWrapperElementOpen = true;
        elementsForTextArrayWrapper = [];
        elementsForTextArrayWrapper.push(currentObj.jsx);
      }
    }

    if (currentObj.type === "image" || x === returnElementsLength - 1) {
      // Image
      if (isTextWrapperElementOpen) {
        // console.log("Pushing elementsForTextArrayWrapper:");
        // console.log(elementsForTextArrayWrapper);
        isTextWrapperElementOpen = false;
        returnElementsProcessed.push(
          options.padderText ? (
            <Content padder key={`textWrapper${x}`}>
              <Text>{[...elementsForTextArrayWrapper]}</Text>
            </Content>
          ) : (
            <Text key={`textWrapper${x}`}>
              {[...elementsForTextArrayWrapper]}
            </Text>
          )
        );
      }
      if (currentObj.type === "image") {
        returnElementsProcessed.push(currentObj.jsx);
      }
    }
  }

  // console.log("returnElementsProcessed:");
  // console.log(returnElementsProcessed);

  // Final processing to put all adjacent text and nav elements inside another
  // <Text></Text> element.  This was the only way I could find to ensure that
  // they display adjacently rather then in their own block.  Images cannot
  // display inside a Text element (red screen), nor can we use
  // TouchableOpacity for the same reason.

  return <Fragment>{returnElementsProcessed}</Fragment>;
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
