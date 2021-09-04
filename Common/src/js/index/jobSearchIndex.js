import { connect } from 'react-redux';
import JobSearch from '../components/jobSearch';

function mapStoreToProps(store) {
    return {
        city: store.Candidate.city,
        jobType: store.Candidate.jobType,
        jobResults: store.Candidate.jobResults,
        filterResults: store.Candidate.filterResults,
        homeZip: store.Candidate.homeZip,
        distanceToJob: store.Candidate.distanceToJob,
        details: store.Candidate.details
    };
}

export default connect(mapStoreToProps)(JobSearch);