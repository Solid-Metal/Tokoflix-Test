import React, { Component } from "react";
import moment from "moment";
import "../css/additionalDetailStyle.css";
import helper from "../misc/helper";
import CurrencyFormat from "react-currency-format";
import { NavLink } from "react-router-dom";

class CompleteMovieListComponent extends Component {
  date = moment().format("YYYY-MM-DD");
  dateprev = moment()
    .subtract(1, "month")
    .format("YYYY-MM-DD");
  id = "";

  linkToFetch = "";

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      page:
        this.props.match.params.page === undefined
          ? 1
          : this.props.match.params.page,
      nextEnabled: false,
      prevEnabled: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log(this.props.match.params);
    this.linkToFetch =
      "https://api.themoviedb.org/3/discover/movie?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
      this.state.page;
    fetch(this.linkToFetch)
      .then(result => result.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  forceUpdate() {
    this.setState(
      {
        page: parseInt(this.state.page) + 1
      },
      () => {
        this.fetchData();
      }
    );
  }

  forceUpdateBack() {
    this.setState(
      {
        page: parseInt(this.state.page) - 1
      },
      () => {
        this.fetchData();
      }
    );
  }

  render() {
    let { isLoaded, items, page } = this.state;
    let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

    if (!isLoaded) {
      return (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <i className="fa fa-spinner fa-spin fa-5x" />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <a className="navbar-brand d-flex justify-content-center" href="#">
            <h1 className="display-4 text-dark">All Movies !</h1>
          </a>
          <div className="container mt-5">
            <div className="row justify-content-md-center">
              <div className="col">
                <NavLink
                  id="fixedbuttonleft"
                  className="btn btn-outline-primary btn-lg fa fa-arrow-circle-left"
                  hidden={page <= 1}
                  onClick={this.forceUpdateBack.bind(this)}
                  exact
                  to={"/allmovies/page=" + page}
                />
              </div>
              <div className="col-10">
                <div className="row d-flex justify-content-center">
                  {items.results.map(item => (
                    <React.Fragment key={item.id}>
                      <div className="card  mx-0" style={this.imgStyle}>
                        <img
                          className="card-img-left"
                          src={imageLink + item.poster_path}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <h6 className="card-title" style={this.priceStyle}>
                            <CurrencyFormat
                              value={helper.checkPrice(items.vote_average)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp."}
                            />
                          </h6>
                          <NavLink
                            className="btn btn-primary"
                            exact
                            to={
                              "/" +
                              item.id +
                              "-" +
                              helper.replaceSpace(item.title)
                            }
                          >
                            DETAIL
                          </NavLink>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="col">
                <NavLink
                  id="fixedbuttonright"
                  className="btn btn-outline-primary btn-lg fa fa-arrow-circle-right"
                  hidden={items.results.length < 20}
                  onClick={this.forceUpdate.bind(this)}
                  exact
                  to={"/allmovies/page=" + page}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  imgStyle = {
    width: "14rem"
  };

  textStyle = {
    height: "18rem"
  };

  priceStyle = {
    color: "gold"
  };
}

export default CompleteMovieListComponent;
