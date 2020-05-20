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
      email: 'ridhima259@gmail.com',
      username: 'abc',
      password: 'abc',
      repeatpassword: 'abc',
      name: 'abc',
      phonenumber: '9996173124',
      hidePassword: true,
      hideLowerPassword: true,
    };
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
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView} />
        <View style={styles.middleView}>
          <View style={styles.userLogo}>
            <Image source={imageConstants.camera} />
          </View>
          <View style={styles.userView}>
            <TextInput
              style={styles.input}
              placeholder={'Email address'}
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => this.setState({email: text})}
            />
          </View>
          <View style={styles.userView}>
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={colorConstants.grey}
              onChangeText={text => this.setState({username: text})}
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
                      navigation.navigate('Home');
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
  userView: {
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    paddingBottom: 10,
    borderBottomColor: colorConstants.grey,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    color: colorConstants.grey,
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
});

const mapStateToProps = state => ({
  //flag: state.homeReducer.homeFlag,
});

const mapDispatchToProps = {
  createApi: createApi,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
