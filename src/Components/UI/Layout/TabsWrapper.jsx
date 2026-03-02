import styled from "styled-components";

const TabsWrapper = styled.div`
 border-radius: 0.3rem;
box-shadow: 0em 0.25em 0.625em -0.125em ;
border: 0.0625em gray ${props => props.theme.borderColor}
 background-color: ${props => props.theme.backgroundColor};
margin: 0.3rem;
width:99.5%; 
height:91vh;
@media only screen and (max-width: 600px) {
width:96.5%; 
  height:66.85vh;
  }}
`;
export default TabsWrapper;
                // <div className=" rounded  shadow-sm border border-gray-200 bg-[#F5F6FA] m-1 w-[99%] h-[87vh]"></div>
