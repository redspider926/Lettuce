import React, {useState, useRef} from 'react';
import {ImageBackground, View} from 'react-native';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import Carousel from 'react-native-snap-carousel';
import Loading from 'components/loading';
import Header from 'components/header';
import Space from 'components/space';
import Avatar from 'components/avatar';
import CircleButton from 'components/circle-button';
import CustomButton from 'components/custom-button';
import themeStyle from 'config/themeStyle';
import styles from './style';

import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Profile = (props) => {
  const uid = props.auth.user.uid;
  const userId = props.route.params.userId;
  const chatId = props.route.params.chatId;

  const [loadingState, setLoadingState] = React.useState(false);
  const [name, setName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  const snapCarouselRef = useRef();
  React.useEffect(() => {
    var ref = database().ref('/items');
    var query = ref.orderByChild('ownerId').equalTo(userId);
    setLoadingState(true);
    database()
      .ref('/users/' + userId)
      .once('value')
      .then((result) => {
        const profile = result.val();
        setName(profile.name);
        setAvatar(profile.avatar);
        query.once('value').then((snapshot) => {
          if (snapshot.exists()) {
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
      if (snapshot.exists()) {
        setItems(Object.values(snapshot.val()));
        setItemIds(Object.keys(snapshot.val()));
      }
    });

    database()
      .ref('/users/' + userId)
      .on('value', (result) => {
        const profile = result.val();
        setName(profile.name);
        setAvatar(profile.avatar);
      });

    return function cleanup() {};
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <CustomImage
          width={sizes.dimension.profileItem.width}
          height={sizes.dimension.profileItem.height}
          source={{uri: item.image}}
          borderRadius={sizes.dimension.profileItem.borderRadius}
        />
        <View style={styles.itemInfo}>
          <CustomText
            style={styles.title}
            text={item.title}
            color={colors.white}
            fontSize={sizes.font.xxl}
          />
          <CircleButton
            buttonColor={colors.white}
            tintColor={colors.gray}
            source={images.icons.information}
            size={24}
            elevation={5}
          />
        </View>
      </View>
    );
  };

  const acceptChat = () => {
    setLoadingState(true);
    console.log('clicked');
    database()
      .ref('/chats/' + chatId + '/accepted')
      .set(true)
      .then(() => {
        setLoadingState(false);
      })
      .catch(() => setLoadingState(false));
  };

  async function rejectChat() {
    setLoadingState(true);
    await database()
      .ref('/chats/' + chatId + '/accepted')
      .set(false)
      .then()
      .catch();
    await database()
      .ref('/chats/' + chatId + '/invited/' + uid)
      .set(false)
      .then()
      .catch();
    await database()
      .ref('/chats/' + chatId + '/invited/' + userId)
      .set(false)
      .then()
      .catch();
    setLoadingState(false);
  }

  async function voteItem(item, vote) {
    if (vote) {
      let messageId;
      await database()
        .ref('/chats/' + chatId + '/messages')
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() === null) {
            messageId = 0;
          } else {
            messageId = snapshot.val().length;
          }
        })
        .catch(() => {});
      const message = {
        _id: uuid.v1(),
        text: `I like your ${item.title}`,
        createdAt: Date.now(),
        receiver: item.ownerId,
        user: {
          _id: uid,
          name: name,
          avatar: props.auth.user.avatar,
        },
        deleted: false,
      };

      await database()
        .ref('/chats/' + chatId + '/users/' + uid)
        .set(true)
        .then()
        .catch();
      await database()
        .ref('/chats/' + chatId + '/users/' + item.ownerId)
        .set(true)
        .then()
        .catch();
      await database()
        .ref('/chats/' + chatId + '/messages/' + messageId)
        .set(message)
        .then()
        .catch();
      await database()
        .ref('/chats/' + chatId + '/messages/' + messageId + '/read/' + uid)
        .set(true)
        .then()
        .catch();
      await database()
        .ref(
          '/chats/' +
            chatId +
            '/messages/' +
            messageId +
            '/read/' +
            item.ownerId,
        )
        .set(false)
        .then()
        .catch();
      database()
        .ref('/chats/' + chatId + '/invited/' + item.ownerId)
        .set(true)
        .then()
        .catch();
    } else {
    }
  }

  return (
    <>
      <View style={[styles.screen, themeStyle.screen]}>
        <Header
          navigation={props.navigation}
          title={strings.profileScreen.header}
          left={true}
        />
        <Space flex={1} />
        <ImageBackground source={images.images.union} style={styles.unionImage}>
          <Avatar
            source={avatar ? {uri: avatar} : images.images.avatar}
            size={sizes.dimension.profileAvatar.avatarSize}
          />
        </ImageBackground>

        {items.length > 0 ? (
          <>
            <CustomText
              text={name}
              fontSize={sizes.font.xxxl}
              color={colors.green}
              textAlign="center"
            />
            <Space flex={1} />
            <Carousel
              ref={snapCarouselRef}
              data={items}
              renderItem={_renderItem}
              sliderWidth={sizes.dimension.screenWidth}
              itemWidth={styles.item.width}
            />
            <View style={styles.buttonGroup}>
              <CircleButton
                buttonColor={colors.white}
                tintColor={colors.pink}
                source={images.icons.close}
                size={sizes.dimension.isLikeButton.size}
                elevation={5}
                borderColor={colors.white}
                onPress={() => {
                  const currentIndex = snapCarouselRef.current.currentIndex;
                  voteItem(items[currentIndex], false);
                  if (currentIndex < items.length - 1) {
                    snapCarouselRef.current.snapToItem(
                      currentIndex + 1,
                      true,
                      () => {},
                    );
                  }
                }}
              />
              <CircleButton
                buttonColor={colors.white}
                tintColor={colors.green}
                source={images.icons.like}
                size={sizes.dimension.isLikeButton.size}
                elevation={5}
                borderColor={colors.white}
                onPress={() => {
                  const currentIndex = snapCarouselRef.current.currentIndex;
                  voteItem(items[currentIndex], true);
                  if (currentIndex < items.length - 1) {
                    snapCarouselRef.current.snapToItem(
                      currentIndex + 1,
                      true,
                      () => {},
                    );
                  }
                }}
              />
            </View>
          </>
        ) : (
          <>
            <CustomText
              text={name}
              fontSize={sizes.font.xxxl}
              color={colors.green}
              textAlign="center"
            />
            <Space flex={1} />
            <CustomText
              text={strings.profileScreen.noItems}
              fontSize={sizes.font.m}
              color={colors.green}
              textAlign="center"
            />
            <Space flex={1} />
            <CustomButton
              label={strings.profileScreen.button1}
              textColor={colors.white}
              buttonColor={colors.green}
              onPress={() => acceptChat()}
            />
            <CustomButton
              label={strings.profileScreen.button2}
              textColor={colors.green}
              borderColor={colors.green}
              onPress={() => rejectChat()}
            />
          </>
        )}

        {loadingState && <Loading />}
      </View>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
