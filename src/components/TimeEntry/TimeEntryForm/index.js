import React from 'react';

import { FormGroup, Input, Button, Label, Row, Col } from 'reactstrap';
import { Field } from 'redux-form'

import renderField from '../../../services/formFieldRenderer';

export default ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Name</Label>
                <Field name="name" type="text" placeholder="Class with Anna" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Date</Label>
                <Field name="time" type="date" component={renderField} />
            </FormGroup>
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Duration</Label>
                        <Field name="duration" type="number" component={renderField} placeholder="30" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label style={{visibility: 'hidden'}}>Units</Label>
                        <Field name="timeformat" type="select" component={renderField}>
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                        </Field>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label>Location</Label>
                <Field name="locationsearch" type="text" component={renderField} />
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
        </form>
    )
}