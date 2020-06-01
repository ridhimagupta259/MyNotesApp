import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {colorConstants, imageConstants} from '../config/constant';
import {
  addNote,
  update,
  displayuserNotes,
  countCategory,
} from '../services/Notes/action';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      modalVisible: false,
      title: '',
      data: '',
      category: '',
      count: 0,
    };
  }
  onClick() {
    console.log(this.props.userData);
    console.log(this.props.id);
    this.props.navigation.navigate('DisplayNotes', {
      param1: this.state.selectedCategory,
    });
  }
  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  render() {
    const {personalCount, workCount, ideasCount, listCount, id} = this.props;
    const {modalVisible} = this.state;
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
              this.setState(
                {
                  selectedCategory: 'Personal',
                  count: personalCount,
                },
                () => this.onClick(),
              );
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Personal</Text>
              <Text style={styles.categoryText}>{personalCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState(
                {
                  selectedCategory: 'Work',
                  count: workCount,
                },
                () => this.onClick(),
              );
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Work</Text>
              <Text style={styles.categoryText}>{workCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState(
                {selectedCategory: 'Ideas', count: ideasCount},
                () => this.onClick(),
              );
            }}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Ideas</Text>
              <Text style={styles.categoryText}>{ideasCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedCategory: 'List', count: listCount}, () =>
                this.onClick(),
              );
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
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  category: '',
                });
                this.toggleModal(!modalVisible);
              }}>
              <Image source={imageConstants.plus} style={styles.plusImage} />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          hasBackdrop={true}
          onBackdropPress={this.toggleModal}>
          <View style={styles.ModalMainVIew}>
            <View style={styles.modalinnerView}>
              <View style={styles.titleButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      category: 'Personal',
                    });
                  }}>
                  <Text style={styles.catText}>Personal</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.titleButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      category: 'Work',
                    });
                  }}>
                  <Text style={styles.catText}>Work</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.titleButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      category: 'Ideas',
                    });
                  }}>
                  <Text style={styles.catText}>Ideas</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.titleButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      category: 'List',
                    });
                  }}>
                  <Text style={styles.catText}>List</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalinnerView}>
              <Text style={styles.lineText}>Selected category is:</Text>
              <Text style={styles.lineText}>{this.state.category}</Text>
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.textbox}
                placeholder={'Enter Note'}
                placeholderTextColor={colorConstants.white}
                onChangeText={text => this.setState({data: text})}
              />
            </View>
            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.category && this.state.data) {
                    this.props.addNote(
                      this.state.category,
                      this.state.data,
                      id,
                    );

                    this.props.update(this.state.category);
                  }
                  this.toggleModal(!modalVisible);
                }}>
                <Text style={styles.submitText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    this.props.displayuserNotes(this.props.id);
    try {
      AsyncStorage.setItem('token', this.props.id);
    } catch {
      console.log('Unable to save token');
    }
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
  ModalMainVIew: {
    flex: 0.4,
    backgroundColor: colorConstants.navyblue,
    width: '100%',
  },
  textbox: {
    fontSize: 20,
    paddingBottom: 10,
    borderBottomColor: colorConstants.white,
    marginTop: 20,
    color: colorConstants.white,
    height: 40,
  },
  innerView: {
    marginHorizontal: 20,
  },
  input: {
    borderBottomColor: colorConstants.white,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
  submitButton: {marginHorizontal: 30, marginTop: 20},
  submitText: {
    color: colorConstants.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  catText: {
    color: colorConstants.navyblue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalinnerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  titleButtonView: {
    backgroundColor: colorConstants.white,
    padding: 15,
    borderRadius: 10,
  },
  lineText: {
    color: colorConstants.white,
    fontSize: 20,
  },
});
const mapStateToProps = state => ({
  id: state.authenticateReducer.id,
  personalCount: state.notesReducer.personalCount,
  workCount: state.notesReducer.workCount,
  ideasCount: state.notesReducer.ideasCount,
  listCount: state.notesReducer.listCount,
  userData: state.notesReducer.userData,
});
const mapDispatchToProps = {
  addNote: addNote,
  update: update,
  displayuserNotes: displayuserNotes,
  countCategory: countCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
