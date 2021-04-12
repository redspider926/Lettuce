import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';

export default StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    paddingTop: sizes.dimension.padding,
  },

  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.pink,
  },

  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.darkGray,
  },

  item: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft: sizes.dimension.padding,
    paddingRight: sizes.dimension.padding,
  },

  imageStyle: {
    width: sizes.dimension.screenWidth * 0.8,
    height: sizes.dimension.screenWidth * 0.8,
    left: sizes.dimension.screenWidth * 0.1,
    top: sizes.dimension.screenWidth * 0.1,
    resizeMode: 'center',
    tintColor: '#555555',
  },

  buttonView: {
    width: '100%',
    paddingLeft: sizes.dimension.padding,
    paddingRight: sizes.dimension.padding,
  },

  containerStyle: {
    backgroundColor: 'transparent',
    height: 20,
  },

  dotContainerStyle: {
    width: 0,
    height: 0,
  },
});
