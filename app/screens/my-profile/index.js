import React, {useState, useEffect} from 'react';
import {ImageBackground, View, Button, Text, FlatList} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import CustomText from 'components/custom-text';
import Header from 'components/header';
import Space from 'components/space';
import Avatar from 'components/avatar';
import Loading from 'components/loading';
import MyItem from 'components/my-item';
import CircleButton from 'components/circle-button';
import themeStyle from 'config/themeStyle';
import styles from './style';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

const MyProfile = (props) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const uid = props.auth.user.uid;
  React.useEffect(() => {
    var ref = database().ref('/items');
    var query = ref.orderByChild('ownerId').equalTo(uid);
    setLoadingState(true);
    database()
      .ref('/users/' + uid)
      .once('value')
      .then((result) => {
        const profile = result.val();
        setName(profile.name);
        setAvatar(profile.avatar);
        query.once('value').then((snapshot) => {
          if (snapshot.val() !== undefined && snapshot.val() !== null) {
            setItems(Object.values(snapshot.val()));
            setItemIds(Object.keys(snapshot.val()));
          }
          setLoadingState(false);
        });
      })
      .catch((error) => {
        setLoadingState(false);
      });

    query.on('value', (snapshot) => {
      if (snapshot.val() !== undefined && snapshot.val() !== null) {
        setItems(Object.values(snapshot.val()));
        setItemIds(Object.keys(snapshot.val()));
      }
    });

    database()
      .ref('/users/' + uid)
      .on('value', (result) => {
        const profile = result.val();
        setName(profile.name);
        setAvatar(profile.avatar);
      });

    return function cleanup() {};
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCameraButton = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log('camera response', response);
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          const tempAvatar = response.uri;
          setLoadingState(true);
          setIsModalVisible(false);
          var imageRef = storage().ref('/avatars').child(uuid.v1());
          imageRef
            .putFile(tempAvatar)
            .then(async (snapshot) => {
              let url = await imageRef.getDownloadURL();
              database()
                .ref('/users/' + uid + '/avatar')
                .set(url)
                .then((result) => {
                  setLoadingState(false);
                })
                .catch((error) => {
                  setLoadingState(false);
                });
            })
            .catch();
        }
      },
    );
  };

  const onImageLibraryButton = () => {
    launchImageLibrary(
      {
        title: 'You can choose one image',
        maxWidth: 256,
        maxHeight: 256,
        noData: true,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
        },
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          const tempAvatar = response.uri;
          setLoadingState(true);
          setIsModalVisible(false);
          var imageRef = storage().ref('/avatars').child(uuid.v1());
          imageRef
            .putFile(tempAvatar)
            .then(async (snapshot) => {
              let url = await imageRef.getDownloadURL();
              database()
                .ref('/users/' + uid + '/avatar')
                .set(url)
                .then((result) => {
                  setLoadingState(false);
                })
                .catch((error) => {
                  setLoadingState(false);
                });
            })
            .catch();
        }
      },
    );
  };

  return (
    <View style={[styles.screen]}>
      <Header
        navigation={props.navigation}
        title={strings.myProfileScreen.header}
        logout
        onLogoutButtonPress={async () => {
          await props.authActions.logout();
          props.navigation.navigate('Authentication');
        }}
      />
      <Space height={40} />
      <ImageBackground source={images.images.union} style={styles.unionImage}>
        <Avatar
          source={avatar !== '' ? {uri: avatar} : images.images.avatar}
          size={sizes.dimension.profileAvatar.avatarSize}
          onPress={() => setIsModalVisible(true)}
        />
      </ImageBackground>
      <CustomText
        text={name}
        fontSize={sizes.font.xxl}
        color={colors.green}
        textAlign="center"
      />
      <Space height={20} />
      <FlatList
        style={styles.flatList}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
        data={[...items, {}]}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) =>
          item.index < items.length ? (
            <MyItem
              title={item.item.title}
              source={{uri: item.item.image}}
              onPress={() => {
                props.navigation.navigate('UpdateItem', {
                  itemId: itemIds[item.index],
                  image: item.item.image,
                  title: item.item.title,
                  category: item.item.category,
                  size: item.item.size,
                  description: item.item.description,
                });
              }}
            />
          ) : (
            <MyItem
              onPress={() => {
                props.navigation.navigate('TabNav', {
                  screen: 'CreateItem',
                });
              }}
            />
          )
        }
      />

      <Modal
        useNativeDriverForBackdrop
        // propagateSwipe
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={themeStyle.modalRootContainer}>
          <View style={themeStyle.modalContainer}>
            <CircleButton
              buttonColor={colors.disactiveGray}
              tintColor={colors.gray}
              source={images.icons.camera}
              size={sizes.dimension.imagePickerButton.size}
              elevation={5}
              borderColor={colors.white}
              onPress={() => {
                onCameraButton();
              }}
            />
            <CircleButton
              buttonColor={colors.disactiveGray}
              tintColor={colors.gray}
              source={images.icons.image}
              size={sizes.dimension.imagePickerButton.size}
              elevation={5}
              borderColor={colors.white}
              onPress={() => {
                onImageLibraryButton();
              }}
            />
          </View>
        </View>
      </Modal>
      {loadingState && <Loading />}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
