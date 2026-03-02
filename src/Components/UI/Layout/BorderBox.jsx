import React from 'react';
import styled from 'styled-components';

const BorderBox = styled.div`
    border: 0.0625em solid ${props => props.theme.borderColor};
    border-radius: ${props => props.borderRadius || '0.3rem'};
    background: ${props => props.theme.borderBoxBgColor || '#eee'}
    box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor};   
    margin-bottom: 0.3125em; 
`
export default BorderBox;