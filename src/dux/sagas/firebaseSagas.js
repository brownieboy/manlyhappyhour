import AsyncStorage from "@react-native-community/async-storage";
// import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import firebaseApp, { reduxSagaFirebase } from "../../api/firebase-native.js";
import deepEqual from "deep-equal";

import { LOAD_VENUES_NOW } from "../venuesReducer.js";

let updateChannel;
// const firebaseDatabaseRef = firebaseApp.database().ref("publishedData");
const firebaseDatabaseRef = firebaseApp.database().ref("publishedLive");

function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on("value", snap => {
      emit({
        key: snap.key,
        value: snap.val()
      });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  // console.log("listener:");
  // console.log(listener);
  return listener;
}

function* updatedItemSaga() {
  updateChannel = createEventChannel(firebaseDatabaseRef);
  let overwriteLocal = false;
  while (true) {
    const item = yield take(updateChannel);
    try {
      console.log("updatedItemSaga read, item: ");
      console.log(item);
      // console.log("running updatedItemSaga, inside loop, localPublishedData");
      const localPublishedDataString = yield AsyncStorage.getItem(
        "localPublishedData"
      );
      console.log("localPublishedDataString from Aysnc storage ");
      console.log(JSON.parse(localPublishedDataString));
      if (!localPublishedDataString) {
        console.log("No local data stored");
        overwriteLocal = true;
      } else {
        console.log("We have local data stored");
        const localPublishedData = JSON.parse(localPublishedDataString);
        if (!deepEqual(localPublishedData, item.value)) {
          console.log("local and server don't match, so update...");
          overwriteLocal = true;
        } else {
          console.log("local and server match, don't update..");
        }
      }
    } catch (e) {
      console.log("updatedItemSaga error: " + e);
    } finally {
      if (overwriteLocal) {
        console.log("Overwriting local data...");

        yield AsyncStorage.setItem(
          "localPublishedData",
          JSON.stringify(item.value)
        );
        yield put({ type: LOAD_VENUES_NOW });
      }
    }
  }
}

const firebaseSagas = [
  fork(updatedItemSaga)
  // takeLatest(CLEAR_ALL_LOCAL_DATA, clearAllLocalDataGen)
];
export default firebaseSagas;

/*
import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
// import { ImageCache } from "react-native-img-cache";
import deepEqual from "deep-equal";
// import firebaseApp, { reduxSagaFirebase } from "../../api/firebase.js";
import firebaseApp, { reduxSagaFirebase } from "../../api/firebase-native.js";

import { CLEAR_ALL_LOCAL_DATA } from "../homeReducer.js";
import { LOAD_BANDS_NOW } from "../bandsReducer.js";

let updateChannel;
const firebaseDatabaseRef = firebaseApp.database().ref("publishedData");

export function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on("value", snap => {
      emit({
        key: snap.key,
        value: snap.val()
      });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

function* updatedItemSaga() {
  // console.log("running updatedItemSaga...");
  updateChannel = createEventChannel(firebaseDatabaseRef);

  while (true) {
    // console.log("running updatedItemSaga, inside loop...");
    const item = yield take(updateChannel);
    let overwriteLocal = false;
    try {
      // console.log("getting local data");
      const existingBandsDataString = yield AsyncStorage.getItem(
        "localPublishedData"
      );
      // console.log("type of existingBandsData=" + typeof existingBandsDataString);
      const existingBandsData = JSON.parse(existingBandsDataString);
      // console.log("existingBandsData=" + JSON.stringify(existingBandsData, null, 4).substring(0, 200));
      if (!deepEqual(existingBandsData, item.value)) {
        console.log("local and server don't match, so update...");
        overwriteLocal = true;
      } else {
        console.log("local and server match, don't update..");
      }
    } catch (e) {
      console.log(
        "Error in parsing local storage.  Overwriting with Firebase.  Error=" +
          e
      );
      overwriteLocal = true;
    } finally {
      if (overwriteLocal) {
        console.log("Overwriting local data...");
        // console.log("Clearing images cache, the whole smash....");
        // ImageCache.get().clear();

        yield AsyncStorage.setItem(
          "localPublishedData",
          JSON.stringify(item.value)
        );
        yield put({ type: LOAD_BANDS_NOW });
      }
    }
  }
}

function* clearAllLocalDataGen() {
  // ImageCache.get().clear();
  yield AsyncStorage.setItem("localPublishedData", "");
  const newData = yield call(reduxSagaFirebase.database.read, "publishedData");
  yield AsyncStorage.setItem("localPublishedData", JSON.stringify(newData));
  yield put({ type: LOAD_BANDS_NOW });
}

const firebaseSagas = [
  fork(updatedItemSaga),
  takeLatest(CLEAR_ALL_LOCAL_DATA, clearAllLocalDataGen)
];

export default firebaseSagas;
*/
