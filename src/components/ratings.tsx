import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from 'react-ratings-declarative';

import { updateBeer } from '../actions/index';
import { IAction } from '../interfaces';

interface IRatingsProps {
  beerRating: number;
  beerId: string;
  updateBeer: (id: string, rating: number) => IAction;
}

interface ILocalState{
  rating: number
}

class RatingsComponent extends Component<IRatingsProps, ILocalState> {
  public state: ILocalState = {
    rating: this.props.beerRating
  };

  public render() {
    return (
      <Ratings
        rating={this.state.rating}
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

  private changeRating = (id: string, rating: number) => {
    this.props.updateBeer(id, rating);
    this.setState({
      rating,
    });
  };

}

export default connect(
  null,
  { updateBeer },
)(RatingsComponent);
