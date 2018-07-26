import React, { Component } from 'react';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';

import api from '../../../services/api';

export default class LocationSelect extends Component {
    constructor(props) {
        super(props);
        this.getOptions = this.getLocations.bind(this);
        this.handleOnChange = this.onChange.bind(this);
        this.state = {
            value: null
        };
    }

    render() {
        const {
            input
        } = this.props;
        return (
            <Async
                {...input}
                loadOptions={this.getOptions}
                value={this.state.value}
                onChange={this.handleOnChange}
                onBlur={() => input.onBlur(input.value)}
            />
        )
    }

    getLocations(term) {
        if (!term) {
            return Promise.resolve({
                options: []
            });
        }
        return api('locations')
            .then(({data, request}) => {
                const options = data.map((location) => {
                    return {
                        value: location.id,
                        label: location.address
                    }
                });
                return {
                    options
                };
            });
    }

    onChange(value) {
        const {
            input: {
                onChange
            }
        } = this.props;
        this.setState({
            value
        });
        onChange(value.value);
    }
}