import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  authenticateApi,
  toggleSplash,
  initUser,
} from '../services/Authenticate/action';
import {colorConstants, imageConstants} from '../config/constant';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hidePassword: true,
      usernameValidate: true,
    };
  }
  validate(text, type) {
    var reg = /^\S{4,}$/;
    if (type === 'username') {
      if (reg.test(text)) {
        this.setState({usernameValidate: true});
        this.setState({username: text});
      } else {
        this.setState({usernameValidate: false});
      }
    }
  }
  fbLogin() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          // AccessToken.getCurrentAccessToken().then(data => {
          //   const {accessToken} = data;
          //   initUser(accessToken);
          // });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  render() {
    const {navigation} = this.props.props;
    const {username, password, hidePassword, usernameValidate} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView} />
        <View style={styles.middleView}>
          <View style={styles.userLogo}>
            <Image source={imageConstants.user} />
          </View>
          <View style={usernameValidate ? styles.input : styles.notValidated}>
            <TextInput
              style={styles.textbox}
              placeholder={'Username or email address'}
              placeholderTextColor={colorConstants.grey}
              autoCapitalize="none"
              onChangeText={text => {
                this.validate(text, 'username');
              }}
            />
          </View>
          <View style={styles.passwordView}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => this.setState({password: text})}
              style={styles.passwordText}
              secureTextEntry={hidePassword}
            />

            <TouchableOpacity
              onPress={() => {
                this.setState({hidePassword: !hidePassword});
              }}>
              <Image source={imageConstants.eye} style={styles.eyeView} />
            </TouchableOpacity>
          </View>
          <View style={styles.crossImage}>
            <Image source={imageConstants.cross} />
          </View>
          <View style={styles.logInView}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.username && this.state.password) {
                  this.props.authenticateApi(
                    username,
                    password,
                    (status, response, error) => {
                      if (status) {
                        navigation.navigate('MyDrawer');
                      } else {
                        Alert.alert('Error', 'Wrong Login Credentials');
                      }
                    },
                  );
                } else {
                  Alert.alert('Error', 'Wrong Login Credentials');
                }
              }}>
              <View style={styles.logInText}>
                <Image source={imageConstants.tick} style={styles.tickImage} />
                <Text style={styles.logtxt}>LOG IN</Text>
              </View>
              {this.props.loading ? (
                <ActivityIndicator size="large" color={colorConstants.blue} />
              ) : null}
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
                  source={imageConstants.gplusicon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={imageConstants.giticon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.iconStyle}
                  source={imageConstants.twittericon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.fbLogin()}>
                <Image
                  style={styles.iconStyle}
                  source={imageConstants.fbicon}
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
    backgroundColor: colorConstants.white,
    flex: 1,
  },
  upperView: {
    flex: 1,
    flexDirection: 'row',
  },
  middleView: {
    flex: 6,
    marginHorizontal: 25,
  },
  lowerView: {
    flex: 2,
  },
  loginView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLogo: {
    alignItems: 'center',
  },
  userView: {
    marginTop: 20,
  },
  passwordView: {
    marginTop: 20,
    marginBottom: 14,
    flexDirection: 'row',
    borderBottomColor: colorConstants.grey,
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
    color: colorConstants.grey,
  },
  logInView: {
    backgroundColor: colorConstants.white,
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: colorConstants.black,
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
    color: colorConstants.blue,
    paddingVertical: 13,
    fontWeight: '600',
  },
  tickImage: {marginTop: 10, marginRight: 10},
  lowerText: {alignItems: 'center'},
  lowerTextStyle: {
    color: colorConstants.grey,
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
  input: {
    borderBottomColor: colorConstants.grey,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
  notValidated: {
    borderBottomColor: colorConstants.red,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
  textbox: {
    fontSize: 20,
    paddingBottom: 10,
    borderBottomColor: colorConstants.white,
    marginTop: 20,
    color: colorConstants.grey,
    height: 40,
  },
});

const mapStateToProps = state => ({
  loading: state.authenticateReducer.loading,
});

const mapDispatchToProps = {
  authenticateApi: authenticateApi,
  toggleSplash: toggleSplash,
  initUser: initUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
