import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import anime from 'animejs'

import { fetchBeers, updateBeer, deleteBeer, hasFetched } from '../actions';
import RatingsComponent from '../components/ratings';
import ImageComponent from '../components/imageComponent';

const staticImgUrl = 'https://firebasestorage.googleapis.com/v0/b/wishyouwerebeer-95c98.appspot.com/o/MugA.png?alt=media&token=1542c78b-184d-4e87-8cf8-e67fcb17de12'
const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/wishyouwerebeer-95c98.appspot.com/o/Mug.gif?alt=media&token=1dc07329-49c6-41e8-99a8-cc6e30041e1f';
class BeerList extends Component {

    constructor(props){
        super(props);

        this.state = {
            mouseEnter: false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    onDelete(beerid) {
        this.props.deleteBeer(beerid);
    }


    returnBeerList() {

        return _.map(this.props.beers, beer => {
            return (
                <CSSTransition key={beer.id}
                timeout = {100}
                classNames = 'fade'
                >
                <div key={beer.id} className='row'>
                    <div className='col-sm-2 ' ><ImageComponent beer={beer} /></div>
                    <div className='col-sm-2'>{beer.data.beerName}</div>
                    <div className='col-sm-3 '>< RatingsComponent beerRating={beer.data.rating} beerId={beer.id} /></div>
                    <div className='col-sm-3'>{beer.data.desc}</div>
                    <div className='col-sm-1'><button className='btn btn-danger' onClick={this.onDelete.bind(this, beer.id)}>Delete</button></div>
                </div>
                </CSSTransition>
            )
        })
    }

    handleMouseEnter(){
        if(this.state.mouseEnter)
        this.setState({
            mouseEnter: false
        })
        else
        this.setState({
            mouseEnter: true
        })
    }

    render() {
        if (!hasFetched) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className='listContainer'>
                <div className='text-xs-right'>
        <Link className='theBtn' to='/new' onMouseEnter = { this.handleMouseEnter } onMouseLeave = {this.handleMouseEnter } >{ this.state.mouseEnter ? <img className='beer' src={imgUrl}  /> 
        : <img className='beer' src = 'public/favicon.ico' /> }</Link>
                </div>
                <div className='row headerRow' >
                <div className='col-sm-2' ></div>
                <div className=' header col-sm-2' >Name</div>
                <div className=' header col-sm-3' >Rating</div>
                <div className=' header col-sm-3' >Description</div>
                <div className='col-sm-2' ></div>
                </div>
                <TransitionGroup className='beerList'>
                    {this.returnBeerList()}
                    </TransitionGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { beers: state.beers }
}



export default connect(mapStateToProps, { fetchBeers, updateBeer, deleteBeer })(BeerList);