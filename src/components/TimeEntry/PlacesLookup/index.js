import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { Input } from 'reactstrap';
import { change } from 'redux-form';
import './style.css';

export default class PlacesLookup extends Component {

    constructor(props) {
        super(props);

        this.onValueSelect = this.handleValueSelect.bind(this);
    }

    handleValueSelect(address, placeId) {
        const {
            meta,
            updateField
        } = this.props;

        console.log(meta.form);
        geocodeByPlaceId(placeId)
            .then((places) => {
                const [ place ] = places;

                return place;
            })
            .then((place) => {
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();
                return {
                    address: place.formatted_address,
                    latitude,
                    longitude
                };
            })
            .then((location) => {
                meta.dispatch(
                    change(meta.form, updateField, JSON.stringify(location))
                );
            })
    }

    render () {
        const {
            input: {
                value,
                onChange
            }
        } = this.props;

        return (
            <PlacesAutocomplete value={value} onChange={onChange} onSelect={this.onValueSelect}>
                {({getInputProps, getSuggestionItemProps, suggestions}) => (
                    <div className="input-container">
                        <Input { ...getInputProps() } />
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                                const activeClassName = suggestion.active ? 'suggestion-item--active' : '';
                                return (
                                    <div { ...getSuggestionItemProps(suggestion) }>
                                        <p className={`suggestion-item ${activeClassName}`}>
                                            {suggestion.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        )
    }
}