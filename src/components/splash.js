import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {colorConstants} from '../config/constant';
import {toggleSplash} from '../services/Authenticate/action';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>My Notes Application</Text>
      </View>
    );
  }
  getData = () => {
    AsyncStorage.getItem('token').then(value => {
      console.log('token', value);

      if (value != null) {
        this.props.toggleSplash(value);
        this.props.navigation.navigate('MyDrawer');
      } else {
        this.props.navigation.navigate('MainScreen');
      }
    });
  };
  componentDidMount() {
    this.getData();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstants.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => ({
  id: state.authenticateReducer.id,
});

const mapDispatchToProps = {
  toggleSplash: toggleSplash,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
