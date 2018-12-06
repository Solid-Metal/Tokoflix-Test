import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeListComponent from './components/homeListComponent';

class App extends Component {

  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({
      someVar: 'asd'
    })
  }

  render() {

    console.log(this.someVar);

    return (
      <React.Fragment>
        <NavBar/>
          <main className="justify-content-center">
            <HomeListComponent></HomeListComponent>
          </main>
      </React.Fragment>
    );
  }
}

export default App;
