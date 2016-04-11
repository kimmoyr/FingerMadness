import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Start extends Component {

  renderPlayers() {
    const result = [];

    for (var player of this.props.players) {
      const color = {
        color: player.color
      };

      result.push(
        <View key={player.id} style={styles.playerContainer}>
          <Text style={[styles.playerId, color]}>
            P{player.id}
          </Text>
          <Text style={[styles.score, color]}>
            {this.props.scores && this.props.scores[player.id]}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.scoreContainer}>
        {result}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameTitle}>
          <Text style={styles.gameTitleText}>Finger Madness</Text>
        </View>
        {this.renderPlayers()}
        <TouchableOpacity
          style={styles.startButton}
          onPress={this.props.onStartPressed}>
          <Text style={styles.startText}>Start Game</Text>
          <Text style={styles.instructionText}>Touch all tiles of your color at the same to win a round!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gameTitle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameTitleText: {
    color: '#ffffff',
    fontSize: 35,
  },
  startButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  instructionText: {
    color: '#8f8f8f',
    fontSize: 20,
    margin: 30
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerContainer: {
    margin: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerId: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  score: {
    fontSize: 90,
    fontWeight: 'bold'
  }
});

module.exports = Start;
