import styled from "styled-components";
const ImageGradient = styled.div`
  width: 50%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(17, 114, 186, 0.7), rgb(165, 208, 240, 0.6)),
    url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: #fff;
  @media only screen and (max-width: 37.5em) {
  
  display:none
   
   
   }
   @media only screen 
and (min-device-width : 48em) 
and (max-device-width : 64em)
and (-webkit-min-device-pixel-ratio: 2){
  
}    
`;
export default ImageGradient;
