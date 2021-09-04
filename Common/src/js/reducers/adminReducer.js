const INITIAL_STATE = {
    candidates: [],
    employers: [],
    candidateHistory: []
};

export default function AdminReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case 'ALL_USERS': {
            // console.log('AUTHENTIC', payload);
            if (payload) {
                return {
                    ...state,
                    candidates: payload.candidates,
                    employers: payload.employers
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case 'ADD_HISTORY': {
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

        case 'EMPLOYERID_JOBS': {
            if (payload) {
                return {
                    ...state,
                    employerJobs: payload
                };
            } else {
                return {
                    ...state
                };
            }
        } 

        default: {
            return state;
        }
    }
};