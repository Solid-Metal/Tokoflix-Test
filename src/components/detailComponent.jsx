import React, { Component } from 'react';
import '../css/additionalDetailStyle.css'
import helper from '../misc/helper'
import CurrencyFormat from 'react-currency-format';
import Slider from "react-slick";
import user from '../misc/user'

class DetailComponent extends Component {

    id = '';
    price = '';
    
    constructor(props)
    {
        super(props);
        this.state =
        {
            items: [],
            genres: [],
            productionComp : [],
            productionCountry: [],
            spokenLang: [],
            crew:[],
            reload:0,
        }
    }

    componentDidMount()
    {
        this.id = this.props.match.params.id.toString();
        this.fetchMovieData()
    }

    buyMovie()
    {
        user.buyMovie(this.id,this.price);

        this.setState
        ({
            reload: this.state.reload + 1 
        }, () => {
            this.fetchMovieData();
          }); 
    }

    fetchMovieData()
    {
        fetch('https://api.themoviedb.org/3/movie/'+this.id+'?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US')
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

        this.fetchCrew();
    }

    fetchCrew()
    {
        fetch('https://api.themoviedb.org/3/movie/'+this.id+'/credits?api_key=0d7fb7ecd25ddcc4c6b5410edec63559')
        .then(result=>result.json())
        .then(json=>
            {
                this.setState
                ({
                    crew: json.cast,
                })
            });
    }

    render() 
    {
        let {items,genres,productionComp,productionCountry,spokenLang,crew} = this.state;
        this.price = helper.checkPrice(items.vote_average);
        let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"; 
        
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true
          };

        return ( 
            <React.Fragment>
                <div className="card w-75 mx-auto mt-5 px-3 border">
                    <div className="card-top mt-3">
                        <div className="media mt-0">
                            <img className="mr-5" src={imageLink+items.poster_path} alt="Generic placeholder image"/>
                            <div className="media-body">
                                <h1 className="display-1">{items.original_title}</h1>
                                <h3>{productionComp.map((item, index) => index < productionComp.length - 1 ? item.name + ', ':item.name+'')} | {productionCountry.map((item,index) => index < productionCountry.length - 1 ? item.name + ', ':item.name+'')}</h3>
                                <h3>{genres.map((item, index) => index < genres.length - 1 ? item.name + ', ':item.name+'')}</h3>
                                {items.overview}
                            </div>
                        </div>
                    </div>
                    <div className="card-body mt-3">
                        <div className="row">
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-line-chart'/><h2>{items.popularity}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-hourglass-end'/><h2>{items.runtime} Minutes</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-language'/><h2>{spokenLang.map((item, index) => index < spokenLang.length - 1 ? item.name + ', ':item.name+'')}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-ticket'/><h2>{items.status}</h2>
                            </div>
                            <div className="col" align='center'>
                                <span className='fa fa-2x fa-money'/><h2><CurrencyFormat value={helper.checkPrice(items.vote_average)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></h2>
                            </div>
                            <div className="col" align='center'>
                                <div hidden={user.checkItem(this.id) === 'own'? true:false}>
                                    <span className='fa fa-2x fa-times' style={{color:"red"}}/><h1><button className="btn btn-danger" onClick={this.buyMovie.bind(this)}>Click here to buy</button></h1>
                                </div>
                                <div hidden={user.checkItem(this.id) === 'own'? false:true}>
                                    <span className='fa fa-2x fa-check' style={{color:"green"}}/><h1><button className="btn btn-success" disabled="true">You own this movie</button></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-75 mx-auto mt-0 px-3 border pb-3">
                    <h1>Cast</h1>
                    <Slider {...settings}>
                        {crew.map((item, index) =>
                             (
                                <div>
                                    <div className="card">
                                        <img className="card-img-left" src={item.profile_path != null ? imageLink+item.profile_path : "https://jupiterascendingmovienews.com/wp-content/themes/PsyPlay/assets/css/img/noimg.png"} alt="Card cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                                   
                                            </div>
                                        </div>
                                </div>
                            ))} 
                    </Slider>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default DetailComponent;