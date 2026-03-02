import styled from "styled-components";

const FormWrapper = styled.div`
    padding: 1rem;
width: ${props => props.width}
     border-radius: 0.3rem;
    box-shadow: 0em 0.25em 0.625em -0.125em #444;
    border: 0.0625em solid #ddd;
    background: #fff;
    @media only screen and (max-width: 37.5em) {
    
       width:89%
      
           
         }
         @media only screen 
and (min-device-width : 48em) 
and (max-device-width : 64em)
and (-webkit-min-device-pixel-ratio: 2){
 
}
         
`
export default FormWrapper;