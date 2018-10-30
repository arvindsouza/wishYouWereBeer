import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './form.scss';
import { addNewBeer } from '../actions';

const emptyColors = 'rgb(255,239,212)';
const hoverColors = 'rgb(173, 21, 21)';
const dimensions = '30px';

class AddNew extends Component {
  state = {
    touched: {
      beerName: false,
      rating: false,
      desc: false,
    },
    beerName: '',
    rating: 1,
    desc: '',
    isDisabled: true,
  };

  changeTheRating = newRating => {
    this.setState({ rating: newRating });
  };

  setButtonDisabledValue = (beerName, desc) => {
    if (beerName !== '' && desc !== '') {
      this.setState({
        isDisabled: false,
      });
    } else
      this.setState({
        isDisabled: true,
      });
  };

  handleChange = field => event => {
    this.setState(
      {
        [field]: event.target.value,
      },
      () => {
        this.setButtonDisabledValue(this.state.beerName, this.state.desc);
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
            widgetEmptyColors={emptyColors}
            widgetHoverColors={hoverColors}
            changeRating={this.changeTheRating}
            widgetDimensions={dimensions}
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

  renderImgUpload = () => {
    return (
      <div className="file-area">
        <label className="field-label">Image: &nbsp; </label>
        <div className="file-overlay">
          <input
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

    let imgName = null,
      file = null;

    //check if there is a filedata object and filedata object is not null
    if (e.target[3].files && e.target[3].files[0]) {
      imgName = e.target[3].files[0].name;
      file = e.target[3].files[0];
    }

    let values = {
      beerName: this.state.beerName,
      rating: this.state.rating,
      desc: this.state.desc,
      img: imgName,
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
