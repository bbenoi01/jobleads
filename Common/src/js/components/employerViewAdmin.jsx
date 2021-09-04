import React, { Component } from 'react';
import Navbar from '../index/navbarIndex';
import { 
    // findUsers,
    blockUser,
    employerJobs
 } from '../actions/adminAction';

export default class EmployerViewAdmin extends Component {
    constructor(props) {
        super(props);

        this.block = this.block.bind(this);
        this.getEmployerJobs = this.getEmployerJobs.bind(this);
    }

    block(e) {
        const { dispatch } = this.props;
        console.log(e.target.title);
        dispatch(blockUser(e.target.title));
    }

    getEmployerJobs(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(employerJobs(e.target.title))
    }

    render() {
        const { employers, employerJobs } = this.props;
        console.log('EMPLOYERS: ', employers);
        return (
            <div>
                <Navbar />
                <br/>
                <div className="row">
                    <div className="col s4 offset-s2">
                        <div className="card">
                            <div className="card-title center-align">All Employers</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div className="card-content" id='allEmp'>
                            {employers.map(user =>
                                <div className='col s12' key={user.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>
                                                <div>Name: {user.full_name == null ? 'No Name Listed': user.full_name}</div>
                                                <div>Email: {user.email}</div>
                                                <div>Id: {user.id}</div>
                                                <div>Blocked: {user.blocked ? 'True': 'False'}</div>
                                                <br/>
                                                <div className="center-align">
                                                    <button onClick={this.block} title={user.id} className='btn blue waves-effect waves-light' style={{marginRight: '1rem'}}>Block</button>
                                                    <button onClick={this.getEmployerJobs} title={user.id} className='btn blue waves-effect waves-light' style={{marginLeft: '1rem'}}>View Listed Jobs</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card">
                            <div className="card-title center-align">Posted Jobs</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div className="card-content" id='postedJobs'>
                            {!!employerJobs && employerJobs.filter(jobs => jobs.hidden === false || jobs.hidden === true).map(jobs =>
                                <div className='col s12' key={jobs.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>
                                                <p><b>Title:</b> {jobs.jobTitle}</p>
                                                <p><b>Company:</b> {jobs.companyName}</p>
                                                <p><b>Job Type:</b> {jobs.jobType}</p>
                                                <p><b>Date Posted:</b> {jobs.datePosted}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}