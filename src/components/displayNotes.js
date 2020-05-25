
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colorConstants} from '../config/constant';

class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }
  render() {
    const {toggle} = this.state;
    return <SafeAreaView style={styles.container} />;
  }
  componentDidMount() {}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.white,
  },
});
export default DisplayNotes;
