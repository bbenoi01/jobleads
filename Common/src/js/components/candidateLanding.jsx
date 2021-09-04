import React, { Component } from 'react';
import Navbar from '../index/navbarIndex';
import JobSearch from '../index/jobSearchIndex';
// import CandidateActivity from '../index/candidateActivityIndex';

export default class CandidateLanding extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="">
                    <div className="row">
                        <div className="col s12">
                            <JobSearch />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}