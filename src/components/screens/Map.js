import React from 'react';
import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
});

const Map = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  </View>
);
Map.navigationOptions = {
  title: 'Map Screen',
};

export default Map;
