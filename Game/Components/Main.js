import React, {
  BackAndroid,
  Component
} from 'react-native';


import Board from './Board';
import Wait from './Wait';
import Start from './Start';

const ROUND_START_DELAY = 3000;
const ROUNDS = 5;

const players = [
  {
    id: 1,
    color: '#ec3a3a',
    pressedColor: '#eb8e8e'
  },
  {
    id: 2,
    color: '#1e30cf',
    pressedColor: '#7c84d0'
  }
];

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameOn: false,
      showBoard: false,
      round: 0,
      scores: {},
      lastWinner: null,
      gameWinner: null
    };

    for (var player of players) {
      this.state.scores[player.id] = 0;
    }

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (!this.state.gameOn) {
         return false;
      }

      this.finishGame();
      return true;
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  reset() {
    const state = this.state;
    state.round = 0;
    state.lastWinner = null;
    state.gameWinner = null;

    for (var player of players) {
      state.scores[player.id] = 0;
    }

    this.setState(state);
  }

  startPressed() {
    this.reset();
    this.showNewBoardAfterDelay();
  }

  finishGame() {
    clearTimeout(this.timer);

    const state = this.state;
    state.gameOn = false;
    state.showBoard = false;
    state.round = 0;

    let bestScore = -1;
    for (var player of players) {
      if (this.state.scores[player.id] > bestScore) {
        state.gameWinner = player;
      }
    }

    this.setState(state);
  }

  onAllPressedForPlayer(player) {
    const state = this.state;
    state.scores[player.id]++;
    state.showBoard = false;
    state.lastWinner = player;
    this.setState(state);

    if (this.state.round < ROUNDS) {
      this.showNewBoardAfterDelay();
    } else {
      this.finishGame();
    }
  }

  showNewBoardAfterDelay() {
    const state = this.state;
    state.gameOn = true;
    state.round++;
    this.setState(state);
    this.timer = setTimeout(this.showNewBoard.bind(this), ROUND_START_DELAY);
  }

  showNewBoard(winner) {
    this.setState({
      gameOn: true,
      showBoard: true,
      round: this.state.round,
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
    return <Wait winner={this.state.lastWinner} round={this.state.round}/>;
  }

  renderStart() {
    return (
      <Start
       players={players}
       scores={this.state.gameWinner != null ? this.state.scores : null}
       onStartPressed={() => this.startPressed()} />
    );
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
