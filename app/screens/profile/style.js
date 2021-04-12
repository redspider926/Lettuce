import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  unionImage: {
    width: sizes.dimension.profileAvatar.unionSize,
    height: sizes.dimension.profileAvatar.unionSize,
    alignItems: 'center',
    justifyContent: 'center',
  },

  screen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    paddingTop: sizes.dimension.screenPadding,
  },

  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  item: {
    width: sizes.dimension.profileItem.width,
    height: sizes.dimension.profileItem.height,
  },

  itemInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
