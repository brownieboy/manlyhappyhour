import React, { Component } from "react";
import PropTypes from "prop-types";

import { FlatList, Text, View } from "react-native";

import {
  Container,
  Header,
  Icon,
  Title,
  Content,
  ListItem,
  Left,
  Right,
  Body
  // Thumbnail
} from "native-base";

class VenuesScreen extends Component {
  componentDidMount() {
    const { loadVenuesNow, venuesList } = this.props;
    loadVenuesNow();
  }
  render() {
    const { venuesList, navigation } = this.props;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Venues</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <FlatList
            data={[...venuesList]}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("VenueScreen", {
                    id: item.id,
                    parentList: "VenuesList"
                  })
                }
              >
                <View style={{ flex: 11 }}>
                  <Text>{item.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Icon
                    name="arrow-forward"
                    style={{ fontSize: 20, color: "lightgrey" }}
                  />
                </View>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

VenuesScreen.propTypes = {
  loadVenuesNow: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VenuesScreen;
