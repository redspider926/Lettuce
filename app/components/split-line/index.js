import React from 'react';
import {View} from 'react-native';
import * as colors from 'config/colors';
import * as sizes from 'config/sizes';

const SplitLine = (props) => {
  const width = '100%';
  return (
    <View
      style={{
        width: width,
        height: sizes.dimension.hairLine,
        backgroundColor: colors.darkGray,
      }}
    />
  );
};

export default SplitLine;
