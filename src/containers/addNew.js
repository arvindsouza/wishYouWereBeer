import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';

import './form.scss';
import { addNewBeer } from '../actions';

const emptyColors = 'rgb(255,239,212)';
const hoverColors = 'rgb(173, 21, 21)';
const dimensions = '30px';

const initValues = {
  beerName: '',
  rating: 1,
  desc: '',
  img: ''
};

class AddNew extends Component {
  state = {
    touched: {
      beerName: false,
      rating: false,
      desc: false
    },
    beerName: '',
    rating: 1,
    desc: '',
    isDisabled: true
  };

  changeTheRating = newRating => {
    this.setState({ rating: newRating });
  };

  renderField = (label, field) => {
    let classnames = null;

    if (field === 'beerName')
      classnames = classNames('form-group', {
        'has-danger': this.state.touched.beerName && this.state.beerName === ''
      });
    else
      classnames = classNames('form-group', {
        'has-danger': this.state.touched.desc && this.state.desc === ''
      });

    return (
      <div className={classnames}>
        <label className="field-label">{label}</label>
        <Field className="form-control" type="text" name={field} />
      </div>
    );
  };

  onSubmit = values => {
    let imgName = null,
      file = null;

    if (values.file) {
      imgName = values.file.name;
      file = values.file;
    }
    values.img = imgName;

    delete values.file;

    this.props.addNewBeer(values, file).then(() => {
      this.props.history.push('/beers');
    });
  };

  render() {
    return (
      <Formik
        initialValues={initValues}
        validate={values => {
          let errors = {};

          if (!values.beerName) errors.beerName = 'Enter a beer name';

          if (!values.desc) errors.desc = 'Enter a description';

          return errors;
        }}
        onSubmit={values => {
          this.onSubmit(values);
        }}
      >
        {({ errors, isValid, setFieldValue }) => (
          <div className="form">
            <Form>
              <h1 className="form-label">Add a New Beer</h1>

              {this.renderField('Beer name', 'beerName')}
              {errors.beerName ? (
                <div className="error-message">{errors.beerName}</div>
              ) : null}

              <div className="form-group" id="rating-field">
                <label className="field-label">Enter the rating</label>
                <label className="stars">
                  <Ratings
                    rating={this.state.rating}
                    widgetEmptyColors={emptyColors}
                    widgetHoverColors={hoverColors}
                    changeRating={newRating => {
                      this.changeTheRating(newRating);
                      setFieldValue('rating', newRating, false);
                    }}
                    widgetDimensions={dimensions}
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                </label>

                <Field
                  type="number"
                  className="form-control rating-input"
                  value={this.state.rating}
                  id="the-rating"
                  name="rating"
                  readOnly
                />
              </div>

              {this.renderField('Description', 'desc')}
              {errors.desc ? (
                <div className="error-message">{errors.desc}</div>
              ) : null}

              <div className="file-area">
                <label className="field-label">Image: &nbsp; </label>
                <div className="file-overlay">
                  <Field
                    className="file-input"
                    type="file"
                    name="img"
                    accept=".png, .jpeg, .jpg"
                    onChange={e => {
                      setFieldValue('file', e.currentTarget.files[0]);
                    }}
                  />
                </div>
              </div>

              <Link to="/">Cancel</Link>

              <button type="submit" disabled={!isValid}>
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>
    );
  }
}

export default connect(
  null,
  { addNewBeer }
)(AddNew);
