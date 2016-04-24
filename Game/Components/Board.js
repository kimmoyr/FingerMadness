import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import Dimensions from 'Dimensions';

import Tile from './Tile';

const {width, height} = Dimensions.get('window');
const SIZE_X = 5; Math.floor(width / CELL_SIZE);
const SIZE_Y = 8; Math.floor(height / CELL_SIZE);
const CELL_SIZE = Math.min(Math.floor(width / SIZE_X), Math.floor(height / SIZE_Y));
const CELL_COUNT = SIZE_X * SIZE_Y;
const CELL_PADDING = Math.floor(CELL_SIZE * 0.10);
const BORDER_RADIUS = CELL_PADDING * 2;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const BOARD_WIDTH = SIZE_X * CELL_SIZE;
const BOARD_HEIGHT = SIZE_Y * CELL_SIZE;

function tileKey(row, col) {
  return row * SIZE_X + col;
}

function getPositionFromKey(key) {
  return {
    row: Math.floor(key / SIZE_X),
    col: key % SIZE_X
  };
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

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeTilePositions(props) {
  const playerTileCount = props.playerTileCount;
  const tilePositions = {};

  for (var player of props.players) {
    const playerTilePositions = [];
    tilePositions[player.id] = playerTilePositions;

    while (playerTilePositions.length < playerTileCount) {
      const randomKey = getRandomIntInclusive(0, CELL_COUNT - 1);

      var used = false;
      for (var set in tilePositions) {
        if (tilePositions[set].indexOf(randomKey) >= 0) {
          used = true;
          break;
        }
      }

      if (!used) {
        playerTilePositions.push(randomKey);
      }
    }
  }

  return tilePositions;
}

class Board extends Component {

  constructor(props) {
    super(props);
    this.updateTouchStates = this.updateTouchStates.bind(this);
    this.state = {
      tilePositions: randomizeTilePositions(props),
      pressedTiles: []
    };
  }

  setPressedTiles(pressedTiles) {
    this.setState({
      tilePositions: this.state.tilePositions,
      pressedTiles: pressedTiles
    });

    for (var player of this.props.players) {
      let allPressed = true;
      for (var tile of this.state.tilePositions[player.id]) {
        if (pressedTiles.indexOf(tile) < 0) {
          allPressed = false;
          break;
        }
      }

      if (allPressed) {
        this.props.allPressedForPlayer(player);
      }
    }
  }

  updateTouchStates(event) {
    const pressedTiles = [];

    for (var touch of event.nativeEvent.touches) {
      const x = touch.locationX;
      const y = touch.locationY;

      const col = Math.floor(x / CELL_SIZE);
      const row = Math.floor(y / CELL_SIZE)
      const key = tileKey(row, col);
      pressedTiles.push(key);
    }

    if (!arraysAreEqual(pressedTiles, this.state.pressedTiles)) {
      this.setPressedTiles(pressedTiles);
    }
  }

  onTouchReleased(event) {
    this.setPressedTiles([]);
  }

  renderTiles(sizeX, sizeY, cellSize, cellPadding, tileSize) {
    const tiles = [];

    for (var player of this.props.players) {
      for (var key of this.state.tilePositions[player.id]) {
        const { row, col } = getPositionFromKey(key);

        const position = {
          left: col * cellSize + cellPadding,
          top: row * cellSize + cellPadding
        };

        const pressed = this.state.pressedTiles.indexOf(key) >= 0;

        tiles.push(
          <Tile
            key={key}
            position={position}
            size={tileSize}
            color={player.color}
            pressedColor={player.pressedColor}
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
          onResponderRelease={this.onTouchReleased.bind(this)}
          pointerEvents='box-only'>
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
    backgroundColor: '#000000',
  }
});

module.exports = Board;
