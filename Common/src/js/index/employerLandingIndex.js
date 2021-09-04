import { connect } from 'react-redux';
import EmployerLanding from '../components/employerLanding';

function mapStoreToProps(store) {
    return {
        employerOption: store.Employer.employerOption,
        employerJobs: store.Employer.employerJobs,
        id: store.App.id,
        jobBeingEdited: store.Employer.jobBeingEdited,
        isEditing: store.Employer.isEditing
    }
}

export default connect(mapStoreToProps)(EmployerLanding);