import axios from 'axios';

export const types = {
    CANDIDATE_LOGIN: 'CANDIDATE_LOGIN',
    ADMIN_LOGIN: 'ADMIN_LOGIN',
    EMPLOYER_LOGIN: 'EMPLOYER_LOGIN'
}

export function userType(userId, token, admin, candidate, employer) {
    console.log(23, userId, token, admin, candidate, employer);
    return (dispatch) => {
        if (candidate == 'true') {
            axios.get('http://localhost:3000/api/users/' + userId + '?access_token=' + token)
                .then(results => { console.log(results.data, token);
                    dispatch({
                        type: types.CANDIDATE_LOGIN,
                        payload: results.data
                    })
                })
                .catch(err => { console.log(err); alert('Error') });
        } else if (admin == 'true') {
            axios.get('http://localhost:3000/api/users/' + userId + '?access_token=' + token)
                .then(results => {
                    dispatch({
                        type: types.ADMIN_LOGIN,
                        payload: results.data
                    })
                })
                .catch(err => { console.log(err); alert('Error') });
        } else if (employer = 'true') {
            axios.get('http://localhost:3000/api/users/' + userId + '?access_token=' + token)
                .then(results => {
                    dispatch({
                        type: types.EMPLOYER_LOGIN,
                        payload: results.data
                    })
                })
                .catch(err => { console.log(err); alert('Error') });
        }
    }
}

export function addJobtrack(id) {
    return (dispatch) => {
        axios.get('/auth/jobtrack')
        .then(results=>{
            console.log(results.data);
        })
    }
}