import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AdminLanding from './index/adminLandingIndex';
import EmployerViewAdmin from './index/employerViewAdminIndex';
import CandidateLanding from './index/candidateLandingIndex';
import CandidateActivity from './index/candidateActivityIndex';
import EmployerLanding from './index/employerLandingIndex';
import JobFilter from './index/jobFilterIndex';
import Navbar from './index/navbarIndex';
import { 
    userType,
    addJobtrack
 } from './actions/appActions';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.jobtrack=this.jobtrack.bind(this);
    }

    componentWillMount() {
        if(approved == 'false'){
            console.log('NOT APPROVED YET');
        } else if(blocked == 'true'){
            console.log('BLOCKED USER');
         }  else {
        const { dispatch } = this.props;
        console.log('LANDED', userId, token, admin, candidate, employer);
        dispatch(userType(userId, token, admin, candidate, employer));
        }
    }

    jobtrack() {
        const { dispatch } = this.props;
        dispatch(addJobtrack(userId));
    }

    render() {
        if (approved == 'false'){
            return (
                <div>
                <Navbar />
                    <div className="center-align">
                        <h1 className='blue-text'>Please Wait for Admin Approval</h1>
                        <h3>
                            In the mean time, please sync your account with your Jobtrack account. <br/>
                            This will allow you to add applied jobs to jobtrack with one click!
                        </h3>
                    </div>
                </div>
            );
        } else if(blocked == 'true') {
            return (
                <div className='center-align'>
                    <h1>You have been blocked.</h1>
                    <h1>Please contact an Admin</h1>
                </div>
            );
        } else {
            return (
                <Router>
                    <div>
                        <Route exact path='/User/candidate/:id' component={CandidateLanding} />
                        <Route exact path='/User/activity/:id' component={CandidateActivity} />
                        <Route exact path='/User/admin/:id' component={AdminLanding} />
                        <Route exact path='/User/admin/employeradmin/:id' component={EmployerViewAdmin} />
                        <Route exact path='/User/employer/:id' component={EmployerLanding} />
                    </div>
                </Router>
            );
        }
    }
}