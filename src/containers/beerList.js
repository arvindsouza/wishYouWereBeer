import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent, {ratingChange} from '../components/ratings';

class BeerList extends Component {

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
                <tr  key={beer._id} >
                <td>{beer.beerName}</td>
                <td className='theRating'>< RatingsComponent beerRating = {beer.rating}  beerId={beer._id}/></td>
                <td >{beer.desc}</td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.props.beers);

        if (!this.props.beers) {
            return (
                <div>Loading...</div>
            )
        }
        
        return (
            <div className='listContainer'>
                <div className='text-xs-right'>
                    <Link className='btn btn-primary' to='/beers/new'>Add New Beer</Link>
                </div>

                <table className='table table-hover' >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {this.returnBeerList()}
                </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { beers: state.beers }
}



export default connect(mapStateToProps, { fetchBeers, updateBeer })(BeerList);