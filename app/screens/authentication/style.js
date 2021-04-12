import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000066',
  },
  socialButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizes.dimension.padding,
  },
});
