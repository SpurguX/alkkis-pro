import React, { Component } from 'react';
import Navbar from './components/navbar';
import Annoslaskuri from './components/annoslaskuri';
import LoggedInContainer from './components/logged_in_container';

class App extends Component {
  render() {
    return (
      <LoggedInContainer />
    );
  }
}

export default App;
