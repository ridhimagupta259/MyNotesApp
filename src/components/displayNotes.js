import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {colorConstants, imageConstants} from '../config/constant';
import {deleteNotes, deleteUpdate} from '../services/Notes/action';

class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.opacity = 0;
    this.animatedValue = new Animated.Value(this.opacity);
    this.state = {
      toggle: true,
    };
  }
  animate = () => {
    this.opacity = this.opacity === 0 ? 1 : 0;
    Animated.timing(this.animatedValue, {
      toValue: this.opacity,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  render() {
    const {param1} = this.props.route.params;
    const {
      userData,
      personalCount,
      workCount,
      ideasCount,
      listCount,
    } = this.props;
    var count;
    var newdata = userData.filter(item => {
      if (item.title === param1) {
        return item;
      }
    });
    if (param1 === 'Personal') {
      var count = personalCount;
    }
    if (param1 === 'Work') {
      var count = workCount;
    }
    if (param1 === 'Ideas') {
      var count = ideasCount;
    }
    if (param1 === 'List') {
      var count = listCount;
    }
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
            <Text style={styles.countStyle}> {count}</Text>
          </View>
        </View>
        <View style={styles.flatlistview}>
          <FlatList
            data={newdata}
            renderItem={({item}) => {
              return (
                <View style={styles.textEdit}>
                  <View>
                    <Text style={{color: colorConstants.red}}>
                      {item.createdDate.slice(0, 10)}
                      <Text style={{color: colorConstants.red}}> at </Text>
                      {item.createdDate.slice(11, 16)}
                    </Text>
                    <View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.deleteNotes(
                            this.props.id,
                            item.id,
                            item.title,
                          );
                        }}>
                        <Image source={imageConstants.bluecross} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ViewNote', {
                        data: item.data,
                      })
                    }>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        color: colorConstants.navyblue,
                        fontWeight: 'bold',
                        opacity: this.animatedValue,
                        transform: [
                          {
                            translateY: this.animatedValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 20],
                            }),
                          },
                        ],
                      }}
                      ellipsizeMode="tail"
                      numberOfLines={2}>
                      {item.data}
                    </Animated.Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    this.animate();
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
  flatlistview: {marginHorizontal: 20, flex: 2},
  textEdit: {
    height: 130,
    backgroundColor: colorConstants.white,
    padding: 20,
    marginVertical: 8,
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
  ideasCount: state.notesReducer.ideasCount,
  personalCount: state.notesReducer.personalCount,
  workCount: state.notesReducer.workCount,
  listCount: state.notesReducer.listCount,
});
const mapDispatchToProps = {
  deleteNotes: deleteNotes,
  deleteUpdate: deleteUpdate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayNotes);
