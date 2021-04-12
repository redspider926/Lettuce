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
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const CreateItem = (props) => {
  const uid = props.auth.user.uid;
  const [responseUri, setResponseUri] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  async function createItem() {
    setLoadingState(true);
    const itemId = uuid.v1();
    var imageRef = storage().ref('/items').child(uuid.v1());
    imageRef
      .putFile(responseUri)
      .then(async (snapshot) => {
        let url = await imageRef.getDownloadURL();
        database()
          .ref('/items/' + itemId)
          .set({
            ownerId: props.auth.user.uid,
            title: title,
            category: category,
            size: size,
            description: description,
            image: url,
          })
          .then(() => {
            console.log('create Item success!');
            props.navigation.navigate('MyProfile');
            setResponseUri('');
            setTitle('');
            setCategory('');
            setSize('');
            setDescription('');
            setLoadingState(false);
          })
          .catch((error) => {
            setLoadingState(false);
            console.log('create Item error', error);
          });
      })
      .catch();
    database()
      .ref('/items/' + itemId)
      .set({
        ownerId: props.auth.user.uid,
        title: title,
        category: category,
        size: size,
        description: description,
        image: responseUri,
      })
      .then(() => {
        console.log('create Item success!');
        props.navigation.navigate('MyProfile');
        setResponseUri('');
        setTitle('');
        setCategory('');
        setSize('');
        setDescription('');
        setLoadingState(false);
      })
      .catch((error) => {
        setLoadingState(false);
        console.log('create Item error', error);
      });
  }

  const onCameraButton = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 256,
        maxWidth: 256,
      },
      (response) => {
        setIsModalVisible(false);
        console.log('camera response', response);
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setResponseUri(response.uri);
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
      },
      (response) => {
        setIsModalVisible(false);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
          // Alert.alert('You did not select any image');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log(response.uri);
          setResponseUri(response.uri);
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView>
      <View style={themeStyle.screen}>
        <Header
          title={strings.createItemScreen.header}
          navigation={props.navigation}
        />
        <Space height={20} />
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => setIsModalVisible(true)}>
            {responseUri.length > 0 && (
              <Image
                source={{uri: responseUri}}
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
            label={strings.createItemScreen.item1}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />

          <CustomInput
            value={category}
            label={strings.createItemScreen.item2}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => {
              setCategory(text);
            }}
          />

          <CustomInput
            value={size}
            label={strings.createItemScreen.item3}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => setSize(text)}
          />

          <CustomInput
            value={description}
            label={strings.createItemScreen.item4}
            keyboardType="phone-pad"
            color={colors.gray}
            baseColor={colors.gray}
            onChangeText={(text) => setDescription(text)}
          />

          {/* <Space height={30} /> */}

          <CustomButton
            label={strings.createItemScreen.button}
            textColor={colors.white}
            buttonColor={colors.green}
            disabled={
              !title ||
              !category ||
              !size ||
              !description ||
              responseUri.length === 0
            }
            onPress={createItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
