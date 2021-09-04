import { types } from '../actions/appActions';

const INITIAL_STATE = {
    email: '',
    id: '',
    name: '',
    phoneNumber: '',
    nav: ''
};

export default function AppReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case types.CANDIDATE_LOGIN: {
            console.log(321, payload);
            if (payload) {
                window.location.href=`http://localhost:3000/auth#/User/candidate/${payload.id}`;
                return {
                    email: payload.email,
                    id: payload.id,
                    name: payload.full_name,
                    phoneNumber: payload.phoneNumber,
                    nav: 1
                };
            } else {
                return {
                    ...state
                };
            }
            break;
        }
        case types.ADMIN_LOGIN: {
            console.log(654, payload);
            if (payload) {
                window.location.href=`http://localhost:3000/auth#/User/admin/${payload.id}`;
                return {
                    email: payload.email,
                    id: payload.id,
                    name: payload.full_name,
                    phoneNumber: payload.phoneNumber,
                    nav: 2
                };
            } else {
                return {
                    ...state
                };
            }
            break;
        }
        case types.EMPLOYER_LOGIN: {
            console.log(987, payload);
            if (payload) {
                window.location.href=`http://localhost:3000/auth#/User/employer/${payload.id}`;
                return {
                    email: payload.email,
                    id: payload.id,
                    name: payload.full_name,
                    phoneNumber: payload.phoneNumber,
                    nav: 3
                };
            } else {
                return {
                    ...state
                };
            }
            break;
        }
        default: {
            return state;
        }
    }
}