import firebase from "react-native-firebase";
import ReduxSagaFirebase from "redux-saga-firebase";

//  Conig is stored in the GoogleService-Info.plist file for react-native-firebase
export const reduxSagaFirebase = new ReduxSagaFirebase(firebase);
export default firebase;
