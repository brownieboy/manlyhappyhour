import { Platform } from "react-native";

export const getFavouritesIconObj = showOnlyFavourites => {
  let favouritesIcon, favouritesIconColour;
  if (showOnlyFavourites) {
    favouritesIconColour = "red";
    if (Platform.OS === "ios") {
      favouritesIcon = "ios-heart";
    } else {
      favouritesIcon = "md-heart";
    }
  } else {
    favouritesIconColour = "grey";
    if (Platform.OS === "ios") {
      favouritesIcon = "ios-heart-empty";
    } else {
      // favouritesIcon = "md-heart-empty";
      favouritesIcon = "md-heart";

    }
  }
  return { name: favouritesIcon, colour: favouritesIconColour };
};
