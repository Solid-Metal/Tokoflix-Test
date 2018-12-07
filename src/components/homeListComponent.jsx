import React, { Component } from 'react';
import moment from 'moment';
import helper from '../Misc/helper'
import CurrencyFormat from 'react-currency-format';

class HomeListComponent extends Component {
    
    date = moment().format('YYYY-MM-DD');
    dateprev = moment().subtract(1, 'month').format('YYYY-MM-DD');

    constructor(props)
    {
        super(props);
        this.state =
        {
            items: [],
            isLoaded: false,
            page : 1,
        }
    }

    componentDidMount()
    {
        this.fetchData();
    }

    fetchData()
    {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US&region=ID&include_adult=true&page='+this.state.page)
        .then(result=>result.json())
        .then(json=>
            {
                this.setState
                ({
                    isLoaded:true,
                    items: json,
                })
            });
    }

    nextPage()
    {
        this.setState
        ({
            page: this.state.page + 1 
        }, () => {
            this.fetchData();
          }); 
    }

    
    render() { 

        let {isLoaded,items} = this.state;
        let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

        if(!isLoaded)
        {
            return(
                <div className="ui active dimmer">
                    <div className="ui big text loader">Loading...</div>
                </div>
            );
        }
        else
        {
            return ( 
                <React.Fragment>
                    <div className="row justify-content-center">
                            {items.results.map(item =>
                                (
                                    <React.Fragment key={item.id}>
                                        <div className="card" style={this.imgStyle}>
                                            <img className="card-img-left" src={imageLink+item.poster_path} alt="Card cap"/>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <h6 className="card-title" style={this.priceStyle}><CurrencyFormat value={helper.checkPrice(items.vote_average)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></h6>
                                                <a className="btn btn-primary" href={item.id+'-'+helper.replaceSpace(item.title)}>Go somewhere</a>
                                            </div>
                                        </div>
                                    </React.Fragment>
                            ))} 
                        </div>
                    <button className="btn btn-primary" onClick={this.nextPage.bind(this)}>NEXT</button>
               </React.Fragment>
             );
        }
    }

    imgStyle = 
    {
        width: '18rem',
    };
    
    textStyle =
    {
        height: '18rem',
    }

    priceStyle =
    {
        color: 'gold',
    }
}
 
export default HomeListComponent;