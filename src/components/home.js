import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <SafeAreaView style={styles.container} />;
  }
  componentDidMount() {}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upperView: {
    marginTop: 40,
    marginHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logInStyle: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  signUpStyle: {
    color: 'grey',
    fontSize: 20,
    marginTop: 10,
  },
});
export default MainScreen;
