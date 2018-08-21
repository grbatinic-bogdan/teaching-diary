import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";

import {
  getTimeEntryById,
  updateTimeEntry,
  deleteTimeEntry
} from "../../../modules/edit-time-entry";
import { toggleDeleteTimeEntry } from "../../../modules/edit-time-entry/actions";
import TimeEntryForm from "../TimeEntryForm";
import {
  validateTimeEntry,
  createTimeEntryPayload
} from "../../../modules/add-time-entry";

class EditTimeEntry extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.onSubmit.bind(this);
    this.handleValidation = validateTimeEntry.bind(this);
    this.handleToggleDeleteTimeEntry = this.toggleDeleteTimeEntry.bind(this);
    this.handleDeleteTimeEntry = this.deleteTimeEntry.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      getTimeEntryById
    } = this.props;

    getTimeEntryById(id);
  }

  render() {
    const {
      timeEntry,
      getRequest,
      saveRequest,
      isDelete,
      toggleDeleteTimeEntry,
      deleted
    } = this.props;

    const isSaving = saveRequest && getRequest === false;
    const shouldShowForm =
      getRequest === false &&
      saveRequest === false &&
      timeEntry !== null &&
      deleted === false;
    const isDeleted = deleted;

    if (isSaving) {
      return <h1>Saving...</h1>;
    }

    if (shouldShowForm) {
      const locationAddress = timeEntry.location
        ? timeEntry.location.address
        : null;
      const location = timeEntry.location
        ? JSON.stringify(timeEntry.location)
        : null;
      const time = moment(timeEntry.time).format("YYYY-MM-DD");
      const timeFormat = "minutes";
      const duration =
        timeFormat === "minutes"
          ? timeEntry.duration / 60
          : timeEntry.duration / 60 / 60;
      const initialValues = {
        ...timeEntry,
        location,
        locationAddress,
        timeFormat,
        time,
        duration
      };
      const Form = reduxForm({
        form: "editTimeEntry",
        initialValues,
        validate: this.handleValidation
      })(TimeEntryForm);
      const timeMaxDate = moment().format("YYYY-MM-DD");

      return (
        <div>
          <Form onSubmit={this.handleSubmit} timeMaxDate={timeMaxDate} />
          <Button color="danger" onClick={this.handleToggleDeleteTimeEntry}>
            Delete
          </Button>
          <Modal isOpen={isDelete}>
            <ModalHeader toggle={this.toggle}>
              Delete {timeEntry.name}
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete this time entry?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleDeleteTimeEntry}>
                Delete
              </Button>
              <Button color="secondary" onClick={toggleDeleteTimeEntry}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    if (isDeleted) {
      return <Redirect to="/" push={true} />;
    }

    return <h1>Loading time entry, please wait</h1>;
  }

  onSubmit(values) {
    const {
      match: {
        params: { id }
      },
      updateTimeEntry
    } = this.props;
    const payload = createTimeEntryPayload(values);
    updateTimeEntry(id, payload);
  }

  toggleDeleteTimeEntry() {
    const { toggleDeleteTimeEntry } = this.props;

    toggleDeleteTimeEntry();
  }

  deleteTimeEntry() {
    const {
      match: {
        params: { id }
      },
      deleteTimeEntry
    } = this.props;

    deleteTimeEntry(id);
  }
}

const mapStateToProps = state => {
  const {
    editTimeEntry: { timeEntry, getRequest, saveRequest, isDelete, deleted }
  } = state;

  return {
    timeEntry,
    getRequest,
    saveRequest,
    isDelete,
    deleted
  };
};

export default connect(
  mapStateToProps,
  { getTimeEntryById, updateTimeEntry, toggleDeleteTimeEntry, deleteTimeEntry }
)(EditTimeEntry);
