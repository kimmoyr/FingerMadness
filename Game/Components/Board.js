import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import Tile from './Tile';

class Board extends Component {
  render() {
    return (
      <View style={styles.board}>
        <Tile size={40}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    backgroundColor: '#000000'
  }
});

module.exports = Board;
