import React, { Component } from 'react';
import JobFilter from '../index/jobFilterIndex';
import axios from 'axios';
import {
    jobType,
    updateCity,
    newSearch,
    addHistory,
    getDistance,
    updateModal
    // addApplied
} from '../actions/candidateAction';

export default class JobSearch extends Component {
    constructor(props) {
        super(props);

        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.favorite = this.favorite.bind(this);
        this.applied = this.applied.bind(this);
        // this.viewed = this.viewed.bind(this);
        this.deleteJobs = this.deleteJobs.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    deleteJobs() {
        var count = 0;
        axios.get('http://localhost:3000/api/Jobs')
            .then((results) => {
                results.data.map((jobDelete) => {
                    count++
                    axios.delete(`http://localhost:3000/api/Jobs/${jobDelete.id}`)
                    console.log(count + " jobs deleted")
                });
            })
    }

    handleCityInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(updateCity(value));
    }

    handleSearchClick(event) {
        event.preventDefault();
        let { dispatch, city } = this.props;
        city = city.toLowerCase();
        dispatch(newSearch(city));
    }

    favorite(e) {
        const { dispatch, jobResults } = this.props;
        const date = new Date();
        const id = e.target.title;
        const type = 'favorite';
        console.log('F', id, date);
        dispatch(addHistory(userId, token, id, date, type));
    }

    applied(e) {
        const { dispatch, jobResults } = this.props;
        const date = new Date();
        const id = e.target.title;
        const type = 'applied';
        console.log('A', id, date);
        dispatch(addHistory(userId, token, id, date, type));
    }

    // viewed(e) {
    //     const { dispatch, jobResults } = this.props;
    //     const date = new Date();
    //     const id = e.target.title;
    //     const type = 'viewed';
    //     console.log('A', id, date);
    //     dispatch(addHistory(userId, token, id, date, type));
    // }

    handleModal(e) {
        e.preventDefault();
        const { dispatch, jobResults } = this.props;
        const date = new Date();
        const id = e.target.title;
        const type = 'viewed';
        console.log('A', id, date);
        dispatch(addHistory(userId, token, id, date, type));
        dispatch(updateModal(e.target.dataset.url));
    }

    render() {
        console.log(this.props);
        const { city, jobType, jobResults, filterResults, details } = this.props;
        filterResults.sort((a,b)=> {
            return (moment()._d - moment(a.datePosted)._d) - (moment()._d - moment(b.datePosted)._d);
        });
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSearchClick}>
                        <br />
                        <div className="row">
                            <div className="col s4 offset-s2">
                                <h5>Search for Web Developer Jobs in...</h5>
                            </div>
                            <div className="input-field col s3">
                                <input id="location" type="text" className="validate" value={city} onChange={this.handleCityInput} />
                                <label htmlFor="location">City</label>
                            </div>
                            <div>
                                <a href="#/"><button className="btn blue waves-effect waves-light" type='submit' style={{marginTop: '20px'}}><i className="material-icons left">send</i>Search</button></a>
                            </div>
                        </div>
                    </form>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col s2 offset-s2">
                        <div className="card" id='filter'>
                            <div className="card-title center-align balck-text">Filter By:</div>
                            <hr />
                            <JobFilter />
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card">
                            <div className='card-title center-align black-text'>Search Results</div>
                        <hr style={{borderBottom: '0px'}}/>
                        </div>
                        {/* <button onClick={this.deleteJobs}>DELETE JOBS</button> */}
                        {filterResults.map((jobs, index) =>
                            <div className="col s12" key={jobs.id}>
                                <div className="card">
                                    <div className="card-content">
                                        <span>
                                            <div className="favorite" onClick={this.favorite} ><i className="fa fa-heart fa-lg right" title={jobs.id} aria-hidden="true"></i></div>
                                            <div className="applied" onClick={this.applied}><i className="fa fa-check-square fa-lg right" title={jobs.id} aria-hidden="true"></i></div>
                                        </span>
                                        <div>
                                            <p><b>Title:</b> {jobs.jobTitle}</p>
                                            <p><b>Company:</b> {jobs.companyName}</p>
                                            <p><b>Location:</b> {jobs.city + ", " + jobs.state}</p>
                                            <p><b>Posted:</b> {Math.floor((moment()._d - moment(jobs.datePosted)._d) / 86400000) === 0 ? "Posted today!" : Math.floor((moment()._d - moment(jobs.datePosted)._d) / 86400000) === 1 ? "1 day ago." : Math.floor((moment()._d - moment(jobs.datePosted)._d) / 86400000) + " days ago."}</p>
                                            <p><b>Snippet:</b> <span>{jobs.description.replace(/<\/*b>/g,'')}</span></p>
                                            <br/>
                                            <div className="center-align">
                                                <a data-url={jobs.sourceUrl} title={jobs.id} className="modal-trigger btn blue waves-effect waves-light" href="#details" onClick={this.handleModal}>More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div id="details" className="modal">
                            <div className="modal-content center-align">
                                {/* <object data={details} type="text/html" height='90%' width='99%' style={{overflow: 'auto'}}>Unable to load page <a href={details} target='_blank'>Go To Site. </a>WARNING: following this link will take you away from the JobLeads website.</object> */}
                                WARNING: By clicking this button, you are leaving the JobLeads website.
                                <a href={details} target='_blank' className='modal-action modal-close btn blue waves-effect waves-light'>Go!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
