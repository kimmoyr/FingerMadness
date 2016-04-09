import React, {
  Component
} from 'react-native';

import Board from './Board';

const players = [
  {
    id: 1,
    color: '#ec3a3a'
  },
  {
    id: 2,
    color: '#1e30cf'
  }
];

class Main extends Component {
  render() {
    return (
      <Board
        players={players}
        playerTileCount={5}/>
    );
  }
}

module.exports = Main;
