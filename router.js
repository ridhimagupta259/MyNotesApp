import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/components/login';
import SignUp from './src/components/signUp';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/services/rootreducer';
import MainScreen from './src/components/mainScreen';
import Home from './src/components/home';
import DarkMode from './src/components/darkMode';
import DM from './src/components/dm';
import Logout from './src/components/logout';
import Splash from './src/components/splash';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function myDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="DM" component={DM} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

function myApp() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="SignUp"
            component={SignUp}
          /> */}
          <Stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MyDrawer"
            component={myDrawer}
          />
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default myApp;
