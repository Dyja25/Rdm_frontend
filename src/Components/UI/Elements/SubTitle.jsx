import styled from 'styled-components'

const SubTitle = styled.p`
    color: ${props => props.theme.subTitleColor};
    /* color:white; */
    font-size: ${props => props.fontSize || '0.875em'};
    font-family: ${props => props.fontFamily || 'Roboto'};
    margin:  ${props => props.margin || '0'};
    padding:  ${props => props.padding || '0'};
    white-space: ${props => props.whiteSpace || 'nowrap'};
    overflow: ${props => props.overflow || ''};
    text-overflow: ${props => props.textOverflow || ''};
    width: ${props => props.width || '-webkit-fill-available'};
    width: ${props => props.width ||'-moz-available'};
    `;
export default SubTitle;