import { combineReducers } from 'redux';
import AppReducer from './reducers/appReducer';
import CandidateReducer from './reducers/candidateReducer';
import EmployerReducer from './reducers/employerReducer';
import AdminReducer from './reducers/adminReducer';

const rootReducer = combineReducers({
    App: AppReducer,
    Candidate: CandidateReducer,
    Employer: EmployerReducer,
    Admin: AdminReducer
})

export default rootReducer;