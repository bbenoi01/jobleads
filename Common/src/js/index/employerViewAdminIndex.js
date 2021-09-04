import { connect } from 'react-redux';
import EmployerViewAdmin from '../components/employerViewAdmin';

function mapStoreToProps(store) {
    return {
        candidates: store.Admin.candidates,
        employers: store.Admin.employers,
        employerJobs: store.Admin.employerJobs
    }
}

export default connect(mapStoreToProps)(EmployerViewAdmin);