import React from 'react';
import {View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import CircleButton from 'components/circle-button';
import CustomText from 'components/custom-text';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import styles from './style';
import {Api} from 'services/api';

const MyItem = (props) => {
  const {source, title, onPress} = props;
  return (
    <>
      <TouchableOpacity style={styles.myItemContainer} onPress={onPress}>
        {source !== undefined ? (
          <Image source={source} style={styles.myItemImage} />
        ) : (
          <View style={styles.myItemDashedView} />
        )}
        {source !== undefined && (
          <ImageBackground
            style={styles.myItemLabel}
            source={images.images.gradient}
            resizeMode="stretch">
            <CustomText
              text={title}
              color={colors.white}
              fontSize={sizes.font.xs}
            />
          </ImageBackground>
        )}

        <View style={styles.myItemButton}>
          <CircleButton
            source={source === undefined ? images.icons.add : images.icons.edit}
            size={sizes.dimension.smallCircleButton.size}
            buttonColor={colors.pink}
            tintColor={colors.white}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MyItem;
