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

    const color = {
        backgroundColor: this.props.pressed ? 'white' : '#ec3a3a'
    }

    return (
      <View key={this.props.key} style={[styles.tile, size, this.props.position, color]} />
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute'
  }
});

module.exports = Tile;
