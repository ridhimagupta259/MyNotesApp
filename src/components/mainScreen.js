import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Login from './login';
import Signup from './signUp';
import {colorConstants} from '../config/constant';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }
  render() {
    const {toggle} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <TouchableOpacity>
            <Text style={styles.logInStyle}>
              {toggle ? <Text>Login</Text> : <Text>Sign Up</Text>}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                toggle: !toggle,
              });
            }}>
            <Text style={styles.signUpStyle}>
              {toggle ? <Text>Sign Up</Text> : <Text>Login</Text>}
            </Text>
          </TouchableOpacity>
        </View>

        {toggle ? <Login props={this.props} /> : <Signup props={this.props} />}
      </SafeAreaView>
    );
  }
  componentDidMount() {}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.white,
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
    color: colorConstants.grey,
    fontSize: 20,
    marginTop: 10,
  },
});
export default MainScreen;
