import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {colorConstants} from '../config/constant';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
  getData = async () => {
    const {navigation} = this.props;
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MyDrawer'}],
        });
      }
      if (value === null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainScreen'}],
        });
      }
    } catch (error) {
      console.log('no data');
    }
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
});
const mapStateToProps = state => ({
  id: state.authenticateReducer.id,
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
