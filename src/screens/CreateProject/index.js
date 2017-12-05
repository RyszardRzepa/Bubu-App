import React, { Component } from 'react';
import { RkTextInput } from 'react-native-ui-kitten';
import { View, Dimensions, Alert, Keyboard } from 'react-native';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase';
import { Button } from 'react-native-elements'

const { width } = Dimensions.get('window');

class CreateProject extends Component {
  static navigationOptions = {
    header: false
  };

  state = {
    projectName: '',
    date: '2017-12-05',
  };

  addProject = async () => {
    const { projectName, date } = this.state;
    const db = firebase.firestore();
    let userID = firebase.auth().currentUser.uid;
    try {
      await db.collection('projects').doc(userID).collection('project').add({
        projectName,
        date
      });
      this.props.navigation.navigate('projects')
      Keyboard.dismiss()
    }
    catch (err) {
      console.log(err)
      Keyboard.dismiss()
    }
  };

  showAlert = () => {
    Alert.alert(
      'Do you want to add project?',
      '',
      [
        { text: 'Cancel', onPress: () => console.log, style: 'cancel' },
        { text: 'Add Project', onPress: () => this.addProject() },
      ],
      { cancelable: false }
    )
  };

  render() {
    return (
      <View style={{ paddingTop: '10%', flex: 1, alignItems: 'center' }}>
        <View style={{ width: width * 0.9 }}>
          <RkTextInput
            style={{ marginVertical: 10 }}
            onChangeText={(e) => this.setState({ projectName: e })}
            label='Project Name'
            rkType='success'/>
          <DatePicker
            style={{ width: '100%' }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2017-12-05"
            maxDate="2020-05-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {
              this.setState({ date: date })
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              backgroundColor='#4163FF'
              buttonStyle={{ width: '100%' }}
              color='#fff'
              title='Add Project'
              disabled={!this.state.projectName}
              onPress={this.showAlert}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default CreateProject;