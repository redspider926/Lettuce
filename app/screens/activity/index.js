import React, {useState, useRef} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import SettingItem from 'components/setting-item';
import Header from 'components/header';
import Avatar from 'components/avatar';
import Notification from 'components/notification';
import SplitLine from 'components/split-line';
import Space from 'components/space';
import Loading from 'components/loading';
import BottomSheetItem from 'components/bottom-sheet-item';
import themeStyle from 'config/themeStyle';
import styles from './style';

import database from '@react-native-firebase/database';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

const Activity = (props) => {
  const uid = props.auth.user.uid;
  const [chats, setChats] = React.useState([]);
  const [selectedInviteChatIndex, setSelectedInviteChatIndex] = React.useState(
    0,
  );
  const [selectedFriendId, setSelectedFriendId] = React.useState(0);
  const [chatIds, setChatIds] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState(false);

  React.useEffect(() => {
    var ref = database().ref('/chats');
    var query = ref.orderByChild('users/' + uid).equalTo(true);
    setLoadingState(true);
    query.once('value').then((snapshot) => {
      console.log('chats', snapshot.val());
      if (snapshot.val() !== null && snapshot.val() !== undefined) {
        setChats(Object.values(snapshot.val()));
        setChatIds(Object.keys(snapshot.val()));
      }
      setLoadingState(false);
    });
    query.on('value', (snapshot) => {
      if (snapshot.val() !== null && snapshot.val() !== undefined) {
        console.log(snapshot.val());
        setChats(Object.values(snapshot.val()));
        setChatIds(Object.keys(snapshot.val()));
      } else {
        setChats([]);
        setChatIds([]);
      }
    });
  }, []);

  async function getFriendAvatarURL(chat) {
    const users = Object.keys(chat.users);
    let url = '';
    await database()
      .ref(
        '/users/' +
          users.find((user) => {
            user !== uid;
          }) +
          '/avatar',
      )
      .once('value')
      .then((result) => {
        url = result.val();
      })
      .catch((error) => {});
    return url;
  }

  async function getChatName(chat) {
    const users = Object.keys(chat.users);
    let name = '';
    await database()
      .ref(
        '/users/' +
          users.find((user) => {
            user !== uid;
          }) +
          '/name',
      )
      .once('value')
      .then((result) => {
        name = result.val();
      })
      .catch((error) => {});
    return name;
  }

  const getFinalMessage = (chat) => {
    var messages = Object.values(
      chat.messages !== undefined ? chat.messages : [],
    );
    if (messages === undefined) {
      return 'chat is empty';
    }
    messages = messages.filter((message) => !message.deleted);
    if (messages.length === 0) {
      return 'chat is empty';
    } else {
      let tempText = messages[messages.length - 1].text;
      if (tempText.length === 0) {
        tempText = 'image';
      } else {
        if (tempText.length > 20) {
          tempText = tempText.slice(0, 19) + '...';
        }
      }
      return tempText;
    }
  };

  const getUnreadMessageCount = (chat) => {
    var messages = Object.values(
      chat.messages !== undefined ? chat.messages : [],
    );
    if (messages === undefined) {
      return 0;
    }
    messages = messages.filter((message) => !message.deleted);
    if (messages.length === 0) {
      return 0;
    } else {
      let unreadMessageCount = 0;
      messages.map((message) => {
        // console.log('message.read[uid]', message.read[uid], message.text);
        // if (message.read[uid] === false) {
        //   unreadMessageCount++;
        // }
      });
      return unreadMessageCount;
    }
  };

  const refRBSheet = useRef();
  const onPress = () => {};

  const renderItem = (item, index, type) => {
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            if (type === 'chat') {
              props.navigation.navigate('Chat', {
                chatId: chatIds[index],
                friendId: Object.keys(item.users).find((user) => user !== uid),
              });
            } else {
              props.navigation.navigate('Profile', {
                userId: Object.keys(item.users).find((user) => user !== uid),
                chatId: chatIds[index],
              });
            }
          }}>
          <View style={styles.itemLeft}>
            <Avatar
              // source={{uri: getFriendAvatarURL(item)}}
              source={images.images.authBackground}
              size={sizes.dimension.activityItem.height}
            />
            <Space width={15} />
            <View style={styles.itemCenter}>
              <CustomText
                // text={getChatName(item)}
                text={'okay'}
                fontSize={sizes.font.s}
              />
              <CustomText
                text={getFinalMessage(item)}
                color={colors.darkGray}
                fontSize={sizes.font.xs}
              />
            </View>
          </View>
          {type === 'chat' ? (
            getUnreadMessageCount(item) > 0 && (
              <Notification number={getUnreadMessageCount(item)} />
            )
          ) : (
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
                setSelectedInviteChatIndex(index);
                setSelectedFriendId(
                  Object.keys(item.users).find((user) => user !== uid),
                );
              }}>
              <CustomImage
                width={sizes.dimension.moreButton.size}
                height={sizes.dimension.moreButton.size}
                source={images.icons.more}
                tintColor={colors.pink}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <SplitLine />
      </>
    );
  };

  return (
    <>
      <View style={[themeStyle.screen]}>
        <Header
          navigation={props.navigation}
          title={strings.activityScreen.header}
        />
        {chats.filter((chat) => chat.accepted === true).length > 0 && (
          <>
            <CustomText
              text={'Сообщения'}
              fontSize={sizes.font.s}
              color={colors.black}
            />
            <FlatList
              style={styles.flatList}
              data={chats.filter((chat) => chat.accepted === true)}
              keyExtractor={(item, index) => 'chat' + index}
              renderItem={(item) => renderItem(item.item, item.index, 'chat')}
            />
          </>
        )}
        {chats.filter(
          (chat) => chat.accepted !== true && chat.invited[uid] === true,
        ).length > 0 && (
          <>
            <CustomText
              text={'Лайки'}
              fontSize={sizes.font.s}
              color={colors.black}
            />
            <FlatList
              style={styles.flatList}
              data={chats.filter(
                (chat) => chat.accepted !== true && chat.invited[uid] === true,
              )}
              keyExtractor={(item, index) => 'invitation' + index}
              renderItem={(item) =>
                renderItem(item.item, item.index, 'invitation')
              }
            />
          </>
        )}

        {chats.filter((chat) => chat.accepted === true).length === 0 &&
          chats.filter(
            (chat) => chat.accepted !== true && chat.invited[uid] === true,
          ).length === 0 && (
            <View style={styles.noActivityView}>
              <CustomText
                text={'Здесь пока пусто'}
                fontSize={sizes.font.xs}
                color={colors.gray}
              />
            </View>
          )}

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          customStyles={{
            container: {
              justifyContent: 'space-between',
              borderTopLeftRadius:
                sizes.dimension.activityBottomSheet.borderRadius,
              borderTopRightRadius:
                sizes.dimension.activityBottomSheet.borderRadius,
            },
            wrapper: {
              backgroundColor: '#00000044',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <BottomSheetItem
            index={0}
            onPress={() => {
              refRBSheet.current.close();
              setLoadingState(true);
              console.log('clicked');
              database()
                .ref('/chats/' + chatIds[selectedInviteChatIndex] + '/accepted')
                .set(true)
                .then(() => {
                  setLoadingState(false);
                })
                .catch(() => setLoadingState(false));
            }}
          />
          <SplitLine />
          <BottomSheetItem
            index={1}
            onPress={() => {
              refRBSheet.current.close();
              console.log('look for user profile');
              props.navigation.navigate('Profile', {
                userId: selectedFriendId,
                chatId: chatIds[selectedInviteChatIndex],
              });
            }}
          />
          <SplitLine />
          <BottomSheetItem
            index={2}
            onPress={async () => {
              console.log('reject user invitation');
              setLoadingState(true);
              refRBSheet.current.close();
              await database()
                .ref('/chats/' + chatIds[selectedInviteChatIndex] + '/accepted')
                .set(false)
                .then()
                .catch();
              await database()
                .ref(
                  '/chats/' +
                    chatIds[selectedInviteChatIndex] +
                    '/invited/' +
                    uid,
                )
                .set(false)
                .then()
                .catch();
              await database()
                .ref(
                  '/chats/' +
                    chatIds[selectedInviteChatIndex] +
                    '/invited/' +
                    selectedFriendId,
                )
                .set(false)
                .then()
                .catch();
              setLoadingState(false);
            }}
          />
        </RBSheet>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
