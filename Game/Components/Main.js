import React, {
  Component
} from 'react-native';


import Board from './Board';
import Wait from './Wait';
import Start from './Start';

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
      gameOn: false,
      showBoard: false,
      scores: {},
      lastWinner: null
    };

    for (var player of players) {
      this.state.scores[player.id] = 0;
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  startPressed() {
    this.showNewBoardAfterDelay();
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
    const state = this.state;
    state.gameOn = true;
    this.setState(state);
    this.timer = setTimeout(this.showNewBoard.bind(this), 5000);
  }

  showNewBoard(winner) {
    this.setState({
      gameOn: true,
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

  renderStart() {
    return <Start winner={this.state.lastWinner} onStartPressed={() => this.startPressed()}/>;
  }

  render() {
    if (!this.state.gameOn) {
      return this.renderStart();
    } else if (this.state.showBoard) {
      return this.renderBoard();
    } else {
      return this.renderWaitScreen();
    }
  }
}

module.exports = Main;
