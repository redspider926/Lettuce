import {StyleSheet} from 'react-native';
import * as colors from 'config/colors';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  scrollView: {
    width: '100%',
  },

  markerStyle: {
    width: sizes.dimension.smallCircleButton.size,
    height: sizes.dimension.smallCircleButton.size,
    backgroundColor: colors.pink,
    borderRadius: sizes.dimension.smallCircleButton.size,
  },

  multiSliderView: {
    alignItems: 'center',
    width: '100%',
  },

  multiSliderValueView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
