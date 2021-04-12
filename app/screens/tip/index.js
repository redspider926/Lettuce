import React, {useState, useRef} from 'react';
import {ImageBackground, View} from 'react-native';
import CustomText from 'components/custom-text';
import CustomImage from 'components/custom-image';
import CustomButton from 'components/custom-button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Space from 'components/space';
import themeStyle from 'config/themeStyle';
import styles from './style';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sizes from 'config/sizes';
import * as colors from 'config/colors';
import * as images from 'config/images';
import * as strings from 'config/strings';

const Tip = (props) => {
  const data = [
    {
      id: '1',
      title: strings.tipScreen.item1.title,
      text: strings.tipScreen.item1.text,
      source: images.images.tip1,
    },
    {
      id: '2',
      title: strings.tipScreen.item2.title,
      text: strings.tipScreen.item2.text,
      source: images.images.tip2,
    },
    {
      id: '3',
      title: strings.tipScreen.item3.title,
      text: strings.tipScreen.item3.text,
      source: images.images.tip3,
    },
    {
      id: '4',
      title: strings.tipScreen.item4.title,
      text: strings.tipScreen.item4.text,
      source: images.images.tip4,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <CustomImage
          source={item.source}
          width={sizes.dimension.screenWidth * 0.6}
          height={sizes.dimension.screenWidth * 1}
        />
        <Space height={15} />
        <View>
          <CustomText
            text={item.title}
            textAlign="center"
            color={colors.green}
            fontSize={sizes.font.xxl}
            fontWeight="bold"
          />
          <Space height={15} />
          <CustomText
            text={item.text}
            textAlign="center"
            color={colors.darkGray}
            fontSize={sizes.font.s}
          />
        </View>
      </View>
    );
  };

  async function onStartButton() {
    await props.authActions.getStarted();
    props.navigation.navigate('Authentication');
  }

  return (
    <>
      <ImageBackground
        style={styles.screen}
        source={images.images.union}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <Carousel
          data={data}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={sizes.dimension.screenWidth}
          itemWidth={sizes.dimension.screenWidth}
        />
        <View style={styles.buttonView}>
          <CustomButton
            label={strings.tipScreen.button}
            textColor={colors.white}
            buttonColor={colors.green}
            onPress={onStartButton}
          />
        </View>

        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.containerStyle}
          dotStyle={styles.activeDotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          dotContainerStyle={styles.dotContainerStyle}
        />
      </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tip);
