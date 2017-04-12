import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerIcon from '../shared/DrawerIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Profile Screen
    </Text>
  </View>
);

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
  header: (navigation) => {
    const left = (
      <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}
      >
        <Icon
          name="md-menu"
          style={{ marginLeft: 10 }}
          size={30}
        />
      </TouchableOpacity>
      );

    return { left };
  },
  drawer: () => ({
    label: 'Profile',
    icon: ({ tintColor }) => (
      <DrawerIcon name="md-person" />
    ),
  }),
};

export default ProfileScreen;
