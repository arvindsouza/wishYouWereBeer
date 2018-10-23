import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { fetchBeers, updateBeer, deleteBeer, hasFetched } from '../actions';
import RatingsComponent from '../components/ratings';
import ImageComponent from '../components/imageComponent';

class BeerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseEnter: false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    onDelete(beerid, beerImg) {
        this.props.deleteBeer(beerid, beerImg);
    }


    returnBeerList() {

        return _.map(this.props.beers, beer => {
            return (
                <CSSTransition key={beer.id}
                    timeout={300}
                    classNames='fade'
                >
                    <div key={beer.id} className='row'>
                        <div className='col-sm-2 ' ><ImageComponent beer={beer} /></div>
                        <div className='col-sm-2 colItems'>{beer.data.beerName}</div>
                        <div className='col-sm-3 '>< RatingsComponent beerRating={beer.data.rating} beerId={beer.id} /></div>
                        <div className='col-sm-3 colItems'>{beer.data.desc}</div>
                        <div className='col-sm-1'><div className='delete' onClick={this.onDelete.bind(this, beer.id, beer.data.img)}><i className="fas fa-trash-alt fa-2x"></i></div></div>
                    </div>
                </CSSTransition>
            )
        })
    }

    handleMouseEnter() {
        if (this.state.mouseEnter)
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
                    <Link className='theBtn' to='/new' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseEnter} >{this.state.mouseEnter ? <img className='beer' src='Mug.gif' alt='addBeer' />
                        : <img className='beer' src='MugA.png' alt='addBeer' />}</Link>
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