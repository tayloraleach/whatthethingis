import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {THEME} from '../theme';
import {Picker} from '@react-native-picker/picker';
import {getModelNiceName, LANG_CODES, MODELS} from '../constants';

const SettingsModal = ({
  toggleVisible,
  isVisible,
  to,
  from,
  model,
  onChangeModel,
}) => {
  return (
    <View>
      <Modal onBackdropPress={toggleVisible} isVisible={isVisible}>
        <View style={styles.root}>
          {/* Language Picker */}
          {/* TODO: Support for more languages. Clarifai data is in english only for now. */}
          {/* <View style={styles.row}>
            <View style={[styles.flex1, styles.row]}>
              <Text style={styles.label}>Language:</Text>
              <Picker
                style={styles.flex1}
                selectedValue={model}
                onValueChange={(val) => {
                  onChangeModel(val);
                }}>
                <Picker.Item
                  label={LANG_CODES.SPANISH.name}
                  value={LANG_CODES.SPANISH.name}
                />
                <Picker.Item
                  label={LANG_CODES.ENGLISH.name}
                  value={LANG_CODES.ENGLISH.name}
                />
              </Picker>
            </View>
          </View> */}

          {/* Model Picker */}
          <View style={styles.row}>
            <Text style={styles.label}>Model:</Text>
            <Picker
              style={styles.flex1}
              selectedValue={model}
              onValueChange={(val) => {
                onChangeModel(val);
              }}>
              <Picker.Item
                label={getModelNiceName(MODELS.GENERAL)}
                value={MODELS.GENERAL}
              />
              <Picker.Item
                label={getModelNiceName(MODELS.FOOD)}
                value={MODELS.FOOD}
              />
              <Picker.Item
                label={getModelNiceName(MODELS.TRAVEL)}
                value={MODELS.TRAVEL}
              />
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: THEME.colors.light,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  label: {
    color: THEME.colors.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  flex1: {flex: 1},
});

export default SettingsModal;
