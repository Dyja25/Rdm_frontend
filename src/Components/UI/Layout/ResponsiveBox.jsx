import styled from 'styled-components';

const ResponsiveBox = styled.div`
    display: block;
    box-sizing: border-box;
    height: ${props => props.height || 'auto'}
    width: calc(33.333333%);
    &:hover{
      // box-shadow: 0em 0.25em 0.625em -0.125em ${props => props.theme.boxShadowColor};
      box-shadow: 0em 0.3125em 0.625em -0.125em #444;
    }
    @media all and  (min-width: 56.25em) and (max-width: 75em ) {
    width: calc(50%);
  } 
     @media all and (max-width: 56.1875em) and (min-width: 43.75em ) {
      width: calc(100%);
  }
      @media all and (max-width: 43.6875em) and (min-width: 31.25em ) {
      width: calc(100%);
     /* flex: 0 1 calc(33.333333%); */ */
  } 
     @media all and (max-width: 31.1875em) {
      width: calc(100%);
  }
`
export default ResponsiveBox;