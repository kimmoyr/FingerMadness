import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

class Wait extends Component {
  render() {
    return <View style={styles.container}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});

module.exports = Wait;
