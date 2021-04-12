import React from 'react';
import {TouchableOpacity} from 'react-native';
import CustomImage from 'components/custom-image';
import styles from './style';

const CircleButton = (props) => {
  const {
    size,
    buttonColor,
    tintColor,
    borderColor,
    source,
    elevation,
    onPress,
  } = props;
  const borderWidth = borderColor === undefined ? 0 : 1;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.circleButtonContainer,
          {
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: buttonColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            elevation: elevation,
          },
        ]}>
        <CustomImage
          source={source}
          tintColor={tintColor}
          width={size * 0.5}
          height={size * 0.5}
        />
      </TouchableOpacity>
    </>
  );
};

export default CircleButton;
