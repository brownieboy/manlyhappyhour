import AsyncStorage from "@react-native-community/async-storage";
import { select, put, takeLatest } from "redux-saga/effects";

import {
  LOAD_SETTINGS_NOW,
  TOGGLE_DEAL_TYPE_FILTER,
  TOGGLE_SORT_DEALITEMS_TOWARDS,
  getPersistedSettings,
  setFetchSettingsSucceeded
} from "../settingsReducer.js";

function* loadSettingsGen() {
  // console.log("settingsSagas..loadSettingsGen()");
  const loadedSettingsString = yield AsyncStorage.getItem("settings");
  // console.log("Yield finish");
  // console.log("loadedSettingsString: " + loadedSettingsString);
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

function* setSettingsGen() {
  const persistantSettings = yield select(getPersistedSettings);
  // console.log("persistantSettings");
  // console.log(persistantSettings);

  AsyncStorage.setItem("settings", JSON.stringify(persistantSettings));
}

const settingsSagas = [
  takeLatest(LOAD_SETTINGS_NOW, loadSettingsGen),
  takeLatest(TOGGLE_DEAL_TYPE_FILTER, setSettingsGen),
  takeLatest(TOGGLE_SORT_DEALITEMS_TOWARDS, setSettingsGen)
];

export default settingsSagas;
