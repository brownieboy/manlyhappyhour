// Important: these methods have to be defined as "ordinary" functions.
// They cannot be fat arrow functions if we're binding them to the
// context of the React component that's using them.  You cannot
// rebind a fat arrow function!!!  They must be bound with their
// caller, otherwise this will not be set.
import React from "react";
import { SafeAreaView } from "react-native";

export function handleOnLayout(currentDimensions) {
  const { dimensions } = this.state;

  // console.log("handleOnLayout");
  // let newOrientation = "unknown";
  const newDimensions = currentDimensions.get("window");
//   console.log("lifecycleextras..handleOnLayout, newDimensions:");
//   console.log(newDimensions);
  let newState = { dimensions: newDimensions };
  if (newDimensions.width > dimensions.width) {
    // newOrientation = "landscape";
    newState = { ...newState, orientation: "landscape" };
  } else if (newDimensions.width < dimensions.width) {
    // newOrientation = "portrait";
    newState = { ...newState, orientation: "portrait" };
  }
  this.setState(newState);
}


export function wrapSafe(componentToWrap) {
  const { orientation } = this.state;
  if (orientation === "landscape") {
    return <SafeAreaView style={{ flex: 1 }}>{componentToWrap}</SafeAreaView>;
  }
  return componentToWrap;
};