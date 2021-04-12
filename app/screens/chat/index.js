import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';

import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import SettingItem from 'components/setting-item';
import Header from 'components/header';
import CircleButton from 'components/circle-button';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import themeStyle from 'config/themeStyle';
import * as strings from 'config/strings';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import database from '@react-native-firebase/database';

const Index = (props) => {
  const chatId = props.route.params.chatId;
  const friendId = props.route.params.friendId;
  const uid = props.auth.user.uid;

  // const chat = props.chats.find((_chat) => _chat._id === chatId);
  const [messages, setMessages] = useState([]);
  const [editState, setEditState] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [editMessageId, setEditMessageId] = useState(null);
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    getMessagesOnScreenFocus();
    getRealTimeChangedMessages();

    return function cleanup() {
      readAll();
    };
  }, []);

  function selectImage(evt) {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {base64: response.base64};
        setImageSource(`data:image/gif;base64,${source.base64}`);
      }
    });
  }

  const getMessagesOnScreenFocus = () => {
    database()
      .ref('/chats/' + chatId + '/messages')
      .once('value')
      .then((snapshot) => {
        let result_messages;
        if (snapshot.val() === null || snapshot.val() === undefined) {
          result_messages = [];
        } else {
          result_messages = snapshot
            .val()
            .filter((result_message) => !result_message.deleted);
        }
        setMessages(result_messages);
      });
  };

  const getRealTimeChangedMessages = () => {
    database()
      .ref('/chats/' + chatId + '/messages')
      .on('value', (snapshot) => {
        let result_messages;
        if (snapshot.val() === null || snapshot.val() === undefined) {
          result_messages = [];
        } else {
          result_messages = snapshot
            .val()
            .filter((result_message) => !result_message.deleted);
        }
        setMessages(result_messages);
      });
  };

  const readAll = () => {
    database()
      .ref('/chats/' + chatId + '/messages')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null || snapshot.val() === undefined) {
        } else {
          for (let _index in snapshot.val()) {
            database()
              .ref('/chats/' + chatId + '/messages/' + _index + '/read/' + uid)
              .set(true)
              .then();
          }
        }
      });
  };

  async function onSend(_messages) {
    _messages[0].image = imageSource;
    setImageSource(null);
    let messageId;
    await database()
      .ref('/chats/' + chatId + '/messages')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null || snapshot.val() === undefined) {
          messageId = 0;
        } else {
          messageId = snapshot.val().length;
        }
      })
      .catch(() => {});
    database()
      .ref('/chats/' + chatId + '/messages/' + messageId)
      .set({
        ..._messages[0],
        deleted: false,
        messageId: messageId,
      })
      .then(() => {});
    database()
      .ref('/chats/' + chatId + '/messages/' + messageId + '/read/' + uid)
      .set(true)
      .then(() => {});

    database()
      .ref('/chats/' + chatId + '/messages/' + messageId + '/read/' + friendId)
      .set(false)
      .then(() => {});
    database()
      .ref('/chats/' + chatId + '/messages/' + messageId + '/createdAt')
      .set(Date.now())
      .then(() => {});
  }

  const deleteMessage = (messageId) => {
    database()
      .ref('/chats/' + chatId + '/messages/' + messageId + '/deleted')
      .set(true)
      .then((result) => {});
  };

  const editMessage = () => {
    database()
      .ref('/chats/' + chatId + '/messages/' + editMessageId + '/text')
      .set(messageText)
      .then((result) => {
        setEditState(false);
        setMessageText('');
      });
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{padding: sizes.dimension.padding}}>
        <Header
          navigation={props.navigation}
          title={strings.activityScreen.header}
          left={true}
        />
      </View>

      <GiftedChat
        text={messageText}
        onInputTextChanged={(text) => setMessageText(text)}
        messages={messages.map((message) => message).reverse()}
        onSend={(_messages) => {
          if (editState) {
            editMessage();
          } else {
            onSend(_messages);
          }
        }}
        user={{
          _id: uid,
          name: props.auth.user.name,
          avatar: props.auth.user.avatar,
        }}
        renderChatFooter={() => {
          return (
            <>
              {imageSource !== null && (
                <View style={styles.renderChatFooter}>
                  <View style={styles.renderChatFooterView}>
                    <Image
                      style={styles.renderChatFooterImage}
                      source={{uri: imageSource}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setImageSource(null);
                      }}
                      style={styles.imageCloseButton}>
                      <CircleButton
                        buttonColor={colors.white}
                        tintColor={colors.pink}
                        source={images.icons.close}
                        size={15}
                        elevation={5}
                        borderColor={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          );
        }}
        renderMessageImage={(v) => (
          <View>
            <Image
              resizeMode="contain"
              style={styles.renderImage}
              source={{uri: v.currentMessage.image}}
            />
          </View>
        )}
        alwaysShowSend={imageSource !== null || messageText !== ''}
        renderBubble={(bubbleProps) => {
          return (
            <Bubble
              {...bubbleProps}
              textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'black',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: colors.lightGray,
                },
                right: {
                  backgroundColor: colors.green,
                },
              }}
            />
          );
        }}
        renderSend={(sendButtonProps) => {
          return (
            <Send {...sendButtonProps}>
              <View style={styles.renderSend}>
                {editState ? (
                  <CustomImage
                    source={images.icons.edit}
                    tintColor={colors.pink}
                    width={15}
                    height={15}
                  />
                ) : (
                  <CustomImage
                    source={images.icons.send}
                    tintColor={colors.pink}
                    width={15}
                    height={15}
                  />
                )}
              </View>
            </Send>
          );
        }}
        renderActions={() => (
          <View style={styles.renderActions}>
            {editState ? (
              <TouchableOpacity
                onPress={() => {
                  setEditState(false);
                  setMessageText('');
                }}>
                <CustomImage
                  source={images.icons.close}
                  tintColor={colors.pink}
                  width={25}
                  height={25}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={selectImage}>
                <CustomImage
                  source={images.icons.camera}
                  tintColor={colors.gray}
                  width={25}
                  height={25}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        onLongPress={(context, message) => {
          var options = ['Edit Message', 'Delete Message', 'Cancel'];
          if (message.user._id !== uid) {
            return false; //can't edit or delete friend's message
          }
          var editButtonIndex = 0;
          if (message.text === '') {
            options = ['Delete Message', 'Cancel']; //can't edit only image
            editButtonIndex = -1;
          }

          const deleteButtonIndex = options.length - 2;
          const cancelButtonIndex = options.length - 1;
          context.actionSheet().showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            (buttonIndex) => {
              switch (buttonIndex) {
                case editButtonIndex:
                  setMessageText(message.text);
                  setEditState(true);
                  setEditMessageId(message.messageId);
                  break;
                case deleteButtonIndex:
                  console.log(message.messageId);
                  deleteMessage(message.messageId);
                  break;
                case cancelButtonIndex:
                  break;
                default:
                  break;
              }
            },
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: sizes.dimension.padding,
    backgroundColor: colors.white,
  },

  imageCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 10,
  },

  renderImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },

  renderActions: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },

  renderSend: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  renderChatFooterImage: {
    width: 100,
    height: 100,
    margin: 10,
  },

  renderChatFooterView: {
    width: 120,
    height: 120,
  },

  renderChatFooter: {
    width: '100%',
    backgroundColor: colors.green,
  },
});

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
