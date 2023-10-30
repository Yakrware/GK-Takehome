import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '~/utils/types';
import {Home} from '../screens/Home';
import {Search} from '../screens/Search';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GithubSearchTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(245,248,250)',
  },
};

export const MainNavigator = () => {
  return (
    <NavigationContainer theme={GithubSearchTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="Search"
          options={{headerShown: false}}
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
