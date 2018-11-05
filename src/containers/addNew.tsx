import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FormikValues, FormikErrors } from 'formik';
import { History } from 'history';

import './form.scss';
import { addNewBeer } from '../actions';
import { IErrors } from '../interfaces';

const emptyColors = 'rgb(255,239,212)';
const hoverColors = 'rgb(173, 21, 21)';
const dimensions = '30px';

const initValues = {
  beerName: '',
  rating: 1,
  desc: '',
  img: '',
};

interface IProps {
  addNewBeer: (beer: FormikValues, img: File) => any;
  history: History;
}

interface ILocalState {
  rating: number;
  fileName: string;
}

class AddNew extends Component<IProps, ILocalState> {
  public state: ILocalState = {
    rating: 1,
    fileName: '',
  };

  public changeTheRating = (newRating: number) => {
    this.setState({ rating: newRating });
  };

  public setFileName = (fileName: string) => {
    this.setState({
      fileName,
    });
  };

  public renderField = (label: string, field: string) => {
    const classnames = 'form-group';

    return (
      <div className={classnames}>
        <label className="field-label">{label}</label>
        <Field className="form-control" type="text" name={field} />
      </div>
    );
  };

  public errorcheck = (values: FormikValues) => {
    const errors = {} as FormikErrors<IErrors>;

    if (!values.beerName) {
      errors.beerName = 'Enter a beer name';
    }
    if (!values.desc) {
      errors.desc = 'Enter a description';
    }
    return errors;
  };

  public onSubmit = (values: FormikValues) => {
    let file = null;

    if (values.file) {
      file = values.file;
    }

    delete values.file;

    this.props.addNewBeer(values, file).then(() => {
      this.props.history.push('/beers');
    });
  };

  public render() {
    return (
      <Formik
        initialValues={initValues}
        validate={values => this.errorcheck(values)}
        onSubmit={values => {
          this.onSubmit(values);
        }}
      >
        {({ errors, isValid, setFieldValue, touched }) => (
          <div className="form">
            <Form>
              <h1 className="form-label">Add a New Beer</h1>

              {this.renderField('Beer name', 'beerName')}
              {errors.beerName &&
                touched.beerName && (
                  <div className="error-message">{errors.beerName}</div>
                )}

              <div className="form-group" id="rating-field">
                <label className="field-label">Enter the rating</label>
                <label className="stars">
                  <Ratings
                    rating={this.state.rating}
                    widgetEmptyColors={emptyColors}
                    widgetHoverColors={hoverColors}
                    changeRating={(newRating: number) => {
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
                  readOnly={true}
                />
              </div>

              {this.renderField('Description', 'desc')}
              {errors.desc &&
                touched.desc && (
                  <div className="error-message">{errors.desc}</div>
                )}

              <div className="file-area">
                <label className="field-label">Image: &nbsp; </label>
                <div className="file-overlay">
                  <input
                    className="file-input"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      if (e.currentTarget.files !== null) {
                        this.setFileName(e.currentTarget.files[0].name);
                        setFieldValue('file', e.currentTarget.files[0]);
                        setFieldValue('img', e.currentTarget.files[0].name);
                      }
                    }}
                  />
                </div>
                <div className="file-name">{this.state.fileName}</div>
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
  { addNewBeer },
)(AddNew);
