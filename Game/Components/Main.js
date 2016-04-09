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

  constructor(props) {
    super(props);
    this.state = {
      scores: {}
    };

    for (var player of players) {
      this.state.scores[player.id] = 0;
    }
  }

  onAllPressedForPlayer(player) {
    console.log("All pressed for player " + player.id);
    const state = this.state;
    state.scores[player.id]++;
    this.setState(state);

    console.log("Scores:");
    for (var p of players) {
      console.log("   Player " + p.id + ": " + this.state.scores[p.id]);
    }
  }

  render() {
    return (
      <Board
        players={players}
        playerTileCount={5}
        allPressedForPlayer={this.onAllPressedForPlayer.bind(this)}/>
    );
  }
}

module.exports = Main;
