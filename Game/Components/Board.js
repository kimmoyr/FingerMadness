import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import Dimensions from 'Dimensions';

import Tile from './Tile';

class Board extends Component {

  renderTiles(sizeX, sizeY, cellSize, cellPadding, tileSize) {
    const tiles = [];

    for (var row = 0; row < sizeY; row++) {
      for (var col = 0; col < sizeX; col++) {
        const position = {
          left: col * cellSize + cellPadding,
          top: row * cellSize + cellPadding
        };
        const key = row * sizeX + col;

        tiles.push(
          <Tile
            key={key}
            position={position}
            size={tileSize} />
        );
      }
    }

    return tiles;
  }

  render() {
    const {width, height} = Dimensions.get('window');
    const CELL_SIZE = 80;
    const SIZE_X = Math.floor(width / CELL_SIZE);
    const SIZE_Y = Math.floor(height / CELL_SIZE);
    const CELL_PADDING = Math.floor(CELL_SIZE * 0.10);
    const BORDER_RADIUS = CELL_PADDING * 2;
    const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;

    const boardSize = {
      width: SIZE_X * CELL_SIZE,
      height: SIZE_Y * CELL_SIZE,
    }

    return (
      <View style={styles.container}>
        <View style={[styles.board, boardSize]}>
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
