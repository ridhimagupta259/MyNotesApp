import React from 'react';
//import useDarkMode from './darkMode';
import {useState} from 'react';

import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

export default () => {
  const [theme, toggleTheme] = useState('Light');
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (theme === 'light') {
              toggleTheme('dark');
            } else {
              toggleTheme('light');
            }
          }}>
          <Text style={{color: theme === 'dark' ? '#fff' : '#000'}}>click</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
