import React from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = React.forwardRef((props, ref) => {
  return (
    <RNCamera
      ref={ref}
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );
});

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Camera;
