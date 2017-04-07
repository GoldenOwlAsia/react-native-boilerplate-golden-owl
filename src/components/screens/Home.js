import React, { Component } from 'react';
import { Button, StatusBar } from 'react-native';
import { BaseScreen } from '../base/';
import { Screen, View, Text, NavigationBar, Title, Icon, DropDownMenu, Divider } from '@shoutem/ui';

class Home extends BaseScreen {
  static navigationOptions = {
    title: 'Home',
    header: ({ state, setParams }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let left = (
        <Icon
          name="sidebar" 
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
      label: 'Home',
      icon: ({ tintColor }) => (
        null
      ),
    }),
  }

  render() {
    return (
      <Screen style={{flex: 1}}>
        <Text>Hello World</Text>
      </Screen>
    );
  }
}

export default Home;
