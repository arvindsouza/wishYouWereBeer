import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './list.scss';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent, { ratingChange } from '../components/ratings';

class BeerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDesc: false,
    };

    this.showDesc = this.showDesc.bind(this);
  }

  componentDidMount() {
    this.props.fetchBeers();
  }

  shouldComponentUpdate() {
    if (ratingChange) return false;
    else return true;
  }

  showDesc(data) {
    this.setState({
      showDesc: data,
    });
  }

  returnBeerList() {
    return _.map(this.props.beers, beer => {
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
    if (!this.props.beers) {
      return <div>Loading...</div>;
    }
    return (
      <div className="list-container">
        <div className="add-new-container">
          <button >Add New Beer</button>
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
