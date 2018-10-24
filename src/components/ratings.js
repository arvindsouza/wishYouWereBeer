import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from 'react-ratings-declarative';

import { updateBeer } from '../actions/index';

export var ratingChange = false;

class RatingsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.beerRating,
    };
  }

  changeRating = (id, rating) => {
    this.props.updateBeer(id, rating);
    ratingChange = true;
    this.setState({
      rating: rating,
    });
  };

  render() {
    return (
      <Ratings
        rating={parseInt(this.state.rating)}
        widgetRatedColors="blue"
        changeRating={rating => {
          this.changeRating(this.props.beerId, rating);
        }}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    );
  }
}

export default connect(
  null,
  { updateBeer },
)(RatingsComponent);
