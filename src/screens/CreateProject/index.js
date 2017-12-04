import React, { Component } from 'react';
import { RkButton, RkTextInput } from 'react-native-ui-kitten';
import { View, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase';

const { width } = Dimensions.get('window');

class CreateProject extends Component {
  state = {
    projectName: '',
    date: '2017-12-05'
  };

  addProject () {
    
  };

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ width: width*0.9 }}>
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
            maxDate="2018-05-01"
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
          <RkButton style={{ marginTop: 10 }} rkType='stretch'>Create Project</RkButton>
        </View>
      </View>
    )
  }
}

export default CreateProject;