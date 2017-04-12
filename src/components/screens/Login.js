import React, { PropTypes } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackgroundVideo from '../shared/BackgroundVideo';
import { AuthButton } from '../shared';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <BackgroundVideo style={styles.backgroundVideo} />
    <AuthButton navigation={navigation} />
  </View>
);

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;
