import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Button, Icon } from 'react-native-elements'

const { width } = Dimensions.get('window');

export default class AddReceiptScreen extends Component {
  static navigationOptions = {
    title: 'Add Receipt'
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageUri: '',
    cameraActive: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        this.setState({ imageUri: data.uri });
        this.showAlert()
        console.log(data)
      });
    }
  };

  showAlert = () => {
    Alert.alert(
      'Do you want to add receipt?',
      '',
      [
        { text: 'Cancel', onPress: () => console.log, style: 'cancel' },
        { text: 'Add Project', onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  };

  showCamera = () => {
    if (this.state.cameraActive) {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View/>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera
              ref={ref => this.camera = ref}
              style={{ flex: 1 }}
              type={this.state.type}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0)',
                  flex: 1,
                }}>
                {this.state.imageUri ? <Image
                    style={{ width: width *0.45, height: width *0.45 }}
                    source={{ uri: this.state.imageUri }}/>
                  : null
                }
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 20
                  }}
                  onPress={this.takePicture}
                >
                  <Icon
                    reverse
                    name='camera'
                    type='MaterialIcons'
                    color='#517fa4'
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.cameraActive ?
          this.showCamera() :
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <Button
              backgroundColor='#4163FF'
              buttonStyle={{ borderRadius: 30, margin: 20 }}
              color='#fff'
              title='Add Receipt'
              onPress={() => this.setState({ cameraActive: true })}
            />
          </View>
        }
      </View>
    )
  }
}