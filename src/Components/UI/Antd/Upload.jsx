import Upload from "antd/lib/upload";
import styled from "styled-components";

const StyledUpload = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    border: 0.0625em dashed ${(props) => props.theme.borderColor};
    /* width: 100.25em; */
    height: 6.9375em;
    border-radius: 0.25em;
    border-color: teal;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    text-align: center;
    cursor: pointer;
    -webkit-transition: border-color 0.3s ease;
    -o-transition: border-color 0.3s ease;
    transition: border-color 0.3s ease;
    vertical-align: top;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    display: table;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    height: 7.9375em;
  }
`;
export default StyledUpload;
