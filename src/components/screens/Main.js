import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

import LoginStatusMessage from '../views/LoginStatusMessage';
import { AuthButton } from '../shared';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = ({ navigation }) => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <AuthButton />
    <Button title="Map" onPress={() => navigation.dispatch({ type: 'Map' })}/>
  </View>
);

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
