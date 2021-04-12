import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  customButtonContainer: {
    width: '100%',
    height: sizes.dimension.customButton.height,
    borderRadius: sizes.dimension.customButton.borderRadius,
    borderWidth: sizes.dimension.hairLine,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.dimension.padding,
  },
});
