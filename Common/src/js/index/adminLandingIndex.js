import { connect } from 'react-redux';
import AdminLanding from '../components/adminLanding';

function mapStoreToProps(store) {
    return {
        candidates: store.Admin.candidates,
        employers: store.Admin.employers,
        candidateHistory: store.Admin.candidateHistory
    };
}

export default connect(mapStoreToProps)(AdminLanding);