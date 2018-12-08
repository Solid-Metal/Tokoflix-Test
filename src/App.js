import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter } from "react-router-dom";
import HomeListComponent from "./components/homeListComponent";
import DetailComponent from "./components/detailComponent";
import CompleteMovieListComponent from "./components/completeMovieListComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      reload: 0
    };
  }

  setReload(test) {
    this.setState(
      {
        reload: test
      },
      () => {
        this.forceUpdate();
      }
    );
    console.log(this.state.reload);
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <NavBar reload={this.state.reload} />
            <main className="justify-content-center">
              <Route exact path="/" component={HomeListComponent} />
              <Route
                exact
                path="/?:search=:page"
                component={HomeListComponent}
              />
              <Route
                exact
                path="/allmovies/"
                render={props => <CompleteMovieListComponent {...props} />}
              />
              <Route
                exact
                path="/allmovies/:search=:page"
                render={props => <CompleteMovieListComponent {...props} />}
              />
              <Route
                exact
                path="/:id-:slug"
                render={props => (
                  <DetailComponent
                    {...props}
                    callback={this.setReload.bind(this)}
                  />
                )}
              />
            </main>
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
