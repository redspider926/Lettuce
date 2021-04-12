import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './style';
import * as colors from 'config/colors';

const Loading = (props) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.pink} />
    </View>
  );
};

export default Loading;
