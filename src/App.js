import React, { Component } from 'react';
import Navbar from './components/navbar';
import Annoslaskuri from './components/annoslaskuri';

class App extends Component {
  render() {
    return (
      <div id="main" className="container">
        <Navbar />
        <Annoslaskuri />
      </div>
    );
  }
}

export default App;
