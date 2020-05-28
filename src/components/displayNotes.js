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
import {colorConstants, imageConstants} from '../config/constant';

class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      newdata: [
        {value: 'Personal'},
        {value: 'Ideas'},
        {value: 'Work'},
        {value: 'Lists'},
      ],
    };
  }
  render() {
    const {param1, param2} = this.props.route.params;
    const {navigation} = this.props;
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
            data={this.state.newdata}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Search');
                  }}>
                  <View style={styles.textEdit}>
                    <Text style={styles.uppertext}>{item.value}</Text>
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
  componentDidMount() {}
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
export default DisplayNotes;
