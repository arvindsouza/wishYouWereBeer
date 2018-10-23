import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { Link } from 'react-router-dom';
import { addNewBeer } from '../actions';
import { connect } from 'react-redux';
import Ratings from 'react-ratings-declarative';

class AddNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 1
        }

        this.changeTheRating = this.changeTheRating.bind(this);
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className} >
                <label>{field.label}</label>
                <input type='text' className='form-control'{...field.input} onBlur={console.log('hello')} />
                <div className='errorMessage' >{touched ? error : ''}</div>
            </div>
        );
    }

    changeTheRating(newRating) {
        this.setState({ rating: newRating }); console.log(newRating);
    }

    renderNumberField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className} id='ratingfield'>
                <label>{field.label}</label>
                <label className='stars'>
                    <Ratings
                        rating={this.state.rating}
                        widgetRatedColors="rgb(233,113,7)"
                        widgetEmptyColors="rgb(255,239,212)"
                        widgetHoverColors="rgb(173, 21, 21)"
                        changeRating={this.changeTheRating}
                    >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                    </Ratings>
                </label>
                <input type='number' className='form-control ratingInput' onChange={this.props.change('NewBeerForm', 'rating', this.state.rating)}  {...field.input} value={this.state.rating} readOnly />
                <div className='errorMessage' >{touched ? error : ''}</div>

            </div>
        )
    }



    renderImgUpload(field) {
        delete field.input.value;

        return (
            <div className='fileArea'>
                <label >{field.label}: &nbsp; </label>
                <div className='fileOverlay'><input className='fileInput' type='file' {...field.input} accept='.png, .jpeg, .jpg' />
                    <i className="fas fa-upload fa-2x"></i></div>
                <div>{field.input.img && field.input.img[0] ? this.state.fileName : null}</div>
            </div>
        )
    }

    onSubmit(values) {
        var temp, file;
        console.log(values.rating);

        if (values.img && values.img[0]) {
            console.log(values.img);
            temp = values.img[0].name;
            file = values.img[0];
            values.img = temp;
        }
        else {
            temp = null; file = null; values.img = temp;
        }

        this.props.addNewBeer(values, file, () => {
            this.props.history.push('/beers');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className='form'>
                <h1 className='formLabel'>Add a New Beer</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label='Beer Name'
                        name='beerName'
                        component={this.renderField}
                    />

                    <Field
                        label='Rating'
                        name='rating'
                        component={this.renderNumberField.bind(this)}
                    />

                    <Field
                        label='Description'
                        name='desc'
                        component={this.renderField}
                    />

                    <Field
                        label='image'
                        name='img'
                        component={this.renderImgUpload.bind(this)}
                    />

                    <div className='formButtons'>
                        <Link to='/' className='back' ><i className="fas fa-chevron-left fa-3x"></i></Link>
                        <button className='submit' type='submit'><i className="fas fa-check-circle fa-3x"></i></button>
                    </div>

                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.beerName) {
        errors.beerName = 'Enter the Beer Name'
    }

    if (!values.rating) {
        errors.rating = 'Enter the Rating'
    }

    if (values.rating && (values.rating > 5 || values.rating < 1 || (values.rating % 1 !== 0))) {
        errors.rating = 'Enter a valid rating'
    }

    if (!values.desc) {
        errors.desc = 'Enter a description'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'NewBeerForm'
})(
    connect(null, { change, addNewBeer })(AddNew)
);