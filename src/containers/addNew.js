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
  beerName:'',
  rating: 1,
  desc:''
}

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
    console.log('hello');
    this.setState(
      {
        [field]: event.target.value,
      },
      () => {
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
        <Field
          className="form-control"
          type="text"
          name={field}
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
        <Field
          type="number"
          className="form-control rating-input"
          value={this.state.rating}
          onChange={() => { this.handleChange(field)
        }}
          name='rating'
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
      <Formik 
      initialValues = {initValues}
      onSubmit = {values => {
        console.log(JSON.stringify(values,null,2));
        //
      }}>
       {({errors, touched, handleSubmit, isValid, setFieldValue}) => (
        <Form >
          {this.renderField('Beer name', 'beerName')}

          {this.renderNumberField('rating')}


          <button type='submit' disabled={!isValid}>Submit</button>
        </Form>
    )}
      </Formik>
    );
  }
}

export default connect(
  null,
  { addNewBeer },
)(AddNew);
