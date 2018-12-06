import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeListComponent from './components/homeListComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
          <main className="container col-xs-1 center-block">
            <HomeListComponent></HomeListComponent>
          </main>
      </React.Fragment>
    );
  }
}

export default App;
