import React, {Component, createRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import ResultsCarousel from './ResultsCarousel';
import {CLARIFAI_API_KEY, MS_AZURE_TRANSLATOR_KEY} from '@env';
import Clarifai from 'clarifai';
import Camera from './Camera';
import SettingsButton from './SettingsButton';
import ResetButton from './ResetButton';
import {THEME} from '../theme';
import {MODELS} from '../constants';
import SettingsModal from './SettingsModal';

const clarifai = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY,
});
process.nextTick = setImmediate;

const INITIAL_STATE = {
  predictions: [
    {translated: 'What the thing Is?', name: '', id: 'intro', value: ''},
  ],
  loading: false,
  activePrediction: 0,
  imgURL: null,
  fromLangCode: 'en',
  toLangCode: 'es',
  clarifaiModelName: MODELS.GENERAL,
  settingsModalVisible: false,
};

var subscriptionKey = MS_AZURE_TRANSLATOR_KEY;
var msTranslateEndpoint =
  'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&';

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = 'global';

class ThingViewer extends Component {
  constructor(props) {
    super(props);
    this.MAX_RESULTS = 8;
    this.state = {
      ...INITIAL_STATE,
    };
    this.cameraRef = createRef();
  }

  _resize = async (path) => {
    return ImageResizer.createResizedImage(path, 300, 300, 'JPEG', 100);
  };

  _takePicture = async () => {
    let data = null;
    if (this.cameraRef.current) {
      const options = {quality: 1, base64: true};
      data = await this.cameraRef.current.takePictureAsync(options);
    }
    return data;
  };

  _predict = async (image) => {
    let predictions = await clarifai.models.predict(
      Clarifai[this.state.clarifaiModelName],
      image,
    );
    return predictions;
  };

  _convertToBase64 = async (uri) => await RNFS.readFile(uri, 'base64');

  _handleDetectObject = () => {
    if (!this.state.loading) {
      this.setState({loading: true}, async () => {
        let photo = await this._takePicture();
        if (photo) {
          this.setState({imgURL: photo.uri});
          const resized = await this._resize(photo.uri);
          const base64 = await this._convertToBase64(resized.uri);
          let results = await this._predict(base64);
          const predictions = this._cleanPredictions(
            results.outputs[0].data.concepts,
          );

          // Limit results to reasonable number
          if (predictions.length > this.MAX_RESULTS) {
            predictions.length = this.MAX_RESULTS;
          }
          const translatedPredictions = await this._translatePredictions(
            predictions,
          );
          this.setState({
            predictions: translatedPredictions,
            activePrediction: 0,
            loading: false,
          });
        }
      });
    }
  };

  _cleanPredictions = (arr) => {
    return arr.filter((prediction) => {
      // Strip useless predictions from the model
      // TODO: this might be sketchy or better done in the clarifai console? model specific.
      return prediction.id !== 'ai_786Zr311'; // 'no person'
    });
  };

  _translatePredictions = async (arr) => {
    // Extract strings to translate from array.
    const strings = arr.map((obj) => {
      return {text: obj.name};
    });
    // Fetch translations.
    const endpointWithParams = `${msTranslateEndpoint}${new URLSearchParams({
      from: this.state.fromLangCode,
      to: this.state.toLangCode,
    })}`;
    const res = await fetch(endpointWithParams, {
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(strings),
    });
    const data = await res.json();

    // Copy original state and add translated prop to each object at index.
    const copy = [...arr].map((obj, x) => {
      return {...obj, translated: data[x].translations[0].text};
    });
    return copy;
  };

  _resetState = () => this.setState({...INITIAL_STATE});

  _toggleSettingsModal = () => {
    this.setState({settingsModalVisible: !this.state.settingsModalVisible});
  };

  _handleChangeModel = (val) => this.setState({clarifaiModelName: val});

  render() {
    const {
      predictions,
      activePrediction,
      imgURL,
      loading,
      toLangCode,
      fromLangCode,
      clarifaiModelName,
      settingsModalVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <SettingsModal
          onChangeModel={this._handleChangeModel}
          to={toLangCode}
          model={clarifaiModelName}
          from={fromLangCode}
          isVisible={settingsModalVisible}
          toggleVisible={this._toggleSettingsModal}
        />

        <SettingsButton
          to={toLangCode}
          from={fromLangCode}
          onPress={this._toggleSettingsModal}
          model={clarifaiModelName}
        />

        {imgURL && <ResetButton onPress={this._resetState} />}

        <Camera ref={this.cameraRef} />

        <TouchableOpacity
          style={styles.touchMask}
          onPress={this._handleDetectObject}
        />

        <ResultsCarousel
          loading={loading}
          imgURL={imgURL}
          predictions={predictions}
          activePrediction={activePrediction}
          onSnap={(x) => this.setState({activePrediction: x})}
        />

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={THEME.colors.light} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  touchMask: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThingViewer;
