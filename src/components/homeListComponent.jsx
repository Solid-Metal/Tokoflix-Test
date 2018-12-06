import React, { Component } from 'react';

class HomeListComponent extends Component {

    page = 1;
    today = new Date();
    date = this.today.getFullYear() + '-' + this.today.getMonth() + '-' + this.today.getDate();

    constructor(data)
    {
        super(data);
        this.state =
        {
            items: [],
            isLoaded: false,
            price: [],
        }
    }

    componentDidMount()
    {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US&region=ID&sort_by=release_date.desc&include_adult=false&include_video=false&page='+this.page+'&primary_release_date.lte='+this.date)
        .then(result=>result.json())
        .then(json=>
            {
                this.setState
                ({
                    isLoaded:true,
                    items: json,
                    prices: [],
                })
            });
    }

    checkPrice()
    {
        for(let i of this.state.items.results)
            {
                if(i.vote_average >= 0 && i.vote_average < 3)
                {
                    i["price"] = 3500;
                }
                else if(i.vote_average >= 3 && i.vote_average < 6)
                {
                    i["price"] = 8250;
                }
                else if(i.vote_average >= 3 && i.vote_average < 6)
                {
                    i["price"] = 16350;
                }
                else 
                {
                    i["price"] = 21250;
                }
            }
        
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
            this.checkPrice();

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
                                            <h6 className="card-title" style={this.priceStyle}>Rp.{item.price},-</h6>
                                            <a className="btn btn-primary" onClick={this.props.someVar}>Go somewhere</a>
                                        </div>
                                    </div>
                                </React.Fragment>
                        ))} 
                    </div>
                   
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