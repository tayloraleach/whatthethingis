import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const MiniImagePreview = ({imgURL}) => {
  return (
    <View style={styles.photoContainer}>
      <Image
        source={{uri: imgURL}}
        resizeMethod={'resize'}
        style={styles.photo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    height: 100,
    width: 100,
    borderRadius: 6,
  },
  photoContainer: {
    position: 'absolute',
    bottom: '110%',
    width: '100%',
    alignItems: 'center',
  },
});

export default MiniImagePreview;
