import React, { Component } from 'react';
import Navbar from '../index/navbarIndex';
import { 
    addHistory,
    removeHistory,
    updateActivityModal,
 } from '../actions/candidateAction';

const timeDisplay = (x) => {
    x = x.slice(0,x.indexOf('T')).split('-');
    return x[1] + '-' + x[2] + '-' + x[0];
}

export default class CandidateActivity extends Component {
    constructor(props) {
        super(props);

        this.applied = this.applied.bind(this);
        this.favorite = this.favorite.bind(this);
        this.remove = this.remove.bind(this);
        this.handleActivityModal = this.handleActivityModal.bind(this);
    }

    applied(e) {
        const { dispatch } = this.props;
        const date = new Date();
        const id = e.target.title;
        const type = 'applied';
        console.log('A', id, date);
        dispatch(addHistory(userId, token, id, date, type));
    }

    favorite(e) {
        const { dispatch, jobResults } = this.props;
        const date = new Date();
        const id = e.target.title;
        const type = 'favorite';
        console.log('F', id, date);
        dispatch(addHistory(userId, token, id, date, type));
    }

    remove(e) {
        const { dispatch } = this.props;
        const id = e.target.title;
        dispatch(removeHistory(id, userId));
    }

    handleActivityModal(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(updateActivityModal(e.target.dataset.url));
    }

    render() {
        const { candidateHistory, activityDetails } = this.props;
        console.log(candidateHistory);
        const applied = candidateHistory.filter(history => history.applied === true);
        const favorite = candidateHistory.filter(history => history.applied === false && history.favorite === true);
        console.log(favorite);
        const viewed = candidateHistory.filter(history => history.applied === false && history.favorite === false);
        
        applied.sort((a,b)=> {
            return new Date(b.dateTime) - new Date(a.dateTime);
        });
        favorite.sort((a,b)=> {
            return new Date(b.dateTime) - new Date(a.dateTime);
        });
        viewed.sort((a,b)=> {
            return new Date(b.dateTime) - new Date(a.dateTime);
        });
        // console.log(12, applied);
        // console.log(21, favorite);
        // console.log(22, viewed);
        console.log('new modal', activityDetails);
        return (
            <div>
                <Navbar />
                <br/>
                <div className="row">
                    <div className="col s4">
                        <div className="card">
                            <div className="card-title center-align black-text">Viewed</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div id='viewed'>
                                {viewed.map(viewed => 
                                    <div className="col s12" key={viewed.listing.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>
                                                <p><b>Title:</b> {viewed.listing.jobTitle}</p>
                                                <p><b>Company:</b> {viewed.listing.companyName}</p>
                                                <p><b>Location:</b> {viewed.listing.city + ", " + viewed.listing.state}</p>
                                                <p><b>Posted:</b> {Math.floor((moment()._d - moment(viewed.listing.datePosted)._d) / 86400000) === 0 ? "Posted today!" : Math.floor((moment()._d - moment(viewed.listing.datePosted)._d) / 86400000) === 1 ? "1 day ago." : Math.floor((moment()._d - moment(viewed.listing.datePosted)._d) / 86400000) + " days ago."}</p>
                                                <p><b>Snippet:</b> <span>{viewed.listing.description.replace(/<\/*b>/g,'')}</span></p>
                                                <p><b>More Info:</b> <a data-url={viewed.listing.sourceUrl} className="modal-trigger" href="#activitydetails" onClick={this.handleActivityModal}>Follow Me To Your Dream Job!</a></p>
                                                <p><b>Viewed: </b>{ timeDisplay(viewed.dateTime) }</p>
                                                <button onClick={this.favorite} title={viewed.listing.id}>Favorite</button>
                                                <button onClick={this.applied} title={viewed.listing.id}>Apply</button>
                                                <button onClick={this.remove} title={viewed.id}>Remove</button>
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
                            <div className="card-title center-align black-text">Favorites</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div id='fav'>
                                {favorite.map(favorite => 
                                    <div className="col s12" key={favorite.listing.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>
                                                <p><b>Title:</b> {favorite.listing.jobTitle}</p>
                                                <p><b>Company:</b> {favorite.listing.companyName}</p>
                                                <p><b>Location:</b> {favorite.listing.city + ", " + favorite.listing.state}</p>
                                                <p><b>Posted:</b> {Math.floor((moment()._d - moment(favorite.listing.datePosted)._d) / 86400000) === 0 ? "Posted today!" : Math.floor((moment()._d - moment(favorite.listing.datePosted)._d) / 86400000) === 1 ? "1 day ago." : Math.floor((moment()._d - moment(favorite.listing.datePosted)._d) / 86400000) + " days ago."}</p>
                                                <p><b>Snippet:</b> <span>{favorite.listing.description.replace(/<\/*b>/g,'')}</span></p>
                                                <p><b>More Info:</b> <a data-url={favorite.listing.sourceUrl} className="modal-trigger" href="#activitydetails" onClick={this.handleActivityModal}>Follow Me To Your Dream Job!</a></p>
                                                <p><b>Favorited: </b>{ timeDisplay(favorite.dateTime) }</p>
                                                <button onClick={this.applied} title={favorite.listing.id}>Apply</button>
                                                <button onClick={this.remove} title={favorite.id}>Remove</button>
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
                            <div className="card-title center-align black-text">Applied</div>
                            <hr style={{borderBottom: '0px'}}/>
                            <div id='applied'>
                            {applied.map(applied => 
                                    <div className="col s12" key={applied.listing.id}>
                                    <div className="card">
                                        <div className="card-content">
                                            <div>
                                                <p><b>Title:</b> {applied.listing.jobTitle}</p>
                                                <p><b>Company:</b> {applied.listing.companyName}</p>
                                                <p><b>Location:</b> {applied.listing.city + ", " + applied.listing.state}</p>
                                                <p><b>Posted:</b> {Math.floor((moment()._d - moment(applied.listing.datePosted)._d) / 86400000) === 0 ? "Posted today!" : Math.floor((moment()._d - moment(applied.listing.datePosted)._d) / 86400000) === 1 ? "1 day ago." : Math.floor((moment()._d - moment(applied.listing.datePosted)._d) / 86400000) + " days ago."}</p>
                                                <p><b>Snippet:</b> <span>{applied.listing.description.replace(/<\/*b>/g,'')}</span></p>
                                                <p><b>More Info:</b> <a data-url={applied.listing.sourceUrl} className="modal-trigger" href="#activitydetails" onClick={this.handleActivityModal}>Follow Me To Your Dream Job!</a></p>
                                                <p><b>Applied: </b>{ timeDisplay(applied.dateTime) }</p>
                                                <button onClick={this.remove} title={applied.id}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                                <div id="activitydetails" className="modal">
                                    <div className="modal-content">
                                        <iframe id='activitydetails' height='80%' width='100%' src={activityDetails} sandbox='allow-same-origin allow-forms allow-pointer-lock allow-popups allow-scripts allow-top-navigation allow-presentation' style={{border: 'none'}} name='activitydetails'>
                                            Go to site
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}