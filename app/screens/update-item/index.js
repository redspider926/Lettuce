import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from 'components/header';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import CustomImage from 'components/custom-image';
import Loading from 'components/loading';
import CircleButton from 'components/circle-button';
import Space from 'components/space';
import themeStyle from 'config/themeStyle';
import styles from './style';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as sizes from 'config/sizes';
import * as strings from 'config/strings';

import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {useFocusEffect} from '@react-navigation/native';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const UpdateItem = (props) => {
  let params = props.route.params;

  const itemId = params.itemId;
  const [image, setImage] = useState(params.image);
  const [title, setTitle] = useState(params.title);
  const [category, setCategory] = useState(params.category);
  const [size, setSize] = useState(params.size);
  const [description, setDescription] = useState(params.description);

  const [loadingState, setLoadingState] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const updateItem = () => {
    setLoadingState(true);
    database()
      .ref('/items/' + itemId)
      .set({
        ownerId: props.auth.user.uid,
        title: title,
        category: category,
        size: size,
        description: description,
        image: image,
      })
      .then(() => {
        console.log('update Item success!');
        props.navigation.navigate('MyProfile');
      })
      .catch((error) => {
        setLoadingState(false);
        console.log('create Item error', error);
      });
  };

  const deleteItem = () => {
    setLoadingState(true);
    database()
      .ref('/items/' + itemId)
      .remove()
      .then(() => {
        setLoadingState(false);
        props.navigation.navigate('MyProfile');
      })
      .catch(() => {
        setLoadingState(false);
      });
  };

  const onCameraButton = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setIsModalVisible(false);
        console.log('camera response', response);
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setImage(`data:image/gif;base64,${response.base64}`);
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
        includeBase64: true,
      },
      (response) => {
        setIsModalVisible(false);
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setImage(`data:image/gif;base64,${response.base64}`);
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView>
      <View style={themeStyle.screen}>
        <Header
          title={strings.updateItemScreen.header}
          navigation={props.navigation}
          left={true}
        />
        <Space height={20} />
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => setIsModalVisible(true)}>
            {image && (
              <Image
                source={{uri: image}}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            )}

            <CustomImage
              source={images.icons.camera}
              width={40}
              height={40}
              tintColor={colors.gray}
            />
          </TouchableOpacity>

          <CustomInput
            value={title}
            label={strings.updateItemScreen.item1}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />

          <CustomInput
            value={category}
            label={strings.updateItemScreen.item2}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => {
              setCategory(text);
            }}
          />

          <CustomInput
            value={size}
            label={strings.updateItemScreen.item3}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => setSize(text)}
          />

          <CustomInput
            value={description}
            label={strings.updateItemScreen.item4}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => setDescription(text)}
          />

          {/* <Space height={30} /> */}

          <CustomButton
            label={strings.updateItemScreen.button1}
            textColor={colors.white}
            buttonColor={colors.green}
            disabled={
              !title || !category || !size || !description || image === null
            }
            onPress={updateItem}
          />
          <CustomButton
            label={strings.updateItemScreen.button2}
            textColor={colors.pink}
            borderColor={colors.gray}
            onPress={deleteItem}
          />
        </ScrollView>

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
    </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);
