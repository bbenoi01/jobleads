import { connect } from 'react-redux';
import CandidateActivity from '../components/candidateActivity';

function mapStoreToProps(store) {
    return {
        candidateHistory: store.Candidate.candidateHistory,
        activityDetails: store.Candidate.activityDetails
    };
}

export default connect(mapStoreToProps)(CandidateActivity);