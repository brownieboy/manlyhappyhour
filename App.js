import React, { Component } from "react";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import MainNavigator from "./src/nav/main-nav.js";
import configureStore from "./src/store/configureStore.js";

const store = configureStore({});

class App extends Component {
  // constructor(props){
  //   super(props);
  //   Text.defaultProps.uppercase = false;
  // }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen for Android.
    // We'll stick with Storyboard for iOS.
    // if (Platform.OS === "android") {
    SplashScreen.hide();
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
