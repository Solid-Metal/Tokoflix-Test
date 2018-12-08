import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: 0
    };

    this.addReload = this.addReload.bind(this);
  }

  componentWillReceiveProps() {
    this.addReload();
  }

  addReload() {
    this.setState(
      {
        reload: this.state.reload + 1
      },
      () => {}
    );
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <a className="navbar-brand" href="#">
            <h1 className='display-4 text-light'>
                TokoFlix
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link btn btn-outline-light" exact to={"/"}>
                Now Playing !
              </NavLink>
              <NavLink className="nav-item nav-link btn btn-outline-light ml-3" exact to={"/allmovies"}>
                All Movies !
              </NavLink>
            </div>
          </div>

          <h2>
            {" "}
            <span className="text-light">Welcome, User</span> |{" "}
            <span className="fa fa-money text-warning" />{" "}
            <CurrencyFormat
              className="text-warning"
              value={localStorage.getItem("money")}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp."}
            />
          </h2>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
