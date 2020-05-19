import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {authenticateApi} from '../services/Authenticate/action';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'nd',
      password: 'wd',
      hidePassword: true,
    };
  }

  render() {
    const {navigation, flag} = this.props;
    const {username, password} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <View style={styles.loginView}>
            <TouchableOpacity>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginView}>
            <TouchableOpacity>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleView}>
          <View style={styles.userLogo}>
            <Image source={require('../assets/user.png')} />
          </View>
          <View style={styles.userView}>
            <TextInput
              style={styles.input}
              placeholder={'Username or email address'}
              placeholderTextColor="grey"
              onChangeText={text => this.setState({username: text})}
            />
          </View>
          <View style={styles.passwordView}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({password: text})}
              style={styles.passwordText}
              secureTextEntry={this.state.hidePassword}
            />

            <TouchableOpacity
              onPress={() => {
                this.setState({hidePassword: !this.state.hidePassword});
              }}>
              <Image
                source={require('../assets/eye.png')}
                style={styles.eyeView}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.crossImage}>
            <Image source={require('../assets/cross.png')} />
          </View>
          <View style={styles.logInView}>
            <TouchableOpacity
              onPress={() => {
                this.props.authenticateApi(
                  username,
                  password,
                  (status, response, error) => {
                    if (status) {
                      navigation.navigate('MainScreen');
                    } else {
                      Alert.alert('Error', 'Wrong Login Credentials');
                    }
                  },
                );
              }}>
              <View style={styles.logInText}>
                <Image
                  source={require('../assets/tick.png')}
                  style={styles.tickImage}
                />
                <Text style={styles.logtxt}>LOG IN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.lowerText}>
            <Text style={styles.lowerTextStyle}>Login with</Text>
            <View style={styles.iconsView}>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/gplusicon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/giticon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/twittericon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/fbicon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  upperView: {
    flex: 2,
    flexDirection: 'row',
  },
  middleView: {
    //backgroundColor: 'grey',
    flex: 6,
    marginHorizontal: 25,
  },
  lowerView: {
    //backgroundColor: 'blue',
    flex: 2,
  },
  loginView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  userLogo: {
    alignItems: 'center',
  },
  userView: {
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    color: 'grey',
  },
  passwordView: {
    marginTop: 20,
    marginBottom: 14,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  eyeView: {
    marginTop: 15,
  },
  crossImage: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  passwordText: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 15,
    flex: 0.8,
    color: 'grey',
  },
  logInView: {
    backgroundColor: '#fff',
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logInText: {flexDirection: 'row'},
  logtxt: {
    fontSize: 20,
    color: '#7381c4',
    paddingVertical: 13,
    fontWeight: '600',
  },
  tickImage: {marginTop: 10, marginRight: 10},
  lowerText: {alignItems: 'center'},
  lowerTextStyle: {
    color: 'grey',
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconStyle: {
    height: 70,
    width: 70,
    marginHorizontal: 10,
  },
});

const mapStateToProps = state => ({
  //flag: state.homeReducer.homeFlag,
});

const mapDispatchToProps = {
  authenticateApi: authenticateApi,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
