const INITIAL_STATE = {
    fullTime: true,
    partTime: false,
    contract: false,
    jobTitle: '',
    company: '',
    jobType: '',
    description: '',
    salary: '',
    city: '',
    state: '',
    url: '',
    isEditing: false,
    editingJobId: ''
};

export default function EmployerReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_JOB_TITLE': {
            return {
                ...state,
                jobTitle: payload
            };
        }

        case 'ADD_COMPANY_NAME': {
            return {
                ...state,
                company: payload
            };
        }

        case 'ADD_JOB_TYPE': {
            return {
                ...state,
                jobType: payload
            };
        }

        case 'ADD_DESCRIPTION': {
            return {
                ...state,
                description: payload
            };
        }

        case 'ADD_SALARY': {
            return {
                ...state,
                salary: payload
            };
        }

        case 'ADD_CITY': {
            return {
                ...state,
                city: payload
            };
        }

        case 'ADD_STATE': {
            return {
                ...state,
                state: payload
            };
        }

        case 'ADD_URL': {
            return {
                ...state,
                url: payload
            };
        }

        case 'FULL_TIME': {
            return {
                ...state,
                fullTime: payload
            };
        }
        
        case 'PART_TIME': {
            return {
                ...state,
                partTime: payload
            };
        }

        case 'CONTRACT': {
            return {
                ...state,
                contract: payload
            };
        }

        case 'EMPLOYERID_JOBS': {
            return {
                ...state,
                employerJobs: payload
            }
        }

        case 'JOB_BEING_EDITED': {
            return {
                ...state,
                editingJobId: payload.id,
                jobTitleEdit: payload.jobTitle,
                companyEdit: payload.companyName,
                jobTypeEdit: payload.jobType,
                descriptionEdit: payload.description,
                salaryEdit: payload.salary,
                cityEdit: payload.city,
                stateEdit: payload.state,
                urlEdit: payload.url,
                fullTimeEdit: payload.fullTime,
                partTimeEdit: payload.partTime,
                contractEdit: payload.contract
            }
        }

        case 'IS_EDITING': {
            return {
                ...state,
                isEditing: payload
            }
        }

        case 'EDIT_JOB_TITLE': {
            return {
                ...state,
                jobTitleEdit: payload
            }
        }

        case 'EDIT_COMPANY': {
            return {
                ...state,
                companyEdit: payload
            }
        }

        case 'EDIT_JOB_TYPE': {
            return {
                ...state,
                jobTypeEdit: payload
            }
        }

        case 'EDIT_DESCRIPTION': {
            return {
                ...state,
                descriptionEdit: payload
            }
        }
        case 'EDIT_SALARY': {
            return {
                ...state,
                salaryEdit: payload
            }
        }

        case 'EDIT_CITY': {
            return {
                ...state,
                cityEdit: payload
            }
        }

        case 'EDIT_STATE': {
            return {
                ...state,
                stateEdit: payload
            }
        }

        case 'EDIT_URL': {
            return {
                ...state,
                urlEdit: payload
            }
        }

        case 'EDIT_FULL_TIME': {
            return {
                ...state,
                fullTimeEdit: payload
            }
        }

        case 'EDIT_PART_TIME': {
            return {
                ...state,
                partTimeEdit: payload
            }
        }

        case 'EDIT_CONTRACT': {
            return {
                ...state,
                editContract: payload
            }
        }

        default: {
            return state;
        }
    }
};