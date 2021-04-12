import React from 'react';
import {Image} from 'react-native';

const CustomImage = (props) => {
  const {width, height, flex, tintColor, source, borderRadius} = props;
  return (
    <>
      <Image
        style={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          flex: flex,
          resizeMode: 'stretch',
        }}
        tintColor={tintColor}
        source={source}
      />
    </>
  );
};

export default CustomImage;
