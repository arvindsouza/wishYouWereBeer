import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from 'react-ratings-declarative';

import { updateBeer } from '../actions/index';

interface IProps {
  beerRating: string;
  beerId: any;
  updateBeer: (paramsA: any, paramsB: number) => void;
}

class RatingsComponent extends Component<IProps> {
  private getRating = () => {
    return this.props.beerRating;
  };

  public state = {
    rating: this.getRating(),
  };

  private changeRating = (id: any, rating: number) => {
    this.props.updateBeer(id, rating);
    this.setState({
      rating,
    });
  };

  public render() {
    return (
      <Ratings
        rating={parseInt(this.state.rating, 10)}
        widgetRatedColors="blue"
        changeRating={(rating: number) => {
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
