import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import Logo from 'components/logo';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import Header from 'components/header';
import Space from 'components/space';
import Loading from 'components/loading';
import themeStyle from 'config/themeStyle';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const RegisterEmail = (props) => {
  const {phoneNumber, uid} = auth().currentUser;
  const name = props.route.params.name;
  const [email, setEmail] = useState('');

  const [loadingState, setLoadingState] = useState(false);

  async function onRegisterButton() {
    setLoadingState(true);
    database()
      .ref('users/' + uid)
      .set({
        phoneNumber: phoneNumber,
        name: name,
        email: email,
      })
      .then((result) => {
        console.log('_register', result);
        props.authActions.register({
          phoneNumber: phoneNumber,
          name: name,
          email: email,
          uid: uid,
        });
        props.navigation.navigate('TabNav');
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingState(false);
      });
  }

  return (
    <ImageBackground
      imageStyle={themeStyle.imageStyle}
      style={themeStyle.screen}
      source={images.images.union}>
      <Header left={true} navigation={props.navigation} />
      <Logo text={strings.registerEmailScreen.text} />
      <CustomInput
        label={strings.registerEmailScreen.inputTitle}
        textColor={colors.gray}
        baseColor={colors.gray}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Space flex={1} />
      <CustomButton
        label={strings.registerEmailScreen.skipButton}
        textColor={colors.green}
        borderColor={colors.green}
      />
      <CustomButton
        label={strings.registerEmailScreen.nextButton}
        textColor={colors.white}
        buttonColor={colors.green}
        onPress={onRegisterButton}
      />
      {loadingState && <Loading />}
    </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmail);
