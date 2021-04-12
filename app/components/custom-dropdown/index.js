import React, {useState} from 'react';
import {TextInput, DefaultTheme, Provider, View} from 'react-native-paper';
import * as colors from 'config/colors';
import * as images from 'config/images';

import DropDown from 'react-native-paper-dropdown';

const CustomDropDown = (props) => {
  const {keyboardType, formatText, textColor, baseColor, label} = props;

  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();

  const genderList = [{label: 'Male', value: 'male'}];

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
      <DropDown
        label={label}
        mode={'flat'}
        backgroundColor={colors.white}
        baseColor={colors.gray}
        // theme={theme}
        value={gender}
        setValue={setGender}
        list={genderList}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}

        // inputProps={{
        //   right: (
        //     <View style={{width: 20, height: 20, backgroundColor: 'red'}}></View>
        //   ),
        // }}
      />
    </Provider>
  );
};

export default CustomDropDown;
