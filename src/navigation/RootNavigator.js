import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Platform, } from 'react-native';

import CreateProjectScreen from '../screens/CreateProject';
import ProjectListScreen from '../screens/ProjectListScreen';
import AuthScreen from '../screens/AuthScreen';
import RegisterUserAccount from '../components/RegisterAccountComponent';
import AddReceiptScreen from '../screens/AddReceiptScreen';

class RootNavigator extends React.Component {
  render() {
    const TabNav = TabNavigator({
      add_project: { screen: CreateProjectScreen },
      projects: { screen: ProjectListScreen }
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? 'blue' : '#fff',
        inactiveTintColor: Platform.OS === 'android' ? '#f4f4f4' : 'red',
        indicatorStyle: { backgroundColor: '#fff' },
      }, lazy: true,
    });

    const MainNavigator = StackNavigator({
      auth: { screen: AuthScreen },
      register_user: { screen: RegisterUserAccount },
      main: { screen: TabNav },
      add_receipt: { screen: AddReceiptScreen }
    }, {
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#60ABF8',
        },
        lazy: true,
        tabBarVisible: false,
      },
      headerMode: 'screen',
    });

    return (
      <MainNavigator/>
    );
  }
}

export default RootNavigator;