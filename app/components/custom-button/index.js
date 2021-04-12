import React from 'react';
import {TouchableOpacity} from 'react-native';
import CustomText from 'components/custom-text';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import styles from './style';

const CustomButton = (props) => {
  var {textColor, buttonColor, borderColor, label, disabled, onPress} = props;
  if (borderColor === undefined) {
    borderColor = '#00000000';
  }
  if (buttonColor === undefined) {
    buttonColor = '#00000000';
  }

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.customButtonContainer,
          {
            backgroundColor: disabled ? colors.darkGray : buttonColor,
            borderColor: borderColor,
          },
        ]}>
        <CustomText color={textColor} text={label} fontSize={sizes.font.xs} />
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;
