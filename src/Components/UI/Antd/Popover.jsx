import Popover from 'antd/lib/popover';
import styled from 'styled-components';

const StyledPopover = styled(Popover)`
  &&{  color: ${props => props.theme.color};
    background-color: ${props => props.theme.applicationBackground};}
    .ant-popover {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.applicationBackground};
        border: 0.1875em solid red;
    }  
    .ant-popover-inner {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.applicationBackground} !important;
        box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
        border: 0.1875em solid red;
    }  
    .ant-popover>.ant-popover-content>.ant-popover-inner>.ant-popover-inner-content {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.backgroundColor};
        border: 0.1875em solid red;
    }  
`
export default StyledPopover;