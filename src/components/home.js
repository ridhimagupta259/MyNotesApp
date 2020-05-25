import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {colorConstants, imageConstants} from '../config/constant';
import {selectedType} from '../services/Notes/action';
import AddNote from './addNote';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }
  storeData = async () => {
    console.log('hey' + this.props.id);
    const jsonValue = JSON.stringify(this.props.id);
    try {
      await AsyncStorage.setItem('id', jsonValue);
    } catch (error) {
      console.warn('error');
    }
  };
  onClick() {
    this.props.navigation.navigate('DisplayNotes');
    this.props.selectedType(this.state.selectedCategory);
  }
  render() {
    const {
      personalCount,
      workCount,
      ideasCount,
      listCount,
      navigation,
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <View style={styles.myNoteText}>
            <Text style={styles.myStyle}>My </Text>
            <Text style={styles.notesStyle}> Notes</Text>
          </View>
        </View>
        <View style={styles.middleView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedCategory: 'Personal'}, () =>
                this.onClick(),
              );
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Personal</Text>
              <Text style={styles.categoryText}>{personalCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedCategory: 'Work'}, () => this.onClick());
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Work</Text>
              <Text style={styles.categoryText}>{workCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedCategory: 'Ideas'}, () => this.onClick());
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Ideas</Text>
              <Text style={styles.categoryText}>{ideasCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedCategory: 'List'}, () => this.onClick());
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>List</Text>
              <Text style={styles.categoryText}>{listCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Image source={imageConstants.menu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
              <Image source={imageConstants.plus} style={styles.plusImage} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    this.storeData();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.white,
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
const mapStateToProps = state => ({
  id: state.authenticateReducer.id,
  personalCount: state.notesReducer.personalCount,
  workCount: state.notesReducer.workCount,
  ideasCount: state.notesReducer.ideasCount,
  listCount: state.notesReducer.listCount,
});
const mapDispatchToProps = {
  selectedType: selectedType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
