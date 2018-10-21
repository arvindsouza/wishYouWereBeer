import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { addNewBeer } from '../actions';
import { connect } from 'react-redux';

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
                <div className='errorMessage' >{touched ? error : ''}</div>
            </div>
        );
    }

    renderImgUpload(field) {
        delete field.input.value;

        return (
            <div>
                <label >{field.label}: &nbsp; </label>
                <input className='fileInput' type='file'{...field.input} accept='.png, .jpeg, .jpg'/>
            </div>
        )
    }

    onSubmit(values) {
        var temp, file;
        if(values.img){
             temp = values.img[0].name;
             file = values.img[0];
             values.img = temp;
        }
        else {
            temp = null; file = null;
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
        errors.rating = 'Enter a Rating'
    }

    if (values.rating && (values.rating > 5 || values.rating < 1 || (values.rating % 1 !== 0))) {
        errors.rating = 'Enter a valid rating'
    }

    if(!values.desc){
        errors.desc = 'Enter a description'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'NewBeerForm'
})(
    connect(null, { addNewBeer })(AddNew)
);