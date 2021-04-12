import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, Keyboard} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Logo from 'components/logo';
import CustomButton from 'components/custom-button';
import Header from 'components/header';
import Loading from 'components/loading';
import themeStyle from 'config/themeStyle';
import styles from './style';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const SmsCode = (props) => {
  const confirmation = props.auth.confirmation;
  const [loadingState, setLoadingState] = useState(false);
  const [code, setCode] = useState('');

  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  const CELL_COUNT = 6;

  useEffect(() => {
    if (code.length === 6) {
      Keyboard.dismiss();
      confirmCode();
    }
  }, [code]);

  async function confirmCode() {
    setLoadingState(true);
    let isInvalid = false;
    try {
      await confirmation.confirm(code);
      isInvalid = true;
    } catch (error) {
      isInvalid = false;
      console.log('Invalid code.');
    }
    if (isInvalid) {
      checkUserDataOnFirebase();
    } else {
      setLoadingState(false);
    }
  }

  const checkUserDataOnFirebase = () => {
    database()
      .ref('/users/' + auth().currentUser.uid)
      .once('value')
      .then(async (result) => {
        console.log('_checkUserDataOnFirebase', result.val());
        if (result.val() === null) {
          props.navigation.navigate('RegisterName');
        } else {
          await props.authActions.register({
            ...result.val(),
            uid: auth().currentUser.uid,
          });
          props.navigation.navigate('TabNav');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoadingState(false));
  };

  const onAgainButton = () => {};

  return (
    <ImageBackground
      imageStyle={themeStyle.imageStyle}
      style={themeStyle.screen}
      source={images.images.union}>
      <Header left={true} navigation={props.navigation} />
      <Logo text={strings.smsCodeScreen.text} />
      <CodeField
        ref={ref}
        {..._props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View key={index} onLayout={getCellOnLayoutHandler(index)}>
            <Text style={[styles.cell, isFocused && styles.focusCell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <CustomButton
        label={strings.smsCodeScreen.button}
        textColor={colors.black}
        borderColor={colors.gray}
        onPress={onAgainButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(SmsCode);
