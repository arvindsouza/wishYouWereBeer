import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './list.scss';

import { fetchBeers } from '../actions';
import RatingsComponent from '../components/ratings';
import { IState, Idata, IreduxState } from '../interfaces';

class BeerList extends Component<IState> {
  public componentDidMount() {
    this.props.fetchBeers();
  }

  public returnBeerList() {
    return this.props.beers.map((beer: Idata) => {
      return (
        <div key={beer.id} className="row">
          <div className="beer-name">{beer.data.beerName}</div>
          <div className="the-rating ">
            <RatingsComponent beerRating={beer.data.rating} beerId={beer.id} />
          </div>
          <div className="beer-description">{beer.data.desc}</div>
        </div>
      );
    });
  }

  public render() {
    if (!this.props.beers.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="list-container">
        <div className="add-new-container">
          <Link to="/new">Add New Beer</Link>
        </div>

        <div className="row header-row">
          <div className="header-name">Name</div>
          <div className="header-rating">Rating</div>
          <div className="header-description">Description</div>
        </div>
        {this.returnBeerList()}
      </div>
    );
  }
}

const mapStateToProps = (state: IreduxState) => ({
  beers: state.beers,
});

export default connect(
  mapStateToProps,
  { fetchBeers },
)(BeerList);
