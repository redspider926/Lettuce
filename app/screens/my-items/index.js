import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomText from 'components/custom-text';
import SettingItem from 'components/setting-item';
import Header from 'components/header';
import MyItem from 'components/my-item';
import Space from 'components/space';
import Avatar from 'components/avatar';
import themeStyle from 'config/themeStyle';
import styles from './style';
import * as strings from 'config/strings';
import * as sizes from 'config/sizes';
import * as images from 'config/images';

const MyItems = (props) => {
  const data = [
    {id: '1', itemSource: images.images.authBackground, label: '23'},
    {id: '5', label: '23'},
    {id: '6', label: '23'},
  ];

  return (
    <>
      <View style={themeStyle.screen}>
        <Header
          left={true}
          title={strings.myItemsScreen.header}
          navigation={props.navigation}
        />
        <Space height={20} />
        <FlatList
          style={styles.flatList}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={data}
          numColumns={3}
          keyExtractor={(item, index) => item.id}
          renderItem={(item) => (
            <>
              {item.index < data.length - 1 ? (
                <MyItem
                  label={item.item.label}
                  itemSource={item.item.itemSource}
                  buttonSource={item.item.buttonSource}
                  onPress={() => {
                    props.navigation.navigate('TabNav', {
                      screen: 'CreateItem',
                    });
                  }}
                />
              ) : (
                <View style={{width: sizes.dimension.myItem.width}} />
              )}
            </>
          )}
        />
      </View>
    </>
  );
};

export default MyItems;
