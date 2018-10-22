import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { addNewBeer } from '../actions';
import { connect } from 'react-redux';

class AddNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: ''
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className} >
                <label>{field.label}</label>
                <input type='text' className='form-control' {...field.input} />
                <div className='errorMessage' >{touched ? error : ''}</div>
            </div>
        );
    }

    renderNumberField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className} >
                <label>{field.label}</label>
                <label>{field.belowLabel}</label>
                <input type='number' className='form-control' {...field.input} />
                <div className='errorMessage' >{touched ? error : ''}</div>

            </div>
        )
    }



    renderImgUpload(field) {
        delete field.input.value;

        return (
            <div className='fileArea'>
                <label >{field.label}: &nbsp; </label>
                <div className='fileOverlay'><input className='fileInput' type='file'{...field.input} accept='.png, .jpeg, .jpg' />
                    <i className="fas fa-upload fa-2x"></i></div>
                <div>{field.input.img && field.input.img[0] ? this.state.fileName : null}</div>
            </div>
        )
    }

    onSubmit(values) {
        var temp, file;
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
                        belowLabel = '(Between 1 and 5)'
                        component={this.renderNumberField}
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
        errors.rating = 'Enter a Rating'
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
    connect(null, { addNewBeer })(AddNew)
);