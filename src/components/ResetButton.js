import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {THEME} from '../theme';

const ResetButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        style={{...THEME.text.shadow}}
        name="refresh"
        size={25}
        color={THEME.colors.light}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    top: 0,
    right: 0,
    zIndex: 2,
    position: 'absolute',
    padding: 25,
  },
});

export default ResetButton;
