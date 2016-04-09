import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import Dimensions from 'Dimensions';

import Tile from './Tile';

const {width, height} = Dimensions.get('window');
const CELL_SIZE = 80;
const SIZE_X = Math.floor(width / CELL_SIZE);
const SIZE_Y = Math.floor(height / CELL_SIZE);
const CELL_COUNT = SIZE_X * SIZE_Y;
const CELL_PADDING = Math.floor(CELL_SIZE * 0.10);
const BORDER_RADIUS = CELL_PADDING * 2;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const BOARD_WIDTH = SIZE_X * CELL_SIZE;
const BOARD_HEIGHT = SIZE_Y * CELL_SIZE;

function tileKey(row, col) {
  return row * SIZE_X + col;
}

function arraysAreEqual(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}

class Board extends Component {

  constructor(props) {
    super(props);
    this.updateTouchStates = this.updateTouchStates.bind(this);
    this.state = {
      pressedTiles: []
    };
  }

  updateTouchStates(event) {
    const pressedTiles = [];

    for (var touch of event.nativeEvent.changedTouches) {
      const x = touch.pageX;
      const y = touch.pageY;

      const col = Math.floor(x / CELL_SIZE);
      const row = Math.floor(y / CELL_SIZE)
      const key = tileKey(row, col);
      pressedTiles.push(key);
    }

    if (!arraysAreEqual(pressedTiles, this.state.pressedTiles)) {
      this.setState({
        pressedTiles: pressedTiles
      });
    }
  }

  onTouchReleased(event) {
    this.setState({
      pressedTiles: []
    })
  }

  renderTiles(sizeX, sizeY, cellSize, cellPadding, tileSize) {
    const tiles = [];

    for (var row = 0; row < sizeY; row++) {
      for (var col = 0; col < sizeX; col++) {
        const position = {
          left: col * cellSize + cellPadding,
          top: row * cellSize + cellPadding
        };

        const key = tileKey(row, col);
        const pressed = this.state.pressedTiles.indexOf(key) >= 0;

        tiles.push(
          <Tile
            key={key}
            position={position}
            size={tileSize}
            pressed={pressed} />
        );
      }
    }

    return tiles;
  }

  render() {
    const boardSize = {
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
    }

    return (
      <View style={styles.container}>
        <View
          style={[styles.board, boardSize]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={this.updateTouchStates}
          onResponderMove={this.updateTouchStates}
          onResponderRelease={this.onTouchReleased.bind(this)}>
          {this.renderTiles(SIZE_X, SIZE_Y, CELL_SIZE, CELL_PADDING, TILE_SIZE)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  board: {

  }
});

module.exports = Board;
