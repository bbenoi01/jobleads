import { connect } from 'react-redux';
import JobFilter from '../components/jobFilter';

function mapStoreToProps(store) {
    return {
        city: store.Candidate.city,
        jobType: store.Candidate.jobType,
        jobResults: store.Candidate.jobResults,
        frontEnd: store.Candidate.frontEnd,
        backEnd: store.Candidate.backEnd,
        fullStack: store.Candidate.fullStack,
        filterResults: store.Candidate.filterResults,
        homeZip: store.Candidate.homeZip,
        distanceToJob: store.Candidate.distanceToJob
    };
}

export default connect(mapStoreToProps)(JobFilter);