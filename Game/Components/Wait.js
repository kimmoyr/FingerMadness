import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Wait extends Component {
  render() {
    const color = this.props.winner ? this.props.winner.color : '#000000';
    return (
      <View style={[styles.container, { backgroundColor: color}]}>
        <Text style={styles.waitText}>Get ready for round {this.props.round}!</Text>
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
  waitText: {
    color: '#ffffff',
    fontSize: 30
  }
});

module.exports = Wait;
