import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { addNewBeer } from '../actions';
import { connect } from 'react-redux';
import { debug } from 'util';

class AddNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className} >
                <label>{field.label}</label>
                {field.belowLabel ? <label>{field.belowLabel}</label> : null}
                {field.label === 'Rating' ? <input type='number' className='form-control' {...field.input} /> :
                    <input type='text' className='form-control' {...field.input} />}
                <div className='text-help' >{touched ? error : ''}</div>
            </div>
        );
    }

    renderImgUpload(field) {
        delete field.input.value;

        return (
            <div>
                <label>{field.label}</label>
                <input type='file'{...field.input} />
            </div>
        )
    }

    onSubmit(values) {
        console.log(values.img);
        this.props.addNewBeer(values, () => {
          //  this.props.history.push('/beers');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h1>Add a New Beer</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label='Beer Name'
                        name='beerName'
                        component={this.renderField}
                    />

                    <Field
                        label='Rating'
                        belowLabel='(Between 1 and 5)'
                        name='rating'
                        component={this.renderField}
                    />

                    <Field
                        label='Description'
                        name='desc'
                        component={this.renderField}
                    />

                    <Field
                        label='image'
                        name='img'
                        component={this.renderImgUpload}
                    />

                    <button className='btn btn-primary' type='submit'>Submit</button>
                    <Link to='/' className='btn btn-danger' >Cancel</Link>
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
        errors.rating = 'Enter a Rating'
    }

    if (values.rating && (values.rating > 5 || values.rating < 1 || (values.rating % 1 !== 0))) {
        errors.rating = 'Enter a valid rating'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'NewBeerForm'
})(
    connect(null, { addNewBeer })(AddNew)
);