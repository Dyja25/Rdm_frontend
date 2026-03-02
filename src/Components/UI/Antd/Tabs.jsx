import Tabs from "antd/lib/tabs";
import styled from "styled-components";

const StyledTabs = styled(Tabs)`
    .ant-tabs-nav-container {
        color: ${props => props.theme.color};
    }
    .ant-tabs-bar {
        margin: 0.1rem;
        font-size: 0.85rem;
        font-family: poppins;
    }
      .ant-tabs {
      font-family: poppins;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-variant: tabular-nums;
  line-height: 1;
  list-style: none;
  font-family: "Poppins";
  font-feature-settings: "tnum", "tnum";
  display: flex;
}
   
  .ant-tabs-tab {
  font-family: poppins;
  padding: 1px 2px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
   
.ant-tabs-nav {
  margin-bottom: 2px;
  font-family: poppins;
  padding:0.5rem;
  height:3.25rem;
}
    .ant-nav-container {
        color: ${props => props.theme.color};
        box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
        border: 0.0625em solid ${props => props.theme.borderColor}
        width:99%; 
        font-family: poppins;
    }
`;
export default StyledTabs;
