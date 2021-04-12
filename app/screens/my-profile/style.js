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
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingTop: sizes.dimension.padding,
  },

  profileButton: {
    width: '100%',
    paddingRight: sizes.dimension.padding,
    paddingLeft: sizes.dimension.padding,
  },

  flatList: {
    width: '100%',
    flex: 1,
  },
});
