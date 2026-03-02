import styled from 'styled-components';

const MainWrapper = styled.div`
    border-radius: 0.3rem;
    box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
    border: 0.0625em solid ${props => props.theme.borderColor}
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    margin: 0.2rem;
    padding: 0.3rem;
    
`
export default MainWrapper;