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
import DM from './dm';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <View style={styles.myNoteText}>
            <Text style={styles.myStyle}>My </Text>
            <Text style={styles.notesStyle}> Notes</Text>
          </View>
        </View>
        <View style={styles.middleView}>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>Personal</Text>
            <Text style={styles.categoryText}>0</Text>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>Work</Text>
            <Text style={styles.categoryText}>0</Text>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>Ideas</Text>
            <Text style={styles.categoryText}>0</Text>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>List</Text>
            <Text style={styles.categoryText}>0</Text>
          </View>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Image source={imageConstants.menu} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={imageConstants.plus} style={styles.plusImage} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DM.theme === 'dark' ? '#000' : '#fff',
  },
  upperView: {
    flex: 2,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  middleView: {
    flex: 6,
    marginHorizontal: 20,
  },
  lowerView: {
    flex: 2,
    marginHorizontal: 20,
  },
  myNoteText: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  myStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colorConstants.red,
  },
  notesStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colorConstants.navyblue,
  },
  categoryView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryText: {
    fontSize: 35,
    color: colorConstants.navyblue,
    fontWeight: 'bold',
  },
  imageView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plusImage: {
    height: 60,
    width: 60,
  },
});
export default Home;
