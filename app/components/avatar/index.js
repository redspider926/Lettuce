import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './style';

const Avatar = (props) => {
  const {size, source, onPress} = props;
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={[
            {width: size, height: size, borderRadius: size},
            styles.avatarComponentContainer,
          ]}
          source={source}
        />
      </TouchableOpacity>
    </>
  );
};

export default Avatar;
