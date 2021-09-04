import React, { Component } from 'react';
import Navbar from '../index/navbarIndex';
import AddEditJob from '../index/addEditJobIndex';
import { employerJobs, editJob, archiveJob, isEditing } from '../actions/employerAction';
import employerJobsIndex from '../index/employerLandingIndex';

const timeDisplay = (x) => {
    let y = x.split('-');
    return y[1]+'-'+y[2]+'-'+y[0];
}

export default class EmployerLanding extends Component {
    constructor(props) {
        super(props);

        this.editJobClick = this.editJobClick.bind(this);
        this.archiveJobClick = this.archiveJobClick.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(employerJobs(userId))
    }
    
    editJobClick(e) {
        e.preventDefault();
        const { dispatch, employerJobs } = this.props;
        const { title } = e.target;
        let isEditing = true;
        let jobBeingEdited = employerJobs.filter(job => job.id === title)
        dispatch(editJob(jobBeingEdited[0], isEditing));
    }

    archiveJobClick(e) {
        const { dispatch } = this.props;
        const { title } = e.target;
        console.log(title);
        dispatch(archiveJob(title))
    }

    render() {
        const { employerJobs } = this.props;
        return (
            <div>
                <Navbar />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col s6">
                            <div className="card" id='empPosted'>
                                <div className="card-title center-align">Posted Jobs</div>
                                <hr style={{borderBottom: '0px', marginBottom: '0px'}}/>
                                <div className="card-content" id='postedJobs'>
                                    {!!employerJobs && employerJobs.filter(jobs => jobs.hidden === false).map(jobs =>
                                        <div className="col s12" key={jobs.id}>
                                            <div className="card">
                                                <div className="card-content">
                                                    <div>
                                                        <p><b>Title:</b> {jobs.jobTitle}</p>
                                                        <p><b>Company:</b> {jobs.companyName}</p>
                                                        <p><b>Job Type:</b> {jobs.jobType.split('+').join(' ')}</p>
                                                        {/* <p><b>Date Posted:</b> {timeDisplay(jobs.datePosted)}</p> */}
                                                    </div>
                                                </div>
                                                <div className="card-action center-align">
                                                    <button onClick={this.editJobClick} className='btn blue waves-effect waves-light' title={jobs.id} style={{marginRight: '1rem'}}>Edit Job</button>
                                                    <button onClick={this.archiveJobClick} className='btn blue waves-effect waves-light' style={{marginLeft: '1rem'}} title={jobs.id}>Archive Job</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="center-align">
                                        {/* <button onClick={this.getEmployerJobs} className='btn blue waves-effect waves-light'>View Listed Jobs</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AddEditJob />
                    </div>
                </div>
            </div>
        );
    }
}