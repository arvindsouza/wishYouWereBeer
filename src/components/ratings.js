import React, { Component } from 'react';
import { connect } from 'react-redux';

import Ratings from 'react-ratings-declarative';

import { updateBeer } from '../actions/index';

export var ratingChange = false;

class RatingsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: props.beerRating
        }

        this.changeRating = this.changeRating.bind(this);
    }

    changeRating(id, rating) {
        console.log(rating);
        this.props.updateBeer(id, rating);
        ratingChange = true;
        this.setState({
            rating: parseInt(rating)
        })
    }

    render() {
        return (
            <Ratings rating={parseInt(this.state.rating)}
                widgetRatedColors="rgb(233,113,7)"
                widgetEmptyColors="rgb(255,239,212)"
                widgetHoverColors="rgb(173, 21, 21)"
                changeRating={(rating) => { this.changeRating(this.props.beerId, rating) }}>
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
            </Ratings>
        )
    }
}

export default connect(null, { updateBeer })(RatingsComponent);