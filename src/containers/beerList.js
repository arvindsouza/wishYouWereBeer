import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBeers } from '../actions';

class BeerList extends Component {

    componentDidMount() {
        this.props.fetchBeers();
    }

    render() {
        if(!this.props.beers){
            return (
                <div>Loading...</div>
            )
        }

        return (
            <li>{this.props.beers.beerName}</li>
        )
    }
}

function mapStateToProps(state) {
    return { beers: state.beers.data }
}



export default connect(mapStateToProps, { fetchBeers })(BeerList);