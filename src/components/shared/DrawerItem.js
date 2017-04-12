import React, { PropTypes } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DrawerIcon from './DrawerIcon';

import { connect } from 'react-redux';

import {
  unsetUser,
} from '../../actions';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
});

class DrawerItem extends React.Component {

  render() {
    return (
      <TouchableOpacity
        key={100}
        onPress={() => {
          this.props.unsetUser().then(() => {
            this.props.navigation.dispatch({ type: 'Logout' });
          });
        }}
        delayPressIn={0}
      >
        <View style={[styles.item]}>
          <View style={[styles.icon]}>
            <DrawerIcon name="md-log-out" />
          </View>
          <Text style={[styles.label]}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  unsetUser: () => dispatch(unsetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);
