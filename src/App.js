import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import HomeListComponent from './components/homeListComponent';
import DetailComponent from './components/detailComponent';

class App extends Component {

  constructor(props)
    {
        super(props);
        this.state =
        {
            movieID : 2
        }
    }

  changeMovieId(id)
  {
    this.setState({
      movieID : id,
    });
  }

  render() {

    return (
      <BrowserRouter>
          <React.Fragment>
            <NavBar/>
              <main className="justify-content-center">
                <Route exact path='/' component={HomeListComponent}/>
                <Route path='/:id' component={DetailComponent}/>
              </main>
          </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
