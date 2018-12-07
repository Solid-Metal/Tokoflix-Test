import React, { Component } from 'react';
import helper from '../Misc/helper'
import CurrencyFormat from 'react-currency-format';

class DetailComponent extends Component {

    constructor(props)
    {
        super(props);
        this.state =
        {
            items: [],
            genres: [],
            productionComp : [],
            productionCountry: [],
            spokenLang: []
        }
    }

    componentDidMount()
    {
        let id  = this.props.match.params.id.toString();
        
        fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US')
        .then(result=>result.json())
        .then(json=>
            {
                this.setState
                ({
                    items: json,
                    genres: json.genres,
                    productionComp : json.production_companies,
                    productionCountry: json.production_countries,
                    spokenLang: json.spoken_languages,
                })
            });
    }
    render() 
    {
        let {items,genres,productionComp,productionCountry,spokenLang} = this.state;
        let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"; 
        
        return ( 
            <React.Fragment>
                <div className="card w-75 mx-auto mt-5 px-3">
                    <div className="media mt-3">
                        <img className="mr-5" src={imageLink+items.poster_path} alt="Generic placeholder image"/>
                        <div className="media-body">
                            <h1 className="display-1">{items.original_title}</h1>
                            <h3>{productionComp.map(item => item.name===null?null:item.name)} {productionCountry.map(item => item.name===null?null:', '+item.name)}</h3>
                            <h3>{genres.map(item => item.name === 1?item.name:item.name+', ')}</h3>
                            {items.overview}
                        </div>
                    </div>
                    <div className="card-top mt-5">
                        <div className="row">
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-line-chart'/><h2>{items.popularity}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-hourglass-end'/><h2>{items.runtime}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-language'/><h2>{spokenLang.map(item => item.name === '' || item.name === null?item.name:item.name)}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-ticket'/><h2>{items.status}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-money'/><h2><CurrencyFormat value={helper.checkPrice(items.vote_average)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></h2>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default DetailComponent;