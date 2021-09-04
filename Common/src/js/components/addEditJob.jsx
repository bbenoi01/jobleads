import React, { Component } from 'react';
import axios from 'axios';
import {
    jobTitleInput,
    companyInput,
    jobTypeToggle,
    descriptionInput,
    salaryInput,
    cityInput,
    stateInput,
    urlInput,
    newEmployerJob,
    fullTime,
    partTime,
    contract,
    editEmployerJob,
    editJobTitleInput,
    editCompanyInput,
    editJobTypeToggle,
    editDescriptionInput,
    editSalaryInput,
    editCityInput,
    editStateInput,
    editUrlInput,
    editNewEmployerJob,
    editFullTime,
    editPartTime,
    editContract
} from '../actions/employerAction';

export default class AddEditJob extends Component {
    constructor(props) {
        super(props);

        this.handleJobTitleInput = this.handleJobTitleInput.bind(this);
        this.handleCompanyInput = this.handleCompanyInput.bind(this);
        this.handleJobTypeToggle = this.handleJobTypeToggle.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handleSalaryInput = this.handleSalaryInput.bind(this);
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleStateInput = this.handleStateInput.bind(this);
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fullTimeCheckbox = this.fullTimeCheckbox.bind(this);
        this.partTimeCheckbox = this.partTimeCheckbox.bind(this);
        this.contractCheckbox = this.contractCheckbox.bind(this);
        this.handleEditJobTitleInput = this.handleEditJobTitleInput.bind(this);
        this.handleEditCompanyInput = this.handleEditCompanyInput.bind(this);
        this.handleEditJobTypeToggle = this.handleEditJobTypeToggle.bind(this);
        this.handleEditDescriptionInput = this.handleEditDescriptionInput.bind(this);
        this.handleEditSalaryInput = this.handleEditSalaryInput.bind(this);
        this.handleEditCityInput = this.handleEditCityInput.bind(this);
        this.handleEditStateInput = this.handleEditStateInput.bind(this);
        this.handleEditUrlInput = this.handleEditUrlInput.bind(this);
        this.fullTimeEditCheckbox = this.fullTimeEditCheckbox.bind(this);
        this.partTimeEditCheckbox = this.partTimeEditCheckbox.bind(this);
        this.contractEditCheckbox = this.contractEditCheckbox.bind(this);
    }

    //ADDING NEW JOB: 

    handleJobTitleInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(jobTitleInput(value));
    }

    handleCompanyInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(companyInput(value));
    }

    handleJobTypeToggle(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(jobTypeToggle(value));
    }

    handleDescriptionInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(descriptionInput(value));
    }

    handleSalaryInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(salaryInput(value));
    }

    handleCityInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(cityInput(value));
    }

    handleStateInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(stateInput(value));
    }

    handleUrlInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(urlInput(value));
    }

    fullTimeCheckbox(event) {
        const { dispatch } = this.props;
        const { checked } = event.target;
        dispatch(fullTime(checked));
    }

    partTimeCheckbox(event) {
        const { dispatch } = this.props;
        const { checked } = event.target;
        dispatch(partTime(checked));
    }

    contractCheckbox(event) {
        const { dispatch } = this.props;
        const { checked } = event.target;
        dispatch(contract(checked));
    }

    //JOB BEING EDITED:

    handleEditJobTitleInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editJobTitleInput(value));
    }

    handleEditCompanyInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editCompanyInput(value));
    }

    handleEditJobTypeToggle(event) {
        const { dispatch,jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editJobTypeToggle(value));
    }

    handleEditDescriptionInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editDescriptionInput(value));
    }

    handleEditSalaryInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editSalaryInput(value));
    }

    handleEditCityInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editCityInput(value));
    }

    handleEditStateInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editStateInput(value));
    }

    handleEditUrlInput(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { value } = event.target;
        dispatch(editUrlInput(value));
    }

    fullTimeEditCheckbox(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { checked } = event.target;
        dispatch(editFullTime(checked));
    }

    partTimeEditCheckbox(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { checked } = event.target;
        dispatch(editPartTime(checked));
    }

    contractEditCheckbox(event) {
        const { dispatch, jobBeingEdited } = this.props;
        const { checked } = event.target;
        dispatch(editContract(checked));
    }

    handleClick(event) {
        event.preventDefault();
        const { dispatch, fullTime, partTime, contract, jobTitle, company, jobType, description, salary, city, state, url, id, jobBeingEdited, isEditing, jobTitleEdit, companyEdit, jobTypeEdit, descriptionEdit, salaryEdit, cityEdit, stateEdit, urlEdit, fullTimeEdit, partTimeEdit, contractEdit, editingJobId } = this.props;
        if (isEditing === true) {
            console.log(id, editingJobId);
            dispatch(editEmployerJob(fullTimeEdit, partTimeEdit, contractEdit, jobTitleEdit, companyEdit, jobTypeEdit, descriptionEdit, salaryEdit, cityEdit, stateEdit, urlEdit, id, editingJobId))
        } else {
            dispatch(newEmployerJob(fullTime, partTime, contract, jobTitle, company, jobType, description, salary, city, state, url, id))
        }
    }

    render() {
        const { jobTitle, company, jobType, description, salary, city, state, url, isEditing, jobBeingEdited, jobTitleEdit, companyEdit, jobTypeEdit, descriptionEdit, salaryEdit, cityEdit, stateEdit, urlEdit, fullTimeEdit, partTimeEdit, contractEdit } = this.props;
        return (
            isEditing === false ?
                <div>
                    <div className="col s6">
                        <div className="card">
                            <div className="card-title center-align">Add/Edit Job Posting</div>
                            <hr />
                            <div className="card-content">
                                <form action="">
                                    <div className="row">
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='fullTime' onChange={this.fullTimeEditCheckbox} />
                                                <label htmlFor="fullTime">Full Time</label>
                                            </p>
                                        </div>
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='partTime' onChange={this.partTimeEditCheckbox} />
                                                <label htmlFor="partTime">Part Time</label>
                                            </p>
                                        </div>
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='contract' onChange={this.contractEditCheckbox} />
                                                <label htmlFor="contract">Contract</label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>What Type of Job Are You Posting?</label>
                                        <select className='browser-default' id="jobType" value={jobType} onChange={this.handleJobTypeToggle}>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="Full+Stack">Full-Stack</option>
                                            <option value="Front+End">Front-End</option>
                                            <option value="Back+End">Back-End</option>
                                        </select>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="jobTitle" value={jobTitle} onChange={this.handleJobTitleInput} />
                                        <label htmlFor="jobTitle">Job Title</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="companyName" value={company} onChange={this.handleCompanyInput} />
                                        <label htmlFor="companyName">Company Name</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <textarea type="text" className="form-control materialize-textarea" id="desctextarea" value={description} onChange={this.handleDescriptionInput}></textarea>
                                        <label htmlFor="desctextarea">Description</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="salary" value={salary} onChange={this.handleSalaryInput} />
                                        <label htmlFor="salary">Salary</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="city" value={city} onChange={this.handleCityInput} />
                                        <label htmlFor="city">City</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="state" value={state} onChange={this.handleStateInput} />
                                        <label htmlFor="state">State</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="url" value={url} onChange={this.handleUrlInput} />
                                        <label htmlFor="url">URL</label>
                                    </div>
                                    <div className='center-align'>
                                        <button onClick={this.handleClick} type="submit" className="btn blue waves-effect waves-light" id="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className="col s6">
                        <div className="card">
                            <div className="card-title center-align">Edit Job Posting</div>
                            <hr />
                            <div className="card-content">
                                <form action="">
                                    <div className="row">
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='fullTime' onChange={this.fullTimeEditCheckbox} />
                                                <label htmlFor="fullTime">Full Time</label>
                                            </p>
                                        </div>
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='partTime' onChange={this.partTimeEditCheckbox} />
                                                <label htmlFor="partTime">Part Time</label>
                                            </p>
                                        </div>
                                        <div className="col s4">
                                            <p>
                                                <input type="checkbox" id='contract' onChange={this.contractEditCheckbox} />
                                                <label htmlFor="contract">Contract</label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>What Type of Job Are You Posting?</label>
                                        <select className='browser-default' id="jobType" value={jobTypeEdit} onChange={this.handleEditJobTypeToggle}>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="Full+Stack">Full-Stack</option>
                                            <option value="Front+End">Front-End</option>
                                            <option value="Back+End">Back-End</option>
                                        </select>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="jobTitle" value={jobTitleEdit} onChange={this.handleEditJobTitleInput} />
                                        <label htmlFor="jobTitle">Job Title</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="companyName" value={companyEdit} onChange={this.handleEditCompanyInput} />
                                        <label htmlFor="companyName">Company Name</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <textarea type="text" className="form-control materialize-textarea" id="desctextarea" value={descriptionEdit} onChange={this.handleEditDescriptionInput}></textarea>
                                        <label htmlFor="desctextarea">Description</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="salary" value={salaryEdit} onChange={this.handleEditSalaryInput} />
                                        <label htmlFor="salary">Salary</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="city" value={cityEdit} onChange={this.handleEditCityInput} />
                                        <label htmlFor="city">City</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="state" value={stateEdit} onChange={this.handleEditStateInput} />
                                        <label htmlFor="state">State</label>
                                    </div>
                                    <div className="form-group input-field">
                                        <input type="text" className="form-control" id="url" value={urlEdit} onChange={this.handleEditUrlInput} />
                                        <label htmlFor="url">URL</label>
                                    </div>
                                    <div className='center-align'>
                                        <button onClick={this.handleClick} type="submit" className="btn blue waves-effect waves-light" id="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}