import React from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import AsyncStorage from '@react-native-community/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/services/rootreducer';
import MainScreen from './src/components/mainScreen';
import Home from './src/components/home';
import DM from './src/components/dm';
//import Splash from './src/components/splash';
import DisplayNotes from './src/components/displayNotes';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function myDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="DM" component={DM} />
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          logout();
          props.navigation.navigate('MainScreen');
        }}
      />
    </DrawerContentScrollView>
  );
}
const logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.warn('error while logging out');
  }
};

function myApp() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={Splash}
          /> */}
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
          <Stack.Screen
            options={{headerShown: false}}
            name="DisplayNotes"
            component={DisplayNotes}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default myApp;
