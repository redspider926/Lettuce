import React from 'react';
import {View} from 'react-native';
import CustomImage from 'components/custom-image';
import CustomText from 'components/custom-text';
import Space from 'components/space';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import styles from './style';

const Logo = (props) => {
  const {text} = props;
  return (
    <>
      <View style={styles.logoContainer}>
        <Space flex={5} />
        <CustomImage
          width={sizes.dimension.logo.imageWidth}
          height={sizes.dimension.logo.imageHeight}
          source={images.images.logo}
        />
        <Space flex={1} />
        <CustomText text={text} textAlign="center" fontSize={sizes.font.s} />
        <Space flex={1} />
      </View>
    </>
  );
};

export default Logo;
