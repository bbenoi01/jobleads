import { connect } from 'react-redux';
import AddEditJob from '../components/addEditJob';

function mapStoreToProps(store) {
    return {
        fullTime: store.Employer.fullTime,
        partTime: store.Employer.partTime,
        contract: store.Employer.contract,
        jobTitle: store.Employer.jobTitle,
        company: store.Employer.company,
        jobType: store.Employer.jobType,
        description: store.Employer.description,
        salary: store.Employer.salary,
        city: store.Employer.city,
        state: store.Employer.state,
        url: store.Employer.url,
        id: store.App.id,
        isEditing: store.Employer.isEditing,
        jobBeingEdited: store.Employer.jobBeingEdited,
        jobTitleEdit: store.Employer.jobTitleEdit,
        companyEdit: store.Employer.companyEdit,
        jobTypeEdit: store.Employer.jobTypeEdit,
        descriptionEdit: store.Employer.descriptionEdit,
        salaryEdit: store.Employer.salaryEdit,
        cityEdit: store.Employer.cityEdit,
        stateEdit: store.Employer.stateEdit,
        urlEdit: store.Employer.urlEdit,
        fullTimeEdit: store.Employer.fullTimeEdit,
        partTimeEdit: store.Employer.partTimeEdit,
        contractEdit: store.Employer.contractEdit,
        editingJobId: store.Employer.editingJobId
    };
}

export default connect(mapStoreToProps)(AddEditJob);