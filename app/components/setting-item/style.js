import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  settingItemContainer: {
    width: '100%',
    height: sizes.dimension.settingItem.height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
