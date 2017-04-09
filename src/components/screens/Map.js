import React from 'react';
import { StyleSheet, View, DeviceEventEmitter, NativeModules } from 'react-native';
import { BaseScreen } from '../base/';
import MapView from 'react-native-maps';

import RNLocation from 'react-native-gps';

RNLocation.requestWhenInUseAuthorization();

const LATITUDE = 10.7626959;
const LONGITUDE = 106.6943237;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const CAR_ICON = require('../../../images/car.png');

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

class Map extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      marker: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    }
    // };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    DeviceEventEmitter.removeAllListeners('locationUpdated');
  }

  componentDidMount() {
    RNLocation.startUpdatingLocation();
    DeviceEventEmitter.addListener(
        'locationUpdated',
        (data) => {
          console.log('locationUpdated', data);
          const { latitude, longitude } = data;
          const region = Object.assign({latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}, {latitude, longitude});
          const marker = Object.assign({}, this.state.marker, {latitude, longitude});
          this.setState({marker, region});
        }
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('locationUpdated');
  }

  onRegionChange(region) {
    this.region.setValue(region);
  }

  render() {
    const { region, marker } = this.state;
    return (<View style={styles.container}>
      <MapView.Animated
        style={styles.map}
        region={region}
      >
        <MapView.Marker.Animated
          coordinate={marker}
          title={'My car'}
          description={'Here is my car'}
          image={CAR_ICON}
        />
      </MapView.Animated>
    </View>);
  }
};
Map.navigationOptions = {
  title: 'Map Screen',
};

export default Map;
