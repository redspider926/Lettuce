import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import {BackHandler} from 'react-native';

import {AndroidBackHandler} from 'react-navigation-backhandler';

//import screens

import ComponentsTest from 'screens/components-test';
import Splash from 'screens/splash';
import Authentication from 'screens/authentication';
import SmsCode from 'screens/sms-code';
import RegisterName from 'screens/register-name';
import RegisterEmail from 'screens/register-email';
import MyProfile from 'screens/my-profile';
import MyItems from 'screens/my-items';
import Activity from 'screens/activity';
import Setting from 'screens/setting';
import Profile from 'screens/profile';
import Tip from 'screens/tip';
import CreateItem from 'screens/create-item';
import UpdateItem from 'screens/update-item';
import Feed from 'screens/feed';
import Chat from 'screens/chat';

import CustomImage from 'components/custom-image';

import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import * as strings from 'config/strings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="ComponentsTest"
            component={ComponentsTest}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="SmsCode"
            component={SmsCode}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="RegisterName"
            component={RegisterName}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="RegisterEmail"
            component={RegisterEmail}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyItems"
            component={MyItems}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Tip"
            component={Tip}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="UpdateItem"
            component={UpdateItem}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage position="top" />
    </>
  );
}

function TabNav() {
  return (
    <AndroidBackHandler
      onBackPress={() => {
        BackHandler.exitApp();
        return true;
      }}>
      <Tab.Navigator
        initialRouteName={'Search'}
        backBehavior={'none'}
        tabBarOptions={{
          style: {
            backgroundColor: colors.white,
            height: sizes.dimension.tab.height,
            paddingBottom: 5,
            paddingTop: 5,
          },
          labelStyle: {
            fontWeight: 'normal',
            fontSize: sizes.font.xxs,
          },
          activeTintColor: colors.green,
          inactiveTintColor: colors.gray,
        }}>
        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            title: strings.tabName.profile,
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <CustomImage
                tintColor={focused ? colors.green : colors.gray}
                source={images.icons.profile}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            title: strings.tabName.tape,
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <CustomImage
                tintColor={focused ? colors.green : colors.gray}
                source={images.icons.tape}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreateItem"
          component={CreateItem}
          options={{
            title: strings.tabName.create,
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <CustomImage
                tintColor={focused ? colors.green : colors.pink}
                source={images.icons.create}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={Activity}
          options={{
            title: strings.tabName.activity,
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <CustomImage
                tintColor={focused ? colors.green : colors.gray}
                source={images.icons.chat}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            title: strings.tabName.setting,
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <CustomImage
                tintColor={focused ? colors.green : colors.gray}
                source={images.icons.setting}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </AndroidBackHandler>
  );
}

export default Navigation;
