import React, { PropTypes } from 'react';

import Video from 'react-native-video';


const VIDEO = require('../../../images/welcome.mp4');

const BackgroundVideo = ({ style }) => (
  <Video
    repeat
    resizeMode="cover"
    source={VIDEO}
    style={style}
  />
);

BackgroundVideo.propTypes = {
  style: PropTypes.any,
};

export default BackgroundVideo;

