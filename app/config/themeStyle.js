import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';

const width = sizes.dimension.screenWidth;

export default StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    padding: sizes.dimension.padding,
    backgroundColor: colors.white,
  },

  imageStyle: {
    width: width,
    height: width,
    left: width * 0.3,
    top: (sizes.dimension.screenHeight - width) * 0.5,
    resizeMode: 'center',
    tintColor: '#777777',
  },

  modalContainer: {
    width: '100%',
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  modalRootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
