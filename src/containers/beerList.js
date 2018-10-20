import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchBeers, updateBeer, deleteBeer, hasFetched} from '../actions';
import RatingsComponent from '../components/ratings';

class BeerList extends Component {

    componentDidMount() {
        this.props.fetchBeers();
    }

    onDelete(beerid){
        this.props.deleteBeer(beerid);
    }


    returnBeerList() {
 
        return _.map(this.props.beers, beer => {
            
            return (
                <tr  key={beer.id} >
                <td></td>
                <td>{beer.data.beerName}</td>
                <td className='theRating'>< RatingsComponent beerRating = {beer.data.rating}  beerId={beer.id}/></td>
                <td >{beer.data.desc}</td>
                <td><button className='btn btn-danger' onClick={this.onDelete.bind(this, beer.id )}>Delete</button></td>
                </tr>
            )
        })
    }

    onLink(){
        hasFetched = false;
    }

    render() {
        if (!hasFetched) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className='listContainer'>
                <div className='text-xs-right'>
                    <Link className='btn btn-primary' onClick={this.onLink.bind(this)}  to='/beers/new'>Add New Beer</Link>
                </div>

                <table className='table table-hover' >
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Description</th>
                        <th></th>
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



export default connect(mapStateToProps, { fetchBeers, updateBeer, deleteBeer })(BeerList);