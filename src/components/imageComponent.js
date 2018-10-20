import React, { Component } from 'react';
import firebase from 'firebase'


var storage = firebase.storage();

export default class ImageComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        }

        this.fetchImage =  this.fetchImage.bind(this);
    }

    fetchImage() {
        if (this.props.beer.data.img)
            storage.ref().child(this.props.beer.data.img).getDownloadURL().then((url) => {
                this.setState({ imageUrl: url });

                console.log(this.state.imageUrl);
            })
            else
            this.setState({imageUrl: null})
    }

    componentDidMount(){
        this.fetchImage();
    }


    render(){
    return <div className='imageDiv'>{ this.state.imageUrl ? <img  src={this.state.imageUrl}/>:null}</div>
    }
}