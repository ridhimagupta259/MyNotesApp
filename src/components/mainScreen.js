import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
//import {connect} from 'react-redux';
import Login from './login';
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, flag} = this.props;
    return <SafeAreaView>{/* <Login /> */}</SafeAreaView>;
  }
  componentDidMount() {}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3DFDE',
    flex: 1,
  },
});

// const mapStateToProps = state => ({
//   //flag: state.homeReducer.homeFlag,
// });

// const mapDispatchToProps = state => ({
//   //toggleHomeFlag: toggleFlag,
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Home);
export default MainScreen;
