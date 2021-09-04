import axios from 'axios';

export function jobTitleInput(jobTitle) {
    return {
        type: 'ADD_JOB_TITLE',
        payload: jobTitle
    };
}

export function companyInput(company) {
    return {
        type: 'ADD_COMPANY_NAME',
        payload: company
    };
}

export function jobTypeToggle(jobType) {
    return {
        type: 'ADD_JOB_TYPE',
        payload: jobType
    };
}

export function descriptionInput(description) {
    return {
        type: 'ADD_DESCRIPTION',
        payload: description
    };
}

export function salaryInput(salary) {
    return {
        type: 'ADD_SALARY',
        payload: salary
    };
}

export function cityInput(city) {
    return {
        type: 'ADD_CITY',
        payload: city
    };
}

export function stateInput(state) {
    return {
        type: 'ADD_STATE',
        payload: state
    };
}

export function urlInput(url) {
    return {
        type: 'ADD_URL',
        payload: url
    };
}

export function fullTime(checked) {
    return {
        type: 'FULL_TIME',
        payload: checked
    }
}

export function partTime(checked) {
    return {
        type: 'PART_TIME',
        payload: checked
    }
}

export function contract(checked) {
    return {
        type: 'CONTRACT',
        payload: checked
    }
}

export function newEmployerJob(fullTime, partTime, contract, jobTitle, company, jobType, description, salary, city, state, url, id) {
    return (dispatch) => {
        axios.get(`/fulltime/${fullTime}/parttime/${partTime}/contract/${contract}/jobtitle/${jobTitle}/company/${company}/jobtype/${jobType}/description/${description}/salary/${salary}/city/${city}/state/${state}/url/${url}/id/${id}`)
            .then(response => {
                alert("Your job has been added successfully.")
            })
        axios.get(`/jobsbyemployerid/${id}`)
            .then(results => {
                dispatch({
                    type: 'EMPLOYERID_JOBS',
                    payload: results.data
                })
            })
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

export function editJob(jobBeingEdited, isEditing) {
    return (dispatch) => {
        dispatch({
            type: 'JOB_BEING_EDITED',
            payload: jobBeingEdited
        }),
            dispatch({
                type: 'IS_EDITING',
                payload: isEditing
            })
    }
}

export function archiveJob(id) {
    return (dispatch) => {
        axios.get(`/archivejob/${id}`)
            .then(res => {
                alert("Job has been successfully archived.")
                dispatch(employerJobs(res.data.userId))
            })

    }
}

export function editEmployerJob(fullTime, partTime, contract, jobTitle, company, jobType, description, salary, city, state, url, id, jobId) {
    return (dispatch) => {
        axios.get(`/editemployerjob/fulltime/${fullTime}/parttime/${partTime}/contract/${contract}/jobtitle/${jobTitle}/company/${company}/jobtype/${jobType}/description/${description}/salary/${salary}/city/${city}/state/${state}/url/${url}/id/${id}/jobid/${jobId}`)
            .then(res => {
                let isEditingUpdate = false;
                alert("Job has been successfully updated.")
                dispatch({
                    type: 'IS_EDITING',
                    payload: isEditingUpdate
                })
                axios.get(`/jobsbyemployerid/${id}`)
                    .then(results => {
                        dispatch({
                            type: 'EMPLOYERID_JOBS',
                            payload: results.data
                        })
                    })
            })
    }
}

export function editJobTitleInput(value) {
    return {
        type: 'EDIT_JOB_TITLE',
        payload: value
    }
}

export function editCompanyInput(value) {
    return {
        type: 'EDIT_COMPANY',
        payload: value
    }
}

export function editJobTypeToggle(value) {
    return {
        type: 'EDIT_JOB_TYPE',
        payload: value
    }
}

export function editDescriptionInput(value) {
    return {
        type: 'EDIT_DESCRIPTION',
        payload: value
    }
}

export function editSalaryInput(value) {
    return {
        type: 'EDIT_SALARY',
        payload: value
    }
}

export function editCityInput(value) {
    return {
        type: 'EDIT_CITY',
        payload: value
    }
}

export function editStateInput(value) {
    return {
        type: 'EDIT_STATE',
        payload: value
    }
}

export function editUrlInput(value) {
    return {
        type: 'EDIT_URL',
        payload: value
    }
}

export function editFullTime(checked) {
    return {
        type: 'EDIT_FULL_TIME',
        payload: checked
    }
}

export function editPartTime(checked) {
    return {
        type: 'EDIT_PART_TIME',
        payload: checked
    }
}

export function editContract(checked) {
    return {
        type: 'EDIT_CONTRACT',
        payload: checked
    }
}
