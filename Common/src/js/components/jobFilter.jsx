import React, { Component } from 'react';
import candidateLanding from '../index/candidateLandingIndex';
import jobSearch from '../index/jobSearchIndex';
import {
    // jobType,
    // updatefront-end,
    checkbox,
    getDistance,
    getDistanceToAddress
} from '../actions/candidateAction';

export default class JobFilter extends Component {
    constructor(props) {
        super(props);

    this.onAddressChange = this.onAddressChange.bind(this);
    this.distanceToJob = this.distanceToJob.bind(this);
    this.checkbox = this.checkbox.bind(this);
    }

    checkbox(e) {
        const { dispatch, frontEnd, backEnd, fullStack, jobResults } = this.props;
        // console.log(e.target.id);
        const filters = {
            frontEnd : frontEnd,
            backEnd : backEnd,
            fullStack : fullStack
        }
        dispatch(checkbox(e.target.id, filters, jobResults));
    }

    onAddressChange(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(getDistanceToAddress(value));
    }

    distanceToJob() {
        const { dispatch, homeZip, city } = this.props;
        dispatch(getDistance(homeZip, city));
    }

    render() {
        const { homeZip, distanceToJob } = this.props;
        return(  
            <div className="card-content">
                <div>
                    <input onChange={this.checkbox} className='filled-in' type="checkbox" id='front-end' />
                    <label htmlFor="front-end">Front End</label>
                </div>
                <div>
                    <input onChange={this.checkbox} className='filled-in' type="checkbox" id='back-end' />
                    <label htmlFor="back-end">Back End</label>
                </div>
                <div>
                    <input onChange={this.checkbox} className='filled-in' type="checkbox" id='full-stack' />
                    <label htmlFor="full-stack">Full Stack</label>
                </div>
                <div className="input-field">
                    <input type="text" id='candidate-zip' onChange={this.onAddressChange}/>
                    <label htmlFor="home-zip">Home Zip Code</label>
                </div>
                <div className='center-align'>
                    <button className="btn blue waves-effect waves-light" onClick={this.distanceToJob}>Search Distance</button>
                </div>
                <br/>
                <p>{this.props.distanceToJob 
                    ? 
                    "Your job results are an estimated " + distanceToJob + " away."
                    :
                    ""
                    }</p>
            </div>
        );
    }
}