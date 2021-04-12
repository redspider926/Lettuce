import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import themeStyle from 'config/themeStyle';
import Logo from 'components/logo';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import CircleButton from 'components/circle-button';
import MyItem from 'components/my-item';
import Notification from 'components/notification';
import SettingItem from 'components/setting-item';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import {Dropdown} from 'react-native-material-dropdown';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import * as strings from 'config/strings';

const ComponentsTest = (props) => {
  const formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);
  return (
    <>
      <View style={themeStyle.screen}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <Logo />
          <CustomButton
            label={strings.loginButtonTitle}
            textColor={colors.white}
            buttonColor={colors.green}
            disabled={false}
          />
          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.pink}
            borderColor={colors.pink}
          />

          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.white}
            buttonColor={colors.pink}
          />

          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.pink}
            borderColor={colors.pink}
          />
          <CustomButton
            label={strings.loginButtonTitle}
            textColor={colors.disactiveGray}
            buttonColor={colors.backgroundColor}
            disabled={true}
          />
          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.green}
            borderColor={colors.green}
          />
          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.gray}
            borderColor={colors.gray}
          />
          <CustomInput
            label={strings.phoneNumberInputTitle}
            keyboardType="phone-pad"
            formatText={formatText}
          />
          <CustomInput
            label={strings.emailInputTitle}
            keyboardType="phone-pad"
            formatText={formatText}
          />
          <CustomInput
            label={strings.nameInputTitle}
            keyboardType="phone-pad"
            formatText={formatText}
          />
          <CustomText
            text={strings.testText}
            fontSize={sizes.font.small}
            color={colors.gray}
          />
          <CustomText
            text={strings.testText}
            fontSize={sizes.font.middle}
            color={colors.pink}
          />
          <CustomText
            text={strings.testText}
            fontSize={sizes.font.big}
            color={colors.gray}
          />
          <CustomText
            text={strings.testText}
            fontSize={sizes.font.large}
            color={colors.green}
          />
          <CustomText
            text={strings.registerButtonTitle}
            fontSize={sizes.font.large}
            color={colors.green}
            textAlign="center"
          />
          <CustomText
            text={strings.testText}
            fontSize={sizes.font.middle}
            color={colors.gray}
            textAlign="center"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: 23,
            }}>
            <CircleButton
              buttonColor={colors.pink}
              tintColor={colors.white}
              source={images.icons.add}
              size={30}
            />
            <CircleButton
              buttonColor={colors.pink}
              tintColor={colors.white}
              source={images.icons.edit}
              size={40}
            />
            <CircleButton
              buttonColor={colors.white}
              tintColor={colors.pink}
              source={images.icons.close}
              size={60}
              elevation={5}
            />
            <CircleButton
              buttonColor={colors.white}
              tintColor={colors.green}
              source={images.icons.like}
              size={60}
              elevation={5}
            />
            <CircleButton
              buttonColor={colors.white}
              tintColor={colors.gray}
              source={images.icons.dropdown}
              size={40}
              elevation={5}
            />
            <CircleButton
              buttonColor={colors.white}
              tintColor={colors.gray}
              source={images.icons.information}
              size={24}
              elevation={5}
            />
          </View>
          <CustomButton
            label={strings.registerButtonTitle}
            textColor={colors.white}
            buttonColor={colors.pink}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 23,
            }}>
            <MyItem
              label="Сумка жен..."
              itemSource={images.images.test}
              buttonSource={images.icons.edit}
            />
            <MyItem
              label="Сумка жен..."
              itemSource={images.images.test}
              buttonSource={images.icons.edit}
            />
            <MyItem label="Сумка жен..." buttonSource={images.icons.add} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: 23,
            }}>
            <Notification number={3} />
            <Notification number={11} />
            <Notification number={45} />
            <Notification number={3} />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
          </View>
          <SettingItem title="Конфиденциальность" isSwitch={false} />
          <SettingItem title="Помощь и поддержка" isSwitch={false} />
          <SettingItem
            title="Аксессуары"
            isSwitch={true}
            switchInitialState={true}
          />
          <SettingItem
            title="Сумки"
            isSwitch={true}
            switchInitialState={false}
          />
          <SettingItem
            title="Помощь и поддержка"
            isSwitch={true}
            switchInitialState={true}
          />
          <SettingItem
            title="Сумки"
            isSwitch={true}
            switchInitialState={true}
          />
          <MultiSlider
            values={[0, 50]}
            isMarkersSeparated={true}
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            customLabel={() => {
              return (
                <>
                  <CustomText text="ok" fontSize={20} />
                </>
              );
            }}
            sliderLength={400}
            style={{backgroundColor: colors.pink, height: 20}}
            markerStyle={{
              width: 30,
              height: 30,
              backgroundColor: colors.pink,
              borderRadius: 50,
            }}
            // customMarkerLeft={(e) => {
            //   return <View currentValue={e.currentValue} />;
            // }}
            // customMarkerRight={(e) => {
            //   return <View currentValue={e.currentValue} />;
            // }}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default ComponentsTest;
