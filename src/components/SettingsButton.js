import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getModelNiceName} from '../constants';
import {THEME} from '../theme';

const SettingsButton = ({onPress, to, from, model}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.horizontal}>
        <Icon
          style={styles.icon}
          name="settings"
          size={25}
          color={THEME.colors.light}
        />
        <Text style={styles.text}>Model: {getModelNiceName(model)}</Text>
      </View>

      <View style={styles.vertical}>
        <Text style={styles.text}>{from}</Text>
        <Icon
          style={styles.arrow}
          name="keyboard-arrow-down"
          size={20}
          color={THEME.colors.light}
        />
        <Text style={styles.text}>{to}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    top: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
    padding: 25,
    justifyContent: 'center',
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  vertical: {
    paddingTop: 10,
    width: 25,
    alignItems: 'center',
  },
  icon: {
    paddingRight: 10,
    ...THEME.text.shadow,
  },
  arrow: {
    ...THEME.text.shadow,
  },
  text: {
    fontSize: 16,
    ...THEME.text.shadow,
    color: THEME.colors.light,
    fontWeight: 'bold',
  },
});

export default SettingsButton;
