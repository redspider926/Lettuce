import React, {useState} from 'react';
import {ScrollView, View, TouchableOpacity, Dimensions} from 'react-native';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import SettingItem from 'components/setting-item';
import Header from 'components/header';
import Avatar from 'components/avatar';
import Notification from 'components/notification';
import SplitLine from 'components/split-line';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Space from 'components/space';
import themeStyle from 'config/themeStyle';
import styles from './style';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

const Setting = (props) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  return (
    <>
      <View style={[themeStyle.screen]}>
        <Header
          navigation={props.navigation}
          title={strings.settingScreen.header}
        />
        <Space height={30} />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}>
          <CustomText
            text={strings.settingScreen.list1.title}
            color={colors.darkGray}
          />
          <Space height={30} />
          <CustomText
            text={strings.settingScreen.list2.title}
            color={colors.darkGray}
          />
          <SettingItem
            title={strings.settingScreen.list2.item1}
            isSwitch={true}
          />
          <SplitLine />
          <SettingItem
            title={strings.settingScreen.list2.item2}
            isSwitch={true}
          />
          <SplitLine />
          <SettingItem
            title={strings.settingScreen.list2.item3}
            isSwitch={true}
          />
          <SplitLine />
          <SettingItem
            title={strings.settingScreen.list2.item4}
            isSwitch={true}
          />
          <Space height={30} />
          <CustomText
            text={strings.settingScreen.list3.title}
            color={colors.darkGray}
          />
          <View style={styles.multiSliderView}>
            <MultiSlider
              values={[0, 50]}
              isMarkersSeparated={true}
              onValuesChangeStart={disableScroll}
              onValuesChangeFinish={enableScroll}
              sliderLength={sizes.dimension.multiSlider.width}
              markerStyle={styles.markerStyle}
            />
          </View>

          <View style={styles.multiSliderValueView}>
            <CustomText text={'от 0 км'} color={colors.darkGray} />
            <CustomText text={'до 100 км'} color={colors.darkGray} />
          </View>
          <Space height={30} />
          <CustomText
            text={strings.settingScreen.list4.title}
            color={colors.darkGray}
          />
          <SettingItem
            title={strings.settingScreen.list4.item1}
            isSwitch={true}
          />
          <SplitLine />
          <SettingItem
            title={strings.settingScreen.list4.item2}
            isSwitch={false}
            text="elena@gmail.com"
          />
          <SplitLine />
          <SettingItem
            title={strings.settingScreen.list4.item3}
            isSwitch={false}
            text="София"
          />
          <Space height={30} />
          <CustomText
            text={strings.settingScreen.list5.title}
            color={colors.darkGray}
          />
          <SettingItem title={strings.settingScreen.list5.item1} />
          <SplitLine />
          <SettingItem title={strings.settingScreen.list5.item2} />
          <Space height={30} />
          <CustomText
            text={strings.settingScreen.list6.title}
            color={colors.darkGray}
          />
          <SettingItem title={strings.settingScreen.list6.item1} />
          <SplitLine />
          <SettingItem title={strings.settingScreen.list6.item2} />
        </ScrollView>
      </View>
    </>
  );
};

export default Setting;
