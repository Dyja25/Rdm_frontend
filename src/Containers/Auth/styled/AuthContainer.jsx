import styled from "styled-components";
const AuthContainer = styled.div`
  // width: 50%;
  width:${props => props.width || "50%"}
  min-height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  @media only screen and (max-width: 37.5em) {
  
   width:100%
  
  
  }
`;

export default AuthContainer;
