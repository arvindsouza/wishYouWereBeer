import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './form.scss';
import { addNewBeer } from '../actions';

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: {
        beerName: false,
        rating: false,
        desc: false,
      },
      beerName: '',
      rating: 1,
      desc: '',
      file: '',
      isDisabled: true,
    };
  }

  changeTheRating = newRating => {
    this.setState({ rating: newRating });
  };

  handleChange = field => event => {
    this.setState(
      {
        [field]: event.target.value,
      },
      () => {
        if (this.state.beerName !== '' && this.state.desc !== '') {
          this.setState({
            isDisabled: false,
          });
        } else
          this.setState({
            isDisabled: true,
          });
      },
    );
  };

  validate = field => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  renderField = (label, field) => {
    let classnames = null;

    if (field === 'beerName')
      classnames = classNames('form-group', {
        'has-danger': this.state.touched.beerName && this.state.beerName === '',
      });
    else
      classnames = classNames('form-group', {
        'has-danger': this.state.touched.desc && this.state.desc === '',
      });

    return (
      <div className={classnames}>
        <label className="field-label">{label}</label>
        <input
          className="form-control"
          type="text"
          value={field === 'beerName' ? this.state.beerName : this.state.desc}
          onChange={this.handleChange(field)}
          onBlur={this.validate(field)}
        />
      </div>
    );
  };

  renderNumberField = field => {
    return (
      <div className="form-group" id="rating-field">
        <label className="field-label">Enter the rating</label>
        <label className="stars">
          <Ratings
            rating={this.state.rating}
            widgetEmptyColors="rgb(255,239,212)"
            widgetHoverColors="rgb(173, 21, 21)"
            changeRating={this.changeTheRating}
            widgetDimensions='30px'
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </label>
        <input
          type="number"
          className="form-control rating-input"
          onChange={this.handleChange(field)}
          value={this.state.rating}
          readOnly
        />
      </div>
    );
  };

  renderImgUpload = field => {
    return (
      <div className="file-area">
        <label className="field-label">Image: &nbsp; </label>
        <div className="file-overlay">
          <input
            onChange={this.handleChange(field)}
            className="file-input"
            type="file"
            accept=".png, .jpeg, .jpg"
          />
        </div>
      </div>
    );
  };

  onSubmit = e => {
    e.preventDefault();

    let temp = null,
      file = null;

    if (e.target[3].files && e.target[3].files[0]) {
      temp = e.target[3].files[0].name;
      file = e.target[3].files[0];
    } else {
      temp = null;
      file = null;
    }

    let values = {
      beerName: e.target[0].value,
      rating: e.target[1].value,
      desc: e.target[2].value,
      img: temp,
    };

    this.props.addNewBeer(values, file).then(() => {
      this.props.history.push('/beers');
    });
  };

  render() {
    return (
      <div className="form">
        <h1 className="form-label">Add a New Beer</h1>
        <form onSubmit={this.onSubmit}>
          {this.renderField('Beer name', 'beerName')}
          {this.state.touched.beerName && this.state.beerName === '' ? (
            <div className="error-message">Enter a beer name</div>
          ) : null}

          {this.renderNumberField('rating')}

          {this.renderField('Description', 'desc')}
          {this.state.touched.desc && this.state.desc === '' ? (
            <div className="error-message">Enter a description</div>
          ) : null}

          {this.renderImgUpload('file')}
          <div className="form-buttons">
            <Link to="/" className="buttons back">
              Cancel
            </Link>
            <button
              disabled={this.state.isDisabled}
              className="buttons submit"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewBeer },
)(AddNew);
