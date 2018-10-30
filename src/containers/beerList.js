import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './list.scss';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent from '../components/ratings';

class BeerList extends Component {
  componentDidMount() {
    this.props.fetchBeers();
  }

  returnBeerList() {
    return this.props.beers.map(beer => {
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

  render() {
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

function mapStateToProps(state) {
  return { beers: state.beers };
}

export default connect(
  mapStateToProps,
  { fetchBeers, updateBeer },
)(BeerList);
