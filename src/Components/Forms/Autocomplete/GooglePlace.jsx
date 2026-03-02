import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';

const StyledInput = styled.input.attrs({
    type: 'text',
    size: props => (props.small ? 4 : undefined),
})`
    // border-radius: 0.1875em;
    border: 0.0625em solid ${props => props.theme.inputBorderColor};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    display: block;
    margin: 0 0 0.42rem 0;
    //border-radius: 0.3rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor};
    padding: 0.3rem 1rem;
   &:hover{
    box-shadow: 0em 0.25em 0.625em -0.125em  ${props => props.theme.boxShadowColor};
    }
    ::placeholder {
      color: #888;
    }
   `
const StyledDropDownContainer = styled.div`
    border-radius: 0.1875em;
    border: 0.0625em solid ${props => props.theme.inputBorderColor};
    background-color: ${props => props.theme.backgroundColor};;
    color: ${props => props.theme.color};
    box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor};
    position: absolute;
    top: 2.5em;
    width: 31.25em;
    z-index: 1000;
    .suggestion-item{
        background-color: ${props => props.theme.backgroundColor};
        padding: 0.3rem;
    }
    .suggestion-item--active{
        background-color: ${props => props.theme.boxShadowColor};
        padding: 0.3rem;
    }
   `
const AutoCompleteWrapper = styled.div`
   position: relative;
`
const StyledSuggestion = styled.span`
    color: ${props => props.theme.color};
   `
class GooglePlace extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' }
    }

    handleChange = (address) => {
        console.log(address)
        this.setState({ address })
    }

    handleSelect = (address) => {
        // this.props.setGoogleAddress(address)
        console.log(address)
        this.setState({ address })
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                getLatLng(results[0])
            })
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
    }
    render() {
        return (
            <div style={{ width: 400 }}>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <AutoCompleteWrapper>
                            <StyledInput
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input'
                                })}
                            />
                            <StyledDropDownContainer>
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { cursor: 'pointer' }
                                        : { cursor: 'pointer' };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <StyledSuggestion>{suggestion.description}</StyledSuggestion>
                                        </div>
                                    )
                                })}
                            </StyledDropDownContainer>
                        </AutoCompleteWrapper>
                    )}
                </PlacesAutocomplete>
                <br />
            </div>
        )
    }
}
export default GooglePlace;