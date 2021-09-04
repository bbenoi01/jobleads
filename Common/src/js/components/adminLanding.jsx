import React, { Component } from 'react';
import Navbar from '../index/navbarIndex';
import { 
    findUsers,
    approveCandidate,
    blockUser,
    findHistory
 } from '../actions/adminAction';

export default class AdminLanding extends Component {
    constructor(props) {
        super(props);

        this.history=this.history.bind(this);
        this.approve = this.approve.bind(this);
        this.block = this.block.bind(this);
    }

    history(e) {
        const { dispatch } = this.props;
        dispatch(findHistory(e.target.title));
    }

    componentWillMount() {
       const { dispatch } = this.props;
       dispatch(findUsers('find'));
    }

    approve(e) {
        const { dispatch } = this.props;
        console.log(e.target.title);
        dispatch(approveCandidate(e.target.title));
    }

    block(e) {
        const { dispatch } = this.props;
        console.log(e.target.title);
        dispatch(blockUser(e.target.title));
    }

    render() {
       const { candidates } = this.props;
       console.log('ALL Candidates: ', candidates);
       let pending = candidates.filter(candidate => !candidate.approved);
       console.log('PENDING: ', pending);
        return (
            <div>
                <Navbar />
                <br/>
                <div className="row">
                    <div className="col s4 offset-s2">
                        <div className="card">
                            <div className="card-title center-align">Pending Candidates</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div className="card-content" id='pendingStudents'>
                            {pending.map(user =>
                                <div className="col s12" key={user.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div> 
                                                <div>Name: {user.full_name == null ? 'No Name Listed': user.full_name}</div>  
                                                <div>Email: {user.email}</div>
                                                <div>id: {user.id}</div>
                                                <div>Blocked: {user.blocked ? 'True': 'False'}</div>
                                                <br/>
                                                <div className="center-align">
                                                    <button onClick={this.approve} title={user.id} className='btn blue waves-effect waves-light' style={{marginRight: '1rem'}}>Approve</button>
                                                    <button onClick={this.block} title={user.id} className='btn blue waves-effect waves-light' style={{marginLeft: '1rem'}}>Block</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card">
                            <div className="card-title center-align">All Candidates</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div className="card-content" id='allStudents'>
                            {candidates.map(user =>
                                <div className="col s12" key={user.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>   
                                                <div>Name: {user.full_name == null ? 'No Name Listed': user.full_name}</div>
                                                <div>Email: {user.email}</div>
                                                <div>id: {user.id}</div>
                                                <div>Blocked: {user.blocked ? 'True': 'False'}</div>
                                                <div className="center-align">
                                                    <a href={`auth#/User/activity/${user.id}`}><button onClick={this.history} title={user.id} className='btn blue waves-effect waves-light' style={{marginRight: '1rem'}}>Activity</button></a>
                                                    <button onClick={this.block} title={user.id} className='btn blue waves-effect waves-light' style={{marginLeft: '1rem'}}>Block</button>
                                                </div>
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