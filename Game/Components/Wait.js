import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

class Wait extends Component {
  render() {
    const color = this.props.winner ? this.props.winner.color : '#000000';
    return <View style={[styles.container, { backgroundColor: color}]}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});

module.exports = Wait;
