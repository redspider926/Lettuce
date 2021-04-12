import React from 'react';
import {View} from 'react-native';

const Space = (props) => {
  const {width, height, flex} = props;
  return <View style={{width: width, height: height, flex: flex}} />;
};

export default Space;
