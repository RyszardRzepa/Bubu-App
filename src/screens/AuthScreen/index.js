import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RkButton, RkTextInput, RkText } from 'react-native-ui-kitten';
import firebase from 'firebase';

class ProjectListScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentDidMount() {
    let _this = this;

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        _this.props.navigation.navigate('main')
      }
    })
  }

  state = {
    email: '',
    password: '',
    isLoading: false
  };

  loginUser = async () => {
    const { email, password } = this.state;
    try {
      await this.setState({ isLoading: true });
      await firebase.auth().signInWithEmailAndPassword(email, password)
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
            onPress={this.loginUser}
            style={{ width: '100%', height: 50 }}
            rkType='rounded'
          >
            Login
          </RkButton>}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('register_user')}>
          <RkText style={{ textAlign: 'center', padding: 20 }}>register new account </RkText>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProjectListScreen;
