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
} from '@shoutem/ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class PlaylistScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }
  componentWillMount() {
    console.log('Playlists comopnentWillMount');
    fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCY14-R0pMrQzLne7lbTqRvA&maxResults=50', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.user.data.accessToken}`,
      },
    })
    .then(response => response.json())
    .then((data) => {
      console.log('profile response', data);
      this.setState({ playlists: data.items.map(i => Object.assign({}, i.snippet, { id: i.id })) });
    });
  }

  handlePlaylistPress(playlist) {
    console.log('handlePlaylistPress', playlist);
    this.props.navigation.dispatch({ type: 'Videos', payload: { playlistId: playlist.id } });
  }

  renderRow(playlist) {
    return (
      <TouchableOpacity onPress={this.handlePlaylistPress.bind(this, playlist)}>
        <Image
          styleName="large-banner"
          source={{ uri: playlist.thumbnails.default.url }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{playlist.title}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{playlist.description}</Subtitle>
          </Tile>
        </Image>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          data={this.state.playlists}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

PlaylistScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

PlaylistScreen.navigationOptions = {
  title: 'Playlists',
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
    label: 'Playlists',
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen);

