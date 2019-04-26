import AsyncStorage from "@react-native-community/async-storage";
import { put, takeLatest } from "redux-saga/effects";

import {
  LOAD_SETTINGS_NOW,
  setFetchSettingsSucceeded
} from "../settingsReducer.js";

function* loadSettingsGen() {
  console.log("settingsSagas..loadSettingsGen()");
  const loadedSettingsString = yield AsyncStorage.getItem("settings");
  console.log("loadedSettingsString: " + loadedSettingsString);
  try {
    const loadedSettingsObj = loadedSettingsString
      ? JSON.parse(loadedSettingsString)
      : null;
    if (loadedSettingsObj) {
      yield put(setFetchSettingsSucceeded(loadedSettingsObj));
    }

    // console.log("loadedSettingsObj:");
    // console.log(loadedSettingsObj);
  } catch (e) {
    console.log("Error retrieving settings; " + e);
  }
}

const settingsSagas = [takeLatest(LOAD_SETTINGS_NOW, loadSettingsGen)];

export default settingsSagas;
