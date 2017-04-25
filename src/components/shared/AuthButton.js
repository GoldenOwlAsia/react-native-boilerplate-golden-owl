import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import {
  Button,
  Text,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  setUser,
} from '../../actions';

class AuthButton extends React.Component {

  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  setupGoogleSignin() {
    console.log('setupGoogleSignin');
    try {
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
          iosClientId: '874877251104-i6rc71fuhunj5qulpoa1g75sqgrpppr5.apps.googleusercontent.com',
          offlineAccess: false,
        }).then(() => {
          GoogleSignin.currentUserAsync().then((user) => {
            console.log('done sync', user);
            if (user) {
              this.doSignIn(user);
            }
          });
        });
      });
    } catch (err) {
      console.log('Google signin error', err.code, err.message);
    }
  }

  signIn() {
    GoogleSignin.signIn()
      .then((user) => {
        this.doSignIn(user);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  doSignIn(user) {
    this.props.setUser({
      provider: 'google',
      name: user.name,
      email: user.email,
      data: user,
    });
    this.props.navigation.dispatch({ type: 'Main' });
  }

  render() {
    return (
      <Button onPress={this.signIn.bind(this)}>
        <Icon name="logo-google" size={18} style={{ marginRight: 10 }} />
        <Text>Sign In</Text>
      </Button>
    );
  }
}


AuthButton.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
