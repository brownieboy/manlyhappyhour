import { all } from "redux-saga/effects";

// import dataSagas from "./dataSagas.js";
import firebaseSagas from "./firebaseSagas.js";
// import uiSagas from "./uiSagas.js";
// import favouritesSagas from "./favouritesSagas.js";
import loadDataToUISagas from "./loadDataToUiSagas.js";
// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([
    // ...dataSagas,
    ...firebaseSagas,
    // ...favouritesSagas,
    ...loadDataToUISagas
    // ...uiSagas
  ]);
}
export default sagas;
