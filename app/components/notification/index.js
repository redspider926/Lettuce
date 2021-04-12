import React from 'react';
import {View} from 'react-native';
import CustomText from 'components/custom-text';
import styles from './style';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';

const Notification = (props) => {
  const {number} = props;
  var size = sizes.dimension.smallCircleButton.size;

  return (
    <>
      <View
        style={[
          styles.notificationContainer,
          {width: size, height: size, borderRadius: size},
        ]}>
        {number !== undefined && (
          <CustomText
            text={number}
            fontSize={sizes.font.small}
            color={colors.white}
          />
        )}
      </View>
    </>
  );
};

export default Notification;
