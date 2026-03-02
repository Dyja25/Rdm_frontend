import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;
const NavbarWrapper = styled(Header)`
  .ant-layout-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    margin: 0;
    box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
    color: ${props => props.theme.color};
      background-color: ${props => props.theme.backgroundColor};
    height: 3.125em;
    padding: 0;
    line-height: 4em;
    background-color: white !important;
  }
`;
export default NavbarWrapper;
