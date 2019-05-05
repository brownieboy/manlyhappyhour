import PropTypes from "prop-types";
import React, { Component } from "react";
// import { Button } from "native-base";

import { Text, View } from "react-native";
class HomeScreen extends Component {
  componentDidMount() {
    const { loadVenuesNow } = this.props;
    loadVenuesNow();
    // loadSettingsNow();
  }
  render() {
    const { homeData } = this.props;
    console.log("homeData:");
    console.log(homeData);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>App Home Screen</Text>
        {/* <Button onPress={() => this.props.navigation.navigate("Venues")}>
          <Text>Go to Venues</Text>
        </Button> */}
      </View>
    );
  }
}

HomeScreen.propTypes = {
  loadVenuesNow: PropTypes.func.isRequired
  // loadSettingsNow: PropTypes.func.isRequired
};

export default HomeScreen;
