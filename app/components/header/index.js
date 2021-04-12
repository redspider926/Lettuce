import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import Space from 'components/space';
import styles from './style';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import * as strings from 'config/strings';

const Header = (props) => {
  const {title, left, logout, onLogoutButtonPress} = props;
  return (
    <View style={styles.headerContainer}>
      {left && (
        <TouchableOpacity
          style={styles.left}
          onPress={() => props.navigation.goBack()}>
          <CustomImage
            source={images.icons.back}
            tintColor={colors.gray}
            width={sizes.dimension.backButton.size}
            height={sizes.dimension.backButton.size}
          />
          <Space width={sizes.dimension.backButton.marginRight} />
          <CustomText text={strings.others.back} fontSize={sizes.font.sm} />
        </TouchableOpacity>
      )}
      {logout && (
        <TouchableOpacity style={styles.right} onPress={onLogoutButtonPress}>
          <CustomText text={strings.others.logout} fontSize={sizes.font.sm} />
          <Space width={sizes.dimension.backButton.marginRight} />
        </TouchableOpacity>
      )}
      {title && <CustomText text={title} fontSize={sizes.font.sm} />}
    </View>
  );
};

export default Header;
