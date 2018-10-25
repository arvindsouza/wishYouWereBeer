import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent from '../components/ratings';

class BeerList extends Component {

  componentDidMount() {
    this.props.fetchBeers();
  }

  returnBeerList() {
    return this.props.beer.map(beer => {
      return (
        <tr
          key={beer.id}
        >
          <td>{beer.beerName}</td>
          <td className="the-rating">
            <RatingsComponent beerRating={beer.rating} beerId={beer.id} />
          </td>
          <td>{beer.desc}</td>
        </tr>
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
          <Link to="/new" className="">
            Add New Beer
          </Link>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.returnBeerList()}</tbody>
        </table>
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
