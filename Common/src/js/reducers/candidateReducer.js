import _ from 'lodash';

const INITIAL_STATE = {
    city: '',
    jobType: '',
    jobResults: [],
    filterResults: [],
    candidateHistory: [],
    homeZip: '',
    details: '',
    activityDetails: '',
    frontEnd: false,
    backEnd: false,
    fullStack: false
};

export default function CandidateReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case 'JOB_RESULTS': {
            // console.log('AUTHENTIC', payload);
            if (payload) {
                return {
                    ...state,
                    jobResults: 
                    _.uniqBy(payload, 'apiId'),
                    filterResults:
                    _.uniqBy(payload, 'apiId')
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case 'ADD_HISTORY': {
            // console.log('AUTHENTIC', payload);
            if (payload) {
                return {
                    ...state,
                    candidateHistory: payload
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case 'CHECKBOX': {
            return {
                ...state,
                frontEnd: payload.options.frontEnd,
                backEnd: payload.options.backEnd,
                fullStack: payload.options.fullStack,
                filterResults:
                _.uniqBy(payload.jobs, 'id')
            };
        }

        case 'ADD_CITY': {
            return {
                ...state,
                city: payload,
            };
        }

        case 'SELECT_JOB': {
            return {
                ...state,
                jobType: payload,
            };
        }

        case 'HOME_ZIP': {
            return {
                ...state,
                homeZip: payload,
            }
        }

        case 'DISTANCE_TO_JOB': {
            return {
                ...state,
                distanceToJob: payload
            }
        }

        case 'UPDATE_MODAL': {
            console.log(payload);
            return {
                ...state,
                details: payload
            }
        }

        case 'UPDATE_ACTIVITY_MODAL': {
            console.log(payload);
            return {
                ...state,
                activityDetails: payload
            }
        }

        default: {
            return state;
        }
    }
}