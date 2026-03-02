import styled from "styled-components";
import { StyledSelect } from "../Antd";
const SelectInput = styled(StyledSelect)`
  .ant-input{
      background-color: ${props => props.theme.backgroundColor};
      color: ${props => props.theme.color};
      margin: 0 0 0.42rem 0;
      font-size:0.75rem;
      width:21.875em;
      outline: none;
       fontFamily:"poppins",
      border-radius:0.125rem;
      padding: 0 0 0 0.7em;
      border:0.0625em solid #D9D9D9;
      box-shadow:${props => (props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa")} ; 
       height:1.88rem;
      border-right: ${props =>
    props.isRequired ? "0.1875em solid #ed260b" : ""} !important;
    &:hover{
      }
      ::placeholder {
        color: #888;
      }
      ::placeholder {
        color: #bfbebb;
      }
  }
  .ant-select-selection {
    height: 1.88rem;
  }
   `;
export default SelectInput;
