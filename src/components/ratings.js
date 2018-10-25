import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from 'react-ratings-declarative';

import { updateBeer } from '../actions/index';

class RatingsComponent extends Component {
  getRating = () => {
    return this.props.beerRating;
  };

  constructor(props) {
    super(props);

    this.state = {
      rating: this.getRating.call(),
    };
  }

  changeRating = (id, rating) => {
    this.props.updateBeer(id, rating);
    this.setState({
      rating,
    });
  };

  render() {
    console.log(this.state.rating);
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
