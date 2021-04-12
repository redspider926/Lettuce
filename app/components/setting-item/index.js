import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import Switch from 'react-native-switch-pro';
import styles from './style';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';

const SettingItem = (props) => {
  const {title, isSwitch, switchInitialState, onPress, text} = props;
  return (
    <>
      {isSwitch ? (
        <View style={styles.settingItemContainer}>
          <CustomText
            text={title}
            fontSize={sizes.font.s}
            color={colors.black}
          />

          <Switch
            width={sizes.dimension.switch.width}
            height={sizes.dimension.switch.height}
            backgroundActive={colors.pink}
            backgroundInactive={colors.disactiveColor}
            circleStyle={{
              width: sizes.dimension.switch.circleSize,
              height: sizes.dimension.switch.circleSize,
              elevation: sizes.dimension.switch.circleShadow,
            }}
            value={switchInitialState}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.settingItemContainer} onPress={onPress}>
          <CustomText
            text={title}
            fontSize={sizes.font.s}
            color={colors.black}
          />
          {text ? (
            <CustomText
              text={text}
              fontSize={sizes.font.big}
              color={colors.pink}
            />
          ) : (
            <CustomImage
              width={sizes.dimension.backButton.size}
              height={sizes.dimension.backButton.size}
              source={images.icons.next}
              tintColor={colors.gray}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default SettingItem;
