import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Start extends Component {
  render() {
    const color = this.props.winner ? this.props.winner.color : '#000000';
    return (
      <View style={[styles.container, { backgroundColor: color}]}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={this.props.onStartPressed}>
          <Text style={styles.startText}>Start</Text>
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

  }
});

module.exports = Start;
