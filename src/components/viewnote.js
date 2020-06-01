import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colorConstants, imageConstants} from '../config/constant';

class ViewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }
  render() {
    const {data} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <View style={styles.back}>
            <Image source={imageConstants.backarrow} />
            <Text style={styles.backText}>Go Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.upperView}>
          <Text style={styles.textStyle}>Selected Note is :</Text>
        </View>
        <View style={styles.lowerView}>
          <Text>{data}</Text>
        </View>
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
    flex: 2,
    justifyContent: 'center',
  },
  lowerView: {
    flex: 8,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colorConstants.navyblue,
  },
  back: {
    flexDirection: 'row',
  },
  backText: {
    color: colorConstants.navyblue,
    fontSize: 20,
    fontWeight: '500',
  },
});
export default ViewNote;
