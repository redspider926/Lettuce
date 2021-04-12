import React from 'react';
import {Text} from 'react-native';

const CustomText = (props) => {
  const {color, fontSize, text, fontWeight, fontFamily, textAlign} = props;

  return (
    <>
      <Text
        style={{
          color: color,
          fontSize: fontSize,
          textAlign: textAlign,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
        }}>
        {text}
      </Text>
    </>
  );
};

export default CustomText;
