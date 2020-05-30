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
import {createApi} from '../services/Authenticate/action';
import {colorConstants, imageConstants} from '../config/constant';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatpassword: '',
      name: 'Ridhima',
      phonenumber: '9996173124',
      hidePassword: true,
      hideLowerPassword: true,
      emailValidate: true,
      userValidate: true,
      passValidate: true,
    };
  }
  validate(text, type) {
    var userNameRegex = /^\S{4,}$/;
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (type === 'username') {
      if (userNameRegex.test(text)) {
        this.setState({userValidate: true});
        this.setState({username: text});
      } else {
        this.setState({userValidate: false});
      }
    } else if (type === 'password') {
      if (passwordRegex.test(text)) {
        this.setState({passValidate: true});
        this.setState({password: text});
      } else {
        this.setState({passValidate: false});
      }
    } else if (type === 'email') {
      if (emailRegex.test(text)) {
        this.setState({emailValidate: true});
        this.setState({email: text});
      } else {
        this.setState({emailValidate: false});
      }
    }
  }

  render() {
    const {navigation} = this.props.props;
    const {
      username,
      password,
      hideLowerPassword,
      hidePassword,
      name,
      phonenumber,
      emailValidate,
      userValidate,
      passValidate,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView} />
        <View style={styles.middleView}>
          <View style={styles.userLogo}>
            <Image source={imageConstants.camera} />
          </View>
          <View style={emailValidate ? styles.input : styles.notValidated}>
            <TextInput
              style={styles.textbox}
              placeholder={'Email address'}
              placeholderTextColor={colorConstants.grey}
              autoCapitalize="none"
              onChangeText={text => {
                this.validate(text, 'email');
              }}
            />
          </View>
          <View style={userValidate ? styles.input : styles.notValidated}>
            <TextInput
              style={styles.textbox}
              placeholder={'Username'}
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => {
                this.validate(text, 'username');
              }}
            />
          </View>
          <View
            style={
              passValidate ? styles.passwordView : styles.passnotValidated
            }>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => {
                this.validate(text, 'password');
              }}
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
          <View style={styles.passwordView}>
            <TextInput
              placeholder="Repeat Password"
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => this.setState({repeatpassword: text})}
              style={styles.passwordText}
              secureTextEntry={hideLowerPassword}
            />

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  hideLowerPassword: !hideLowerPassword,
                });
              }}>
              <Image source={imageConstants.eye} style={styles.eyeView} />
            </TouchableOpacity>
          </View>
          <View style={styles.signUpView}>
            <TouchableOpacity
              onPress={() => {
                this.props.createApi(
                  username,
                  password,
                  name,
                  phonenumber,
                  (status, response, error) => {
                    if (status) {
                      navigation.navigate('MyDrawer');
                    } else {
                      Alert.alert('Error', 'Wrong Login Credentials');
                    }
                  },
                );
              }}>
              <View style={styles.signUpText}>
                <Image source={imageConstants.tick} style={styles.tickImage} />
                <Text style={styles.signtxt}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.lowerText}>
            <Text style={styles.lowerTextStyle}>Terms of Services</Text>
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
    flex: 7,
    marginHorizontal: 25,
  },
  lowerView: {
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  userLogo: {
    alignItems: 'center',
  },
  passwordView: {
    marginTop: 10,
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
  passwordText: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 15,
    flex: 0.8,
    color: colorConstants.grey,
  },
  signUpView: {
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
  signUpText: {flexDirection: 'row'},
  signtxt: {
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
  input: {
    borderBottomColor: colorConstants.grey,
    borderBottomWidth: 1,
    marginHorizontal: 30,
  },
  notValidated: {
    borderBottomColor: colorConstants.red,
    borderBottomWidth: 1,
    marginHorizontal: 30,
  },
  textbox: {
    fontSize: 20,
    paddingBottom: 10,
    borderBottomColor: colorConstants.white,
    marginTop: 20,
    color: colorConstants.grey,
    height: 40,
  },
  passnotValidated: {
    marginTop: 10,
    marginBottom: 14,
    flexDirection: 'row',
    borderBottomColor: colorConstants.red,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createApi: createApi,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
