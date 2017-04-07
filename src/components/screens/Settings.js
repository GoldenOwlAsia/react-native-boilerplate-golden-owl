import React, { Component } from 'react';
import { Button, StatusBar } from 'react-native';
import { BaseScreen } from '../base/';
import { Screen, View, Text, NavigationBar, Title, Icon, DropDownMenu, Divider } from '@shoutem/ui';

class Settings extends BaseScreen {
  static navigationOptions = {
    title: 'Settings',
    header: ({ state, setParams }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let left = (
        <Button
          title="Done"
          onPress={() => console.log('button press')}
        />
      );
      let  right = (
        <Button
          title="Done"
          onPress={() => console.log('button press')}
        />        
      );

      return { left, right };
    },
    drawer: () => ({
      label: 'Settings',
      icon: ({ tintColor }) => (
        null
      ),
    }),
  }

  render() {
    return (
      <Screen style={{flex: 1}}>
        <View style={{height: 300}}>
           <Text>Hello World</Text>
           <Button
              onPress={() => this.props.navigation.navigate('Notifications')}
              title="Go to notifications"
            />
        </View>
      </Screen>
    );
  }
}

export default Settings;
