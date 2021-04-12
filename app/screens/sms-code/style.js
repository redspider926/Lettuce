import {StyleSheet} from 'react-native';
import * as colors from 'config/colors';
import * as sizes from 'config/sizes';

export default StyleSheet.create({
  root: {flex: 1, padding: 20},
  codeFieldRoot: {justifyContent: 'center'},
  cell: {
    width: sizes.dimension.smsCodeCell.width,
    height: sizes.dimension.smsCodeCell.height,
    margin: sizes.dimension.smsCodeCell.margin,
    lineHeight: sizes.dimension.smsCodeCell.lineHeight,
    borderBottomWidth: sizes.dimension.smsCodeCell.underlineBorderWidth,
    fontSize: sizes.font.xxl,
    textAlign: 'center',
    borderBottomColor: colors.gray,
  },
  focusCell: {
    borderBottomColor: colors.pink,
  },
});
