import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackgroundVideo from '../shared/BackgroundVideo';

const fbIcon = require('../../../images/facebook-login.png');
const ggIcon = require('../../../images/google-login.png');
const FBLoginManager = require('react-native-facebook-login');


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
  imgButton: {
    width: 150,
    height: 50,
  },
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  getCredentials() {
    FBLoginManager.getCredentials((error, data) => {
      if (!error) {
        console.log('Credentials', data);
      }
    });
  }

  handleLogin() {
    console.log(FBLoginManager);
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native
    FBLoginManager.loginWithPermissions(['email', 'user_friends'], (error, data) => {
      if (!error) {
        this.setState({
          user: data,
        });
        this.props.navigation.dispatch({ type: 'Main' });
      } else {
        alert('Cannt login at this time');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundVideo style={styles.backgroundVideo} />
        <TouchableOpacity
          onPress={() => this.getCredentials()}
        >
          <Image
            style={styles.imgButton}
            resizeMode="contain"
            source={ggIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleLogin()}
        >
          <Image
            style={styles.imgButton}
            resizeMode="contain"
            source={fbIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;
