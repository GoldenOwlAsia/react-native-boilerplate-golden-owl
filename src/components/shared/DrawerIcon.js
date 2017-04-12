import React, { PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const DrawerIcon = ({ name, ...others }) => (
  <Icon name={name} size={24} {...others} />
);

DrawerIcon.propTypes = {
  name: PropTypes.string,
};

export default DrawerIcon;
