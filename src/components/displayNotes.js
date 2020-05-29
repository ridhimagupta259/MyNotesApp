import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {colorConstants, imageConstants} from '../config/constant';
import {displayuserNotes} from '../services/Notes/action';

class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }
  render() {
    const {param1, param2} = this.props.route.params;
    const {userData} = this.props;
    var newdata = userData.filter(item => {
      if (item.title === param1) {
        return item;
      }
    });
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <View style={styles.back}>
            <Image source={imageConstants.backarrow} />
            <Text style={styles.backText}>My Notes</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.upperView}>
          <View style={styles.titleText}>
            <Text style={styles.titleStyle}>{param1} </Text>
            <Text style={styles.countStyle}> {param2}</Text>
          </View>
        </View>
        <View style={styles.flatlistview}>
          <FlatList
            data={newdata}
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.textEdit}>
                    <Text style={styles.uppertext}>{item.data}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    this.props.displayuserNotes(this.props.id);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.white,
  },
  upperView: {
    flex: 0.3,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  titleText: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colorConstants.red,
  },
  countStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colorConstants.red,
  },
  back: {
    flexDirection: 'row',
  },
  backText: {
    color: colorConstants.navyblue,
    fontSize: 20,
    fontWeight: '500',
  },
  flatlistview: {marginHorizontal: 20},
  uppertext: {fontWeight: 'bold', fontSize: 17},
  textEdit: {
    //width: '100%',
    height: 100,
    backgroundColor: colorConstants.white,
    padding: 20,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: colorConstants.black,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 6.32,

    elevation: 1,
  },
});
const mapStateToProps = state => ({
  userData: state.notesReducer.userData,
  id: state.authenticateReducer.id,
});
const mapDispatchToProps = {
  displayuserNotes: displayuserNotes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayNotes);
