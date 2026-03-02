import styled from 'styled-components'

const Title = styled.h1`
    color: ${props => props.color || props.theme.titleColor};
    text-align:${props => props.textAlign || 'justify'};
    font-size: ${props => props.fontSize || '1.625em'};
    font-family: ${props => props.fontFamily || 'Poppins'};
    margin:  ${props => props.margin || '0'};
    padding:  ${props => props.padding || '0'};
    white-space: ${props => props.whiteSpace || 'nowrap'};
    overflow: ${props => props.overflow || ''};
    text-overflow: ${props => props.textOverflow || ''};
    width: ${props => props.width || '-webkit-fill-available'};
    @media only screen 
and (min-device-width : 48em) 
and (max-device-width : 64em)
and (-webkit-min-device-pixel-ratio: 2){
    border:"0.0625em solid red";
    font-size:1.2rem;
    text-align:center
  
}    
`
export default Title;