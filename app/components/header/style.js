import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  left: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    alignItems: 'center',
  },

  right: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },

  title: {},
});
