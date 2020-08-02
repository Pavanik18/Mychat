import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';

const AuthStackNavigator = createStackNavigator({
    Login: {
    screen:Login,
    },
    Home: {
    screen:Home,
    },
}, { headerMode: 'none'});
const SwitchNavigator = createStackNavigator(
{
    AuthLoading:AuthStackNavigator
},
{
initialRouteName: 'AuthLoading',
},
);
const Navigation=createAppContainer(SwitchNavigator);
export default Navigation;