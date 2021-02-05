import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {THEME} from '../theme';
import MiniImagePreview from './MiniImagePreview';

export default class ResultsCarousel extends Component {
  constructor(props) {
    super(props);
    this._carousel = null;
  }
  componentDidUpdate() {
    if (this.props.activePrediction === 0) {
      this._carousel.snapToItem(0);
    }
  }
  render() {
    const {predictions, activePrediction, onSnap, imgURL} = this.props;
    const {width} = Dimensions.get('screen');
    return (
      <View style={styles.root}>
        <View style={styles.bgMask} />
        <MiniImagePreview imgURL={imgURL} />
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            onSnapToItem={(index) => onSnap(index)}
            data={predictions}
            renderItem={({item}) => {
              const {translated, name} = item;
              return (
                <View style={styles.carouselItem}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.text}>
                    {`${translated} ${name ? `(${name})` : ''}`}
                  </Text>
                  <Text style={styles.textSmall}>
                    {item.value
                      ? `(${Number(item.value * 100).toFixed(2)}% Probability)`
                      : 'Tap the screen to detect an object in view'}
                  </Text>
                </View>
              );
            }}
            sliderWidth={width}
            itemWidth={width}
          />

          <Pagination
            dotsLength={predictions.length}
            activeDotIndex={activePrediction}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    zIndex: 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  carouselContainer: {
    height: 140,
  },
  bgMask: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,0,0)',
    opacity: 0.5,
  },
  carouselItem: {
    padding: 20,
    width: Dimensions.get('window').width,
  },
  text: {
    color: THEME.colors.light,
    ...THEME.text.shadow,
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  textSmall: {
    ...THEME.text.shadow,
    color: THEME.colors.light,
    fontSize: 12,
    textAlign: 'center',
  },
  paginationContainer: {
    paddingVertical: 0,
    paddingBottom: 30,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
