import {StyleSheet} from 'react-native';
import * as colors from 'config/colors';

export default StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.alphaGray,
  },
});
