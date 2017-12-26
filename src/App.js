import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common/header';
import { LoginForm } from './components/LoginForm';
import Button from './components/common/Button';
import { Spinner } from './components/common/Spinner';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCIaE49uPhswHY1fuU6jbExGAZ49lRs69k",
      authDomain: "authentication-6e7c2.firebaseapp.com",
      databaseURL: "https://authentication-6e7c2.firebaseio.com",
      projectId: "authentication-6e7c2",
      storageBucket: "authentication-6e7c2.appspot.com",
      messagingSenderId: "470866363114"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="AUTHENTICATION" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
