import React, {useState} from 'react';
import {View, ImageBackground, Keyboard, ScrollView} from 'react-native';
import {AndroidBackHandler} from 'react-navigation-backhandler';

import Logo from 'components/logo';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import CustomText from 'components/custom-text';
import CircleButton from 'components/circle-button';
import Space from 'components/space';
import Loading from 'components/loading';
import styles from './style';
import themeStyle from 'config/themeStyle';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import * as strings from 'config/strings';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import auth from '@react-native-firebase/auth';

const Authentication = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('+7 999 888-11-55');
  const [loadingState, setLoadingState] = useState(false);

  const onSendButton = () => {
    Keyboard.dismiss();
    signInWithPhoneNumber();
  };

  async function signInWithPhoneNumber() {
    setLoadingState(true);
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(async (result) => {
        const confirmation = result;
        await props.authActions.setConfirmation(confirmation);
        props.navigation.navigate('SmsCode');
      })
      .catch((error) => {})
      .finally(() => setLoadingState(false));
  }

  return (
    <AndroidBackHandler
      onBackPress={() => {
        return true;
      }}>
      <ImageBackground
        style={styles.screen}
        source={images.images.authBackground}>
        <ScrollView style={[themeStyle.screen, styles.container]}>
          <Logo />
          <CustomInput
            label={strings.authenticationScreen.inputTitle}
            keyboardType="phone-pad"
            textColor={colors.white}
            baseColor={colors.gray}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            phoneNumber
          />

          <CustomButton
            label={strings.authenticationScreen.loginButton}
            textColor={colors.white}
            buttonColor={colors.green}
            disabled={false}
            onPress={onSendButton}
          />
          <View style={styles.socialButtonGroup}>
            <CircleButton
              borderColor={colors.white}
              tintColor={colors.white}
              source={images.icons.icon_social_1}
              size={sizes.dimension.socialButton.size}
            />
            <Space width={sizes.dimension.socialButton.distanceBetween} />
            <CircleButton
              borderColor={colors.white}
              tintColor={colors.white}
              source={images.icons.icon_social_2}
              size={sizes.dimension.socialButton.size}
            />
          </View>
        </ScrollView>
        {/* <View style={{position: 'absolute', bottom: 20}}>
        <CustomText
          text={strings.authenticationScreen.text}
          fontSize={sizes.font.small}
          color={colors.white}
          textAlign="center"
        />
      </View> */}

        {loadingState && <Loading />}
      </ImageBackground>
    </AndroidBackHandler>
  );
};

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
