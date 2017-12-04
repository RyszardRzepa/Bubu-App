import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import RootNavigator from './src/navigation/RootNavigator';

const config = {
  apiKey: "AIzaSyB-TrBjwQhZ8ybpUz9l8-fCwzInxzl7AWQ",
  authDomain: "bubuapp-3f350.firebaseapp.com",
  databaseURL: "https://bubuapp-3f350.firebaseio.com",
  projectId: "bubuapp-3f350",
  storageBucket: "bubuapp-3f350.appspot.com",
  messagingSenderId: "242693214456"
};

firebase.initializeApp(config);
require("firebase/firestore");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
