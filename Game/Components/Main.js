import React, {
  Component
} from 'react-native';


import Board from './Board';
import Wait from './Wait';

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
      showBoard: false,
      scores: {},
      lastWinner: null
    };

    for (var player of players) {
      this.state.scores[player.id] = 0;
    }

    this.showNewBoardAfterDelay();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onAllPressedForPlayer(player) {
    console.log("All pressed for player " + player.id);
    const state = this.state;
    state.scores[player.id]++;
    state.showBoard = false;
    state.lastWinner = player;
    this.setState(state);

    console.log("Scores:");
    for (var p of players) {
      console.log("   Player " + p.id + ": " + this.state.scores[p.id]);
    }

    this.showNewBoardAfterDelay();
  }

  showNewBoardAfterDelay() {
    this.timer = setTimeout(this.showNewBoard.bind(this), 5000);
  }

  showNewBoard(winner) {
    this.setState({
      showBoard: true,
      scores: this.state.scores,
      lastWinner: winner
    });
  }

  renderBoard() {
    return (
      <Board
        players={players}
        playerTileCount={5}
        allPressedForPlayer={this.onAllPressedForPlayer.bind(this)}/>
    );
  }

  renderWaitScreen() {
    return <Wait winner={this.state.lastWinner}/>;
  }

  render() {
    if (this.state.showBoard) {
      return this.renderBoard();
    } else {
      return this.renderWaitScreen();
    }
  }
}

module.exports = Main;
