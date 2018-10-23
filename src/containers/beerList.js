import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchBeers, updateBeer } from '../actions';
import RatingsComponent, {ratingChange} from '../components/ratings';

class BeerList extends Component {

    constructor(props){
        super(props);

        this.state = {
            showDesc: false
        }

        this.showDesc = this.showDesc.bind(this);
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    shouldComponentUpdate(){
        if(ratingChange)
        return false;
        else
        return true;
    }

    showDesc(data){
        this.setState({
            showDesc: data
        })

        console.log(data);
    }

    returnBeerList() {

        return _.map(this.props.beers, beer => {
            
            return (
                <div  key={beer.id} className='row'>
                <div className=''>{beer.data.beerName}</div>
                <div className='theRating '>< RatingsComponent beerRating = {beer.data.rating}  beerId={beer.id}/></div>
                <div className=''>{beer.data.desc}</div>
                </div>
            )
        })
    }

    render() {
        if (!this.props.beers) {
            return (
                <div>Loading...</div>
            )
        }
        
        return (
            <div className='listContainer'>
                <div className=''>
                     <button className='' >Add New Beer</button>
                </div>

                <div className='row headerRow'>
                        <div className='header '>Name</div>
                        <div className=' header '>Rating</div>
                        <div className=' header '>Description</div>
                </div>
                {this.returnBeerList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { beers: state.beers }
}



export default connect(mapStateToProps, { fetchBeers, updateBeer })(BeerList);