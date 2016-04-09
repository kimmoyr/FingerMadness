import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

class Tile extends Component {
  render() {
    const size = {
      width: this.props.size,
      height: this.props.size
    };

    return (
      <View style={[styles.tile, size, this.props.position]}/>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    backgroundColor: '#ec3a3a'
  }
});

module.exports = Tile;
