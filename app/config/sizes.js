import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export const font = {
  xxs: 12,
  xs: 14,
  s: 16,
  sm: 17,
  m: 18,
  l: 20,
  xl: 22,
  xxl: 24,
  xxxl: 30,
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const hairLine = StyleSheet.hairlineWidth;
const padding = 20;
const statusBarHeight = getStatusBarHeight();

export const dimension = {
  screenWidth: screenWidth,

  screenHeight: screenHeight,

  hairLine: hairLine,

  padding: padding,

  statusBarHeight: statusBarHeight,

  splashLogo: {
    width: 115,
    height: 150,
  },

  logo: {
    imageWidth: 115 * 0.6,
    imageHeight: 150 * 0.6,
    height: screenHeight * 0.3,
    space: screenHeight * 0.05,
  },

  customButton: {
    height: 40,
    borderRadius: 8,
  },

  socialButton: {
    size: 50,
    distanceBetween: 50,
  },

  smsCodeCell: {
    width: 40,
    height: 40,
    margin: 5,
    lineHeight: 38,
    underlineBorderWidth: hairLine,
  },

  tipItem: {
    imageWidth: 100,
    imageHeight: 100,
    height: 100,
  },

  profileAvatar: {
    unionSize: screenWidth * 0.35,
    avatarSize: screenWidth * 0.175,
  },

  myItem: {
    width: (screenWidth - padding * 4) / 3,
    height: ((screenWidth - padding * 4) / 3) * 1.25,
    buttonSize: 100,
  },

  feedBottomSheet: {
    height: screenHeight * 0.45,
  },

  activityBottomSheet: {
    borderRadius: 20,
  },

  isLikeButton: {
    size: 50,
  },

  profileItem: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.7,
  },

  smallCircleButton: {
    size: 25,
  },

  createItemImage: {
    height: 100,
  },

  activityItem: {
    height: 40,
  },

  settingItem: {
    height: 50,
  },

  multiSlider: {
    width: screenWidth - 2 * padding - 2 * 20,
  },

  switch: {
    height: 31,
    width: 51,
    circleSize: 27,
    circleShadow: 3,
  },

  tab: {
    iconSize: 25,
    height: 60,
  },

  backButton: {
    size: 12,
    marginRight: 12,
  },

  moreButton: {
    size: 30,
  },

  imagePickerButton: {
    size: 50,
  },

  swiperCard: {
    width: screenWidth,
    height: screenHeight - 60 - statusBarHeight,
  },
};
