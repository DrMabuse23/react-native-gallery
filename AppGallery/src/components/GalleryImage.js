var React = require('react-native');
var {
  Image,
  View,
  Component
  } = React;

class GalleryImage extends React.Component {
  constructor(props){
    super(props);
    console.log('Hello', this.props);
    this.state = {
      imagePath: this.props.image
    };

  }

  render(){

    if (this.state.imagePath === '') {
      return false
    }
    console.log('GalleryImage', this.state.imagePath);
    return (
      <View style={{width: 320, backgroundColor: 'red'}}>
        <Image style={{width: 320, resizeMode: 'cover'}} source={{uri: this.state.imagePath}} />
      </View>
    );
  }
}

module.exports = GalleryImage;