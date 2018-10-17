import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent, {ratingChange} from '../components/ratings';

class BeerList extends Component {

    constructor(props){
        super(props);

        this.state = {
            thebeers: this.props.beers
        }
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    shouldComponentUpdate(){
        if(ratingChange)
        return false;
        else
        return true;
    }

    returnBeerList() {

        return _.map(this.props.beers, beer => {
            
            return (
                <li className='list-group-item' key={beer.id}>{beer.beerName}
                < RatingsComponent beerRating = {beer.rating}  beerId={beer.id}/>
                </li>

            )
        })
    }

    render() {
        if (!this.props.beers) {
            return (
                <div>Loading...</div>
            )
        }
        
        return (
            <div className='listContainer'>
                <div className='text-xs-right'>
                    <button className='btn btn-primary' >Add New Beer</button>
                </div>

                <ul className='list-group' >
                    {this.returnBeerList()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { beers: state.beers }
}



export default connect(mapStateToProps, { fetchBeers, updateBeer })(BeerList);