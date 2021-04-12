import React, {useState} from 'react';
import {TextInput, DefaultTheme, Provider} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import * as colors from 'config/colors';
import * as sizes from 'config/sizes';

const CustomInput = (props) => {
  const {
    phoneNumber,
    value,
    textColor,
    baseColor,
    label,
    onChangeText = () => {},
  } = props;
  const backgroundColor = 'transparent';
  const theme = {
    ...DefaultTheme,
    colors: {
      text: textColor,
      primary: colors.green,
      placeholder: baseColor,
    },
  };

  return (
    <Provider>
      {phoneNumber ? (
        <TextInput
          value={value}
          label={label}
          style={{
            color: colors.green,
            backgroundColor: backgroundColor,
            fontSize: sizes.font.s,
          }}
          dense={true}
          underlineColor={baseColor}
          theme={theme}
          onChangeText={onChangeText}
          render={(_props) => (
            <TextInputMask
              {..._props}
              type="cel-phone"
              options={{
                withDDD: true,
                dddMask: '+9 (999) 999 99 99',
              }}
            />
          )}
        />
      ) : (
        <TextInput
          value={value}
          label={label}
          style={{
            color: colors.green,
            backgroundColor: backgroundColor,
            fontSize: sizes.font.s,
          }}
          dense={true}
          underlineColor={baseColor}
          theme={theme}
          onChangeText={onChangeText}
        />
      )}
    </Provider>
  );
};

export default CustomInput;
