import axios from 'axios';

export function findUsers(x) {
    return (dispatch) => {
        axios.get('/finduser')
        .then( results => {
            // console.log('CIENT SIDE: ', results.data);
            let users = {};
            users.candidates = results.data.filter(user => user.candidate);
            users.employers = results.data.filter(user => user.employer);
            console.log(users)
            dispatch({
                type: 'ALL_USERS',
                payload: users
               }) 
            }         
        )     
    };
}

export function approveCandidate(id) {
    return (dispatch) => {
        axios.get(`/approveuser/id/${id}`)
        .then( results => {
            console.log('CIENT SIDE: ', results.data);
            // console.log(users)
            dispatch(findUsers('x')) 
            }         
        )     
    };
}

export function blockUser(id) {
    return (dispatch) => {
        axios.get(`/blockuser/id/${id}`)
        .then( results => {
            console.log('CIENT SIDE: ', results.data);
            // console.log(users)
            dispatch(findUsers('x')) 
            }         
        )     
    };
}

export function logout(token) {
    return (dispatch) => {
        axios.get(`/logout/${token}`)
        .then( results => {
            console.log('CLIENT SIDE', results.data);
        })
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

export function employerJobs(id) {
    return (dispatch) => {
        axios.get(`/jobsbyemployerid/${id}`)
            .then(res => {
                dispatch({
                    type: 'EMPLOYERID_JOBS',
                    payload: res.data
                })
            })
    }
}