import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Start extends Component {

  renderScores() {
    const result = [];

    for (var playerId in this.props.scores) {
      const color = {
        color: this.props.players[playerId - 1].color
      };

      result.push(
        <Text style={[styles.score, color]}>
          {this.props.scores[playerId]}
        </Text>
      );
    }

    return (
      <View style={styles.scoreContainer}>
        {result}
      </View>
    );
  }

  render() {
    const color = this.props.winner ? this.props.winner.color : '#000000';
    return (
      <View style={[styles.container, { backgroundColor: color}]}>
        {this.props.scores && this.renderScores()}
        <TouchableOpacity
          style={styles.startButton}
          onPress={this.props.onStartPressed}>
          <Text style={styles.startText}>Start Game</Text>
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
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  score: {
    margin: 60,
    fontSize: 90,
    fontWeight: 'bold'
  }
});

module.exports = Start;
