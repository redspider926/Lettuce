import React from 'react';
import {TouchableOpacity} from 'react-native';
import CustomImage from 'components/custom-image';
import CustomText from 'components/custom-text';
import Space from 'components/space';
import styles from './style';
import * as strings from 'config/strings';
import * as images from 'config/images';
import * as colors from 'config/colors';
import * as sizes from 'config/sizes';

const BottomSheetItem = (props) => {
  const {index, onPress} = props;
  const data = [
    {
      id: '1',
      title: strings.activityScreen.bottomSheet.item1,
      source: images.icons.chat,
      iconColor: colors.green,
    },
    {
      id: '2',
      title: strings.activityScreen.bottomSheet.item2,
      source: images.icons.profile,
      iconColor: colors.green,
    },
    {
      id: '3',
      title: strings.activityScreen.bottomSheet.item3,
      source: images.icons.close,
      iconColor: colors.pink,
    },
  ];
  return (
    <>
      <TouchableOpacity
        style={styles.bottomSheetItemContainer}
        onPress={onPress}>
        <CustomImage
          width={20}
          height={20}
          source={data[index].source}
          tintColor={data[index].iconColor}
        />
        <Space width={20} />
        <CustomText text={data[index].title} fontSize={sizes.font.middle} />
      </TouchableOpacity>
    </>
  );
};

export default BottomSheetItem;
