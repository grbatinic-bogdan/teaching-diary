import React, { Component } from 'react';

import { FormGroup, Input, Button, Label, Row, Col } from 'reactstrap';
import { Field } from 'redux-form'

import renderField from '../../../services/formFieldRenderer';
import PlacesLookup from '../PlacesLookup';

export default class TimeEntryForm extends Component {
    constructor(props) {
        super(props);
        this.durationRef = React.createRef();
        this.handleTimeFormatChange = this.timeFormatChange.bind(this);
    }

    render () {
        const { handleSubmit, timeMaxDate } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Field name="name" type="text" placeholder="Class with Anna" component={renderField} required />
                </FormGroup>
                <FormGroup>
                    <Label>Date</Label>
                    <Field name="time" type="date" component={renderField} max={timeMaxDate} />
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Duration</Label>
                            <Field name="duration" type="number" component={renderField} placeholder="30" ref={this.durationRef} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label style={{visibility: 'hidden'}}>Units</Label>
                            <Field name="timeFormat" type="select" component={renderField} onChange={this.handleTimeFormatChange}>
                                <option value="minutes">minutes</option>
                                <option value="hours">hours</option>
                            </Field>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label>Location</Label>
                    <Field name="locationAddress" type="text" component={PlacesLookup} updateField="location" />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Field name="individual" type="checkbox" component={renderField} />{' '}
                        Individual
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Status</Label>
                    <Field name="status" type="select" component={renderField}>
                        <option value="present">Present</option>
                        <option value="sick">Sick</option>
                        <option value="absent">Absent</option>
                    </Field>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Field name="description" type="textarea" component={renderField} />
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
                <Field name="location" type="hidden" component="input" />
            </form>
        )
    }

    timeFormatChange(event) {
        const currentDuration = this.durationRef.current.value;
        if (currentDuration === '') {
            return;
        }
        const changedToHours = event.target.value === 'hours';
        const durationTime = (changedToHours) ? currentDuration / 60 : currentDuration * 60;
        console.log(this.durationRef.current);
        const {
            change

        } = this.props;
        change('duration', durationTime);
        // this.durationRef.current.value = durationTime;
    }
}