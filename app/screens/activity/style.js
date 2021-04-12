import {StyleSheet} from 'react-native';
import * as sizes from 'config/sizes';
import * as colors from 'config/colors';

export default StyleSheet.create({
  flatList: {
    width: '100%',
    // backgroundColor: 'red',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  itemLeft: {
    display: 'flex',
    flexDirection: 'row',
  },

  itemCenter: {
    justifyContent: 'space-between',
  },

  noActivityView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
