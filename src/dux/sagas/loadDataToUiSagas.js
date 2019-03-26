import { all, fork, put, take, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";

// import preloadRNICimages from "../../helper-functions/preload-rnic-images.js";

import {
  LOAD_VENUES_NOW,
  setFetchVenuesSucceeded,
  setFetchVenuesFailed,
  setFetchVenuesRequest
} from "../venuesReducer.js";

// Worker Saga: will be fired on LOAD_BANDS_NOW actions, and gets all
// data, not just bands
function* loadDataGen() {
  // yield console.log("loadBandsgen() triggered in loadDataToUi.js");
  yield put(setFetchVenuesRequest());

  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    // console.log("Getting data from Firebase");
    // const dataNormalisedString = yield AsyncStorage.getItem(
    //   "localPublishedData"
    // );

    const dataNormalisedString = yield require("../../api/localvenues.json");
    console.log("loadDataToUiSagas.js, dataNormalisedString:");
    console.log(dataNormalisedString);

    // console.log("Parsing data from Firebase");
    // console.log("bandsDataNormalisedString");
    // console.log(bandsDataNormalisedString);
    if (dataNormalisedString) {
      console.log("Local storage returned data");

      // It's a string when returned from Firebase.
      // const dataNormalised = JSON.parse(dataNormalisedString);
      const dataNormalised = dataNormalisedString;

      // console.log("bandsDataNormalised");
      // console.log(bandsDataNormalised);
      // Filter out any half-completed data that we might have pulled
      // down from Firebase
      // console.log("imageUrls");
      // console.log(JSON.stringify(imageUrls, null, 2));
      const venuesArray = dataNormalised.venuesArray;
      // yield console.log("loadBandsGen, about to yield all with loaded data");
      yield all([put(setFetchVenuesSucceeded(venuesArray))]);
      // yield console.log("loadBandsGen, finished yield all with loaded data");

      // console.log("Have restored preloadImage here");
      // preloadImages([...bandsArray, ...stagesArray]);
      // yield preloadRNICimages(imageUrls);
      // yield;
    } else {
      console.log("Local storage returned null");
    }
  } catch (e) {
    console.log("loadBandsGen error=" + e);
    yield all([put(setFetchVenuesFailed(e))]);
  }
}

const loadDataToUISagas = [takeLatest(LOAD_VENUES_NOW, loadDataGen)];

export default loadDataToUISagas;
