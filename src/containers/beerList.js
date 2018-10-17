import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent, {ratingChange} from '../components/ratings';

class BeerList extends Component {

    constructor(props){
        super(props);

        this.state = {
            showDesc: false
        }

        this.showDesc = this.showDesc.bind(this);
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

    showDesc(data){
        this.setState({
            showDesc: data
        })

        console.log(data);
    }

    returnBeerList() {

        return _.map(this.props.beers, beer => {
            
            return (
                <tr  key={beer.id}  onClick = {(data) => {this.showDesc(beer.id)}}>
                <td>{beer.beerName}</td>
                <td className='theRating'>< RatingsComponent beerRating = {beer.rating}  beerId={beer.id}/></td>
                <td >{beer.desc}</td>
                </tr>
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