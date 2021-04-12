import React from 'react';
import {View} from 'react-native';
import CustomImage from 'components/custom-image';
import styles from './style';
import * as images from 'config/images';
import * as sizes from 'config/sizes';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Splash = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      if (props.auth.isAuth === true) {
        props.navigation.navigate('TabNav');
      } else {
        if (props.auth.getStarted === false) {
          props.navigation.navigate('Tip');
        } else {
          props.navigation.navigate('Authentication');
        }
      }
    }, 1000);
  }, []);
  return (
    <>
      <View style={styles.screen}>
        <CustomImage
          width={sizes.dimension.splashLogo.width}
          height={sizes.dimension.splashLogo.height}
          source={images.images.logo}
        />
      </View>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
