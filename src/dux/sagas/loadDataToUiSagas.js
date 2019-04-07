import { all, fork, put, take, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
// import { AsyncStorage } from "react-native";
import FastImage from "react-native-fast-image";

// import preloadRNICimages from "../../helper-functions/preload-rnic-images.js";ß

import {
  LOAD_VENUES_NOW,
  setFetchVenuesSucceeded,
  setFetchVenuesFailed,
  setFetchVenuesRequest
} from "../venuesReducer.js";

const preloadImages = imageUrlsArray => {
  const uriObjArray = imageUrlsArray.map(url => ({ uri: url }));
  console.log("loadDataToUiSagas..preloadImages, uriObjArray:");
  console.log(uriObjArray);
  FastImage.preload(uriObjArray);
};


// Worker Saga: will be fired on LOAD_BANDS_NOW actions, and gets all
// data, not just bands
function* loadDataGen() {
  yield console.log("setFetchVenuesRequest() triggered in loadDataToUi.js");
  yield put(setFetchVenuesRequest());

  try {
    const dataNormalisedString = yield AsyncStorage.getItem(
      "localPublishedData"
    );

    // const dataNormalisedString = yield require("../../api/localvenues.json");
    // console.log("loadDataToUiSagas.js, dataNormalisedString:");
    // console.log(dataNormalisedString);

    // console.log("Parsing data from Firebase");
    // console.log("bandsDataNormalisedString");
    // console.log(bandsDataNormalisedString);
    if (dataNormalisedString) {
      // console.log("Local storage returned data");

      // It's a string when returned from Firebase.
      const dataNormalised = JSON.parse(dataNormalisedString);
      // const dataNormalised = dataNormalisedString;

      console.log("dataNormalised");
      console.log(dataNormalised);
      // Filter out any half-completed data that we might have pulled
      // down from Firebase
      // console.log("imageUrls");
      // console.log(JSON.stringify(imageUrls, null, 2));
      const venuesArray = dataNormalised.venuesArray;
      const imageUrls = dataNormalised.imageUrls;
      console.log("venuesArray:");
      console.log(venuesArray);

      // yield console.log("loadBandsGen, about to yield all with loaded data");
      yield all([put(setFetchVenuesSucceeded(venuesArray))]);
      // yield console.log("loadBandsGen, finished yield all with loaded data");

      // console.log("Have restored preloadImage here");
      // preloadImages([...bandsArray, ...stagesArray]);
      yield preloadImages(imageUrls);
      // yield;
    } else {
      console.log("Local storage returned null");
    }
  } catch (e) {
    console.log("loadDataGen error=" + e);
    yield all([put(setFetchVenuesFailed(e))]);
  }
}

const loadDataToUISagas = [takeLatest(LOAD_VENUES_NOW, loadDataGen)];

export default loadDataToUISagas;
