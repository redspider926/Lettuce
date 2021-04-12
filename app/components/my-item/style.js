import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';

export default StyleSheet.create({
  myItemContainer: {
    width: sizes.dimension.myItem.width,
    height: sizes.dimension.myItem.height,
    elevation: 10,
    marginTop: sizes.dimension.padding * 0.5,
    marginBottom: sizes.dimension.padding * 0.5,
    marginLeft: sizes.dimension.padding,
  },

  myItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

  myItemButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    // overflow: 'visible',
  },

  myItemLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 46,
    justifyContent: 'flex-end',
    paddingLeft: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },

  myItemDashedView: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: colors.darkGray,
  },
});
