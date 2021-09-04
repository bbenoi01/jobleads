import { connect } from 'react-redux';
import CandidateLanding from '../components/candidateLanding';

function mapStoreToProps(store) {
    return {
        candidateOption: store.Candidate.candidateOption,
        city: store.Candidate.city,
        jobType: store.Candidate.jobType,
        homeZip: store.Candidate.homeZip,
        distanceToJob: store.Candidate.distanceToJob
    };
}

export default connect(mapStoreToProps)(CandidateLanding);