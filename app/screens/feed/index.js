import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Loading from 'components/loading';
import CustomText from 'components/custom-text';
import CircleButton from 'components/circle-button';
import Space from 'components/space';
import SplitLine from 'components/split-line';
import RBSheet from 'react-native-raw-bottom-sheet';

import database from '@react-native-firebase/database';

import * as sizes from 'config/sizes';
import * as images from 'config/images';
import * as colors from 'config/colors';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import uuid from 'react-native-uuid';

const Feed = (props) => {
  const refRBSheet = React.useRef();
  const refSwiper = React.useRef(null);
  const [items, setItems] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const uid = props.auth.user.uid;
  const name = props.auth.user.name;
  React.useEffect(() => {
    getFeedItems();
    return function cleanup() {};
  }, []);
  const getFeedItems = () => {
    setLoadingState(true);
    database()
      .ref('/items')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() !== null && snapshot.val() !== undefined) {
          setItems(
            Object.values(snapshot.val()).filter(
              (item) => item.ownerId !== uid,
            ),
          );
        }
        setLoadingState(false);
      })
      .catch((error) => {
        setLoadingState(false);
      });
  };

  async function voteItem(item, vote) {
    if (vote) {
      const users = [uid, item.ownerId].sort();
      const chatId = users.toString();
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
        text: `I like your ${item.title}`,
        createdAt: Date.now(),
        receiver: item.ownerId,
        _id: uuid.v1(),
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
    <View style={styles.root}>
      <CardStack
        style={styles.cardSwiper}
        renderNoMoreCards={() => <Text>Больше нет предметов :(</Text>}
        ref={refSwiper}
        onSwiped={(swipedCardIndex) => {
          console.log('onSwipedCardIndex', swipedCardIndex);
        }}
        onSwipedLeft={(swipedCardIndex) => {
          console.log('onSwipedLeft');
          console.log('onSwipedCardIndex', swipedCardIndex);
          if (swipedCardIndex < items.length - 1) {
            setSelectedItemIndex(swipedCardIndex + 1);
          }
          voteItem(items[swipedCardIndex], false);
        }}
        onSwipedRight={(swipedCardIndex) => {
          console.log('onSwipedRight');
          console.log('onSwipedCardIndex', swipedCardIndex);
          if (swipedCardIndex < items.length - 1) {
            setSelectedItemIndex(swipedCardIndex + 1);
          }
          voteItem(items[swipedCardIndex], true);
        }}
        disableTopSwipe={true}
        disableBottomSwipe={true}>
        {items.map((item, index) => {
          return (
            <Card style={styles.card} key={index}>
              <ImageBackground
                style={styles.cardImage}
                source={{uri: item.image}}>
                <Space flex={1} />
                <ImageBackground
                  imageStyle={{resizeMode: 'stretch'}}
                  source={images.images.gradient}
                  style={styles.itemInfo}>
                  <CustomText
                    style={styles.title}
                    text={item.title}
                    color={colors.white}
                    fontSize={sizes.font.xxxl}
                  />
                  <CircleButton
                    buttonColor={colors.white}
                    tintColor={colors.gray}
                    source={images.icons.information}
                    size={sizes.dimension.smallCircleButton.size}
                    elevation={5}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                  />
                </ImageBackground>
              </ImageBackground>
            </Card>
          );
        })}
      </CardStack>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        // openDuration={500}
        // closeDuration={500}
        customStyles={{
          container: {
            justifyContent: 'space-between',
            height: sizes.dimension.feedBottomSheet.height,
            padding: 20,
            overflow: 'visible',
          },
          wrapper: {
            backgroundColor: '#00000044',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.dropDownButtonView}>
          <CircleButton
            buttonColor={colors.white}
            tintColor={colors.gray}
            source={images.icons.dropdown}
            size={40}
            elevation={5}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <CustomText
          text={items.length > 0 ? items[selectedItemIndex].title : 'ok'}
          fontSize={sizes.font.xxxl}
          fontWeight="bold"
        />
        <View style={styles.categoryInfo}>
          <View>
            <CustomText text="Category:" fontSize={sizes.font.s} />
            <CustomText text="Size:" fontSize={sizes.font.s} />
          </View>
          <Space width={20} />
          <View>
            <CustomText
              text={items.length > 0 && items[selectedItemIndex].category}
              fontSize={sizes.font.s}
              color={colors.gray}
            />
            <CustomText
              text={items.length > 0 && items[selectedItemIndex].size}
              fontSize={sizes.font.s}
              color={colors.gray}
            />
          </View>
        </View>

        <SplitLine />
        <CustomText
          text={items.length > 0 && items[selectedItemIndex].description}
          fontSize={sizes.font.s}
        />
        <View style={styles.buttonGroup}>
          <CircleButton
            buttonColor={colors.white}
            tintColor={colors.pink}
            source={images.icons.close}
            size={50}
            elevation={5}
            borderColor={colors.white}
            onPress={() => {
              refRBSheet.current.close();
              refSwiper.current.swipeLeft();
            }}
          />
          <CircleButton
            buttonColor={colors.white}
            tintColor={colors.green}
            source={images.icons.like}
            size={50}
            elevation={5}
            borderColor={colors.white}
            onPress={() => {
              refRBSheet.current.close();
              refSwiper.current.swipeRight();
            }}
          />
        </View>
      </RBSheet>
      {loadingState && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },

  cardSwiper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: sizes.dimension.swiperCard.width,
    height: sizes.dimension.swiperCard.height,
  },

  cardImage: {
    width: sizes.dimension.swiperCard.width,
    height: sizes.dimension.swiperCard.height,
  },

  itemInfo: {
    width: sizes.dimension.screenWidth,
    height: 200,
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizes.dimension.padding,
  },

  dropDownButtonView: {
    position: 'absolute',
    top: -20,
    right: 30,
    zIndex: 100,
    elevation: 100,
  },

  categoryInfo: {
    display: 'flex',
    flexDirection: 'row',
  },

  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
