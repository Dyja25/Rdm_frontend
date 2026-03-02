import styled from 'styled-components'

const DrawerHeaderText = styled.h1`
   color: #fff;
   font-weight:bold;
    text-shadow: 0.125em 0.125em 0.25em ${props => props.theme.textShadowColor};
    font-size: ${props => props.fontSize || '1.125em'};
    font-family: ${props => props.fontFamily || 'Roboto'};
    padding:  ${props => props.padding || '0'};
    white-space: ${props => props.whiteSpace || 'wrap'};
    overflow: ${props => props.overflow || ''};
    text-overflow: ${props => props.textOverflow || ''};
    width: ${props => props.width || '-webkit-fill-available'};
    `

export default DrawerHeaderText; 