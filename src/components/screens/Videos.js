import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerIcon from '../shared/DrawerIcon';
import {
  ListView,
  Image,
  Title,
  Subtitle,
  Tile,
  Divider,
  Button,
  Text,
  Card,
  Caption,
  GridRow,
} from '@shoutem/ui';

import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class VideosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }
  componentWillMount() {
    console.log('VideosScreen componentWillMount');
    const { state } = this.props.navigation;
    console.log('state', state);
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${state.params.playlistId}&maxResults=50`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.user.data.accessToken}`,
      },
    })
    .then(response => response.json())
    .then((data) => {
      console.log('videos response', data);
      this.setState({ videos: data.items.map(i => Object.assign({}, i.snippet, { id: i.id })) });
    });
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <Image
            styleName="large"
            source={{ uri: rowData[0].thumbnails.default.url }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].title}</Title>
            </Tile>
          </Image>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((video, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: video.thumbnails.default.url }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{_.truncate(video.title, 300)}</Subtitle>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    console.log('playlistId', this.props.navigation.state.params);

    const groupedData = GridRow.groupByRows(this.state.videos, 2);

    return (
      <View style={styles.container}>
        <ListView
          data={groupedData}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

VideosScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  playlistId: PropTypes.string,
};

VideosScreen.navigationOptions = {
  title: 'Videos',
  drawer: () => ({
    label: 'Videos',
    icon: ({ tintColor }) => (
      <DrawerIcon name="md-musical-notes" />
    ),
  }),
};

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen);

