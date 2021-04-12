import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import Logo from 'components/logo';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import Header from 'components/header';
import Space from 'components/space';
import themeStyle from 'config/themeStyle';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

const RegisterName = (props) => {
  const [name, setName] = useState('');
  const onButton = () => {
    props.navigation.navigate('RegisterEmail', {name: name});
  };

  return (
    <ImageBackground
      imageStyle={themeStyle.imageStyle}
      style={themeStyle.screen}
      source={images.images.union}>
      <Header left={true} navigation={props.navigation} />
      <Logo text={strings.registerNameScreen.text} />

      <CustomInput
        label={strings.registerNameScreen.inputTitle}
        textColor={colors.gray}
        baseColor={colors.gray}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Space flex={1} />
      <CustomButton
        label={strings.registerNameScreen.button}
        textColor={colors.white}
        buttonColor={colors.green}
        onPress={onButton}
        disabled={!name}
      />
    </ImageBackground>
  );
};

export default RegisterName;
