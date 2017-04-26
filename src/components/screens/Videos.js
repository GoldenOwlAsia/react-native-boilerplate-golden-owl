import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { connect } from 'react-redux';
import DrawerIcon from '../shared/DrawerIcon';
import * as YoutubeAction from '../../actions/youtube';


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
    const { state } = this.props.navigation;
    const paramsReq = {
      part: 'snippet',
      playlistId: state.params.playlistId,
      maxResults: 50,
    };
    this.props.fetchPlaylistsItemDetail(paramsReq, this.props.user.data.accessToken).then(() => {
      if (this.props.youtube.error) {
        alert(this.props.youtube.error);
      } else {
        this.setState({
          videos: this.props.youtube.playlistsItemDetail.items.map(i => Object.assign({}, i.snippet, { id: i.id })),
        });
      }
    }).catch((error) => {
       alert('error', error);
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
  fetchPlaylistsItemDetail: PropTypes.func,
  youtube: PropTypes.object,
  user: PropTypes.object,
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


const mapStateToProps = state => ({
  user: state.user,
  youtube: state.youtube,
});

const mapDispatchToProps = {
  fetchPlaylistsItemDetail: YoutubeAction.fetchPlaylistsItemDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen);

