import axios from 'axios';

export function updateCity(city) {
    return {
        type: 'ADD_CITY',
        payload: city
    };
}

export function jobType(job) {
    return {
        type: 'SELECT_JOB',
        payload: job
    };
}

export function checkbox(type, options, jobs) {
    return (dispatch) => {
        function filterJobs(query) {
            return jobs.filter(function(job) {
                return job.description.replace(/<\/*b>/g,'').toLowerCase().indexOf(query) > -1 ||
                job.jobTitle.toLowerCase().indexOf(query) > -1;
            })
          }
          let a = [], b = [], c = [], d = [], e = [], f = [], both = {};
        if(type == 'front-end'){
            if(!options.frontEnd){options.frontEnd = true} else{options.frontEnd = false}
        }
        if(type == 'back-end'){
            if(!options.backEnd){options.backEnd = true} else{options.backEnd = false}
        }
        if(type == 'full-stack'){
            if(!options.fullStack){options.fullStack = true} else{options.fullStack = false}
        }
        if(options.frontEnd){
            a = filterJobs('front end');
            b = filterJobs('front-end');
        }
        if(options.backEnd){
            c = filterJobs('back end');
            d = filterJobs('back-end');
        }
        if(options.fullStack){
            console.log('in options');
            e = filterJobs('full stack');
            f = filterJobs('full-stack');
        }

        if(!options.frontEnd && !options.backEnd && !options.fullStack){
            both.options = options;
            both.jobs = jobs;
        } else {
            both.options = options;
            both.jobs = a.concat(b,c,d,e,f);
        }
         dispatch({
            type: 'CHECKBOX',
            payload: both
        })
    };
}

export function removeHistory(id, userId) {
    console.log(id);
    return (dispatch) => {
        axios.get(`/history/` + id)
        .then(response => {
            console.log(response.data);
            dispatch(findHistory(userId));
        })
    }
}

export function addHistory(userId, token, jobId, date, type) {
    console.log('H',userId, token, jobId, date, type);
    return (dispatch) => {
        axios.get('/history/' + type + '/userId/' + userId + '/token/' + token + '/jobId/' + jobId + '/date/' + date)
        .then (response => {
            console.log("CLIENT SIDE H: ", response.data);
            if(type == 'applied'){
                alert('Added to Applied Jobs');
                 dispatch(findHistory(userId));
            } else if(type == 'favorite'){
                alert('Added to Favorite Jobs');
                dispatch(findHistory(userId));
            }           
        })
        .catch(err => { console.log(err); alert('Add favorite failed') });
    }
}

export function findHistory(userId) {
    console.log('A',userId);
    return (dispatch) => {
        axios.get('/userId/' + userId)
        .then (response => {
            console.log("HISTORY CLIENT SIDE: ", response.data);
            const jobs = response.data.jobs;
            let history = response.data.history;
            let count = 0
            for(let i = 0; i<history.length; i++){
                // let index = jobs.map(job => job.id).indexOf(history[i].jobId);
                // console.log(count, index);
                history[i].listing = jobs[i];
                // count++;        
              }
            dispatch({
                type: 'ADD_HISTORY',
                payload: history
            })
        })
        .catch(err => { console.log(err); alert('Find Activity failed') });
    }
}


export function getDistanceToAddress(homeZip) {
    return {
        type: 'HOME_ZIP',
        payload: homeZip
    };
}

export function getDistance(homeZip, city) {
    return (dispatch) => {
        axios.get(`/homezip/${homeZip}/destinationcity/${city}`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: 'DISTANCE_TO_JOB',
                payload: res.data
                })
        })
    }
}

export function newSearch(city) {
    console.log({ city });
    return (dispatch) => {
        axios.get('/api/authentic/city/' + encodeURI(city))
        .then (response => {
            console.log("CLIENT SIDE: ", response.data);
            dispatch({
                type: 'JOB_RESULTS',
                payload: response.data
            })
        })
        .catch(err => { console.log(err); alert('Search Unsuccessful') });
    }
}

export function updateModal(details) {
    return {
        type: 'UPDATE_MODAL',
        payload: details
    };
}

export function updateActivityModal(activityDetails) {
    return {
        type: 'UPDATE_ACTIVITY_MODAL',
        payload: activityDetails
    };
}

