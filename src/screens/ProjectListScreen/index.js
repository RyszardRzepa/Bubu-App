import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

class ProjectListScreen extends Component {
  static navigationOptions = {
    header: false
  };

  state = {
    projects: null
  };

  componentDidMount() {
    let _this = this;
    const userId = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const ref = db.collection('projects').doc(userId).collection('project')
    ref.onSnapshot(snap => {
      let projects = [];
      snap.forEach(function (doc) {
        projects.push(doc.data());
      });
      _this.setState({ projects });
    })
  }

  renderProjects() {
    if (this.state.projects)
      return this.state.projects.map((project, i) => {
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('add_receipt')}
            key={i}
          >
          <View
            style={{
              backgroundColor: '#d1d1d1',
              width: width * 0.4,
              height: width * 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}>
              <View style={{ justifyContent: 'space-between' }}>
                <Text>{project.projectName}</Text>
                <Text>{project.date}</Text>
              </View>
          </View>
          </TouchableOpacity>
        )
      })
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', padding: 10, paddingTop: '10%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {this.renderProjects()}
      </View>
    )
  }
}

export default ProjectListScreen;
