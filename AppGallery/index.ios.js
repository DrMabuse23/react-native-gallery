/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var GalleryService = require('./src/classes/GalleryService');
var {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Component,
  Text,
  Image,
  NativeModules,
  NativeAppEventEmitter
  } = React;
class GalleryImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: windowSize.height,
      width: windowSize.width,
      resizeMode: 'contain',
      orientation: null
    }
  }
  componentDidMount() {
    NativeModules.BrewingDeviceOrientation.getOrientation((orientation) => {
      this._changeSize(orientation);
      console.log('orientation', orientation);
    });

    NativeAppEventEmitter.addListener(
      'orientationOnChange',
      (response) => {
        console.log('response.orientation', response.orientation);
        this._changeSize(response.orientation);
      }
    );
  }
  _changeSize(orientation){
    var landScape = orientation.split('landscape');
    if ( landScape.length > 1) {
      this.setState({height: windowSize.width, width: windowSize.height})
    }else {
      this.setState({height: windowSize.height, width: windowSize.width})
    }
    console.log(this.state, landScape, landScape.length > 1);
  }
  render(){
    return (
      <View style={[styles.button, {height: this.state.height, width: this.state.width}]}>
        <Image resizeMode={this.state.resizeMode} style={[styles.img, {height: this.state.height, width: this.state.width}]} source={{uri: this.props.uri}} />
      </View>
    );
  }
}

var _renderImages = (uri, i) => <GalleryImage key={i} uri={uri}></GalleryImage>;

class AppGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      height: windowSize.height,
      width: windowSize.width,
      orientation: 'portrait',
      service: new GalleryService()
    }
    //console.log(this.state);
  }
  _changeSize(){
    if (this.state.orientation.split('landscape') !== -1) {
      this.setState({height: windowSize.width, width: windowSize.height})
    }else {
      this.setState({height: windowSize.height, width: windowSize.width})
    }
  }
  componentDidMount() {
    NativeModules.BrewingDeviceOrientation.getOrientation((orientation) => {
      this.setState({orientation: orientation});
      this._changeSize();

    });

    NativeAppEventEmitter.addListener(
      'orientationOnChange',
      (response) => {
        //console.log(response.orientation);
        this.setState({orientation: response.orientation})
        this._changeSize();
      }
    );
    this.state.service.fetchImages().
      then((response) => {
        if (response.status !== 200) {
          return false;
        }
        return response.json();
      }).then((images) => {
        //console.log(images);
        return this.setState({gallery: images})
      })
      .catch((error) => {
        console.error(error);
      })
      .done()
  }
  render() {
    if (this.state.gallery.length === 0) {
      return (<Text>onLoad -....</Text>);
    }
    return (
      <View style={styles.container}>
        <ScrollView
          contentInset={{top: -22}}
          horizontal={true}
          style={[styles.scrollView, styles.horizontalScrollView, {height: this.state.height, width: this.state.width}]}
        >
          {this.state.gallery.map(_renderImages)}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    //width: windowSize.width,
    //height: windowSize.height
  },
  horizontalScrollView: {
    //width: windowSize.width,
    //height: windowSize.height
  },
  containerPage: {
    backgroundColor: '#527FE4',
  },
  button: {
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'red'
  },
  buttonContents: {
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  img: {
    backgroundColor:'blue'
  }
});

AppRegistry.registerComponent('AppGallery', () => AppGallery);
