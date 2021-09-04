import React, { Component } from 'react';
import {findHistory} from '../actions/candidateAction';
import {logout} from '../actions/adminAction';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.history=this.history.bind(this);
        this.logout=this.logout.bind(this);
    }

    history() {
        const { dispatch } = this.props;
        dispatch(findHistory(userId));
    }

    logout() {
        const { dispatch } = this.props;
        dispatch(logout(token));
    }

    render() {
        const { nav, id } = this.props;
        if (nav == 1) {
            return (
                <div className="navbar-fixed">
                    <nav className='white'>
                        <div className="nav-wrapper">
                            <a href={`auth#/User/candidate/${id}`} style={{paddingLeft: '15px'}} className='brand-logo blue-text'>JobLeads</a>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons" id='hiddenNav'>menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href={`auth#/User/candidate/${id}`} className='blue-text'>New Search</a></li>
                                <li><a href={`auth#/User/activity/${id}`} onClick={this.history} className='blue-text'>Activity</a></li>
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                            <ul className="side-nav" id="nav-mobile">
                                <li><a href={`auth#/User/candidate/${id}`} className='blue-text'>New Search</a></li>
                                <li><a href={`auth#/User/activity/candidate/${id}`} onClick={this.history} className='blue-text'>Activity</a></li>
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        } else if (nav == 2) {
            return (
                <div className="navbar-fixed">
                    <nav className='white'>
                        <div className="nav-wrapper">
                            <a href="#/" style={{paddingLeft: '15px'}} className='brand-logo blue-text'>JobLeads</a>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href={`auth#/User/admin/${id}`} className='blue-text'>Candidate View</a></li>
                                <li><a href={`auth#/User/admin/employeradmin/${id}`} className='blue-text'>Employer View</a></li>
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                            <ul className="side-nav" id="nav-mobile">
                                <li><a href={`auth#/User/admin/${id}`} className='blue-text'>Candidate View</a></li>
                                <li><a href={`auth#/User/admin/employeradmin/${id}`} className='blue-text'>Employer View</a></li>
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        } else if (nav == 3) {
            return (
                <div className="navbar-fixed">
                    <nav className='white'>
                        <div className="nav-wrapper">
                            <a style={{paddingLeft: '15px'}} className='brand-logo blue-text'>JobLeads</a>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                            <ul className="side-nav" id="nav-mobile">
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        } else {
            return (
                <div className="navbar-fixed">
                    <nav className='white'>
                        <div className="nav-wrapper">
                            <a href="#/" style={{paddingLeft: '15px'}} className='brand-logo blue-text'>JobLeads</a>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                            <ul className="side-nav" id="nav-mobile">
                                <li><a href="/" className='blue-text' onClick={this.logout}>Sign Out</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }
    }
}





