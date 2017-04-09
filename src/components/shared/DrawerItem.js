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

const DrawerItem = ({navigation}) => (
  <TouchableOpacity
    key={100}
    onPress={() => {
      navigation.dispatch({type: 'Logout'});
    }}
    delayPressIn={0}
  >
    <View style={[styles.item]}>
      <View style={[styles.icon]}>
        <DrawerIcon name='md-log-out'/>
      </View>
      <Text style={[styles.label]}>
        Logout
      </Text>
    </View>
  </TouchableOpacity>
);

export default DrawerItem;
