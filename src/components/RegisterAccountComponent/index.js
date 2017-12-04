import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RkButton, RkTextInput, RkText } from 'react-native-ui-kitten';
import firebase from 'firebase';

class ProjectListScreen extends Component {
  static navigationOptions = {
    title: 'Register Account'
  };

  state = {
    email: '',
    password: '',
    isLoading: false
  };

  registerUserAccount = async () => {
    const { email, password } = this.state;
    const db = firebase.firestore();
    try {
      this.setState({ isLoading: true });

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await db.collection("users").add({
        email,
        registration_date: Date.now()
      });

      this.setState({ isLoading: false })
    }
    catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        <RkTextInput keyboardType='email-address' onChangeText={(email) => this.setState({ email })} rkType='rounded'
                     placeholder='Email'/>
        <RkTextInput secureTextEntry onChangeText={(password) => this.setState({ password })} rkType='rounded'
                     placeholder='Password'/>
        {this.state.isLoading ?
          <ActivityIndicator/> :
          <RkButton
            onPress={this.registerUserAccount}
            style={{ width: '100%', height: 50 }}
            rkType='rounded'
          >
            Register
          </RkButton>}
      </View>
    )
  }
}

export default ProjectListScreen;
