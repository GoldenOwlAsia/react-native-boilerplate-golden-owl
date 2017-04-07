import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Row } from '@shoutem/ui';
import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <View>
        <Row onPress={() => this.navigateTo('home')} >
          <Text>Home</Text>
        </Row>
        <Row onPress={() => this.navigateTo('blankPage')} >
          <Text>Blank Page</Text>
        </Row>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
