import Collapse from 'antd/lib/collapse';
import styled from 'styled-components';

const StyledCollapse = styled(Collapse)`
    .ant-collapse-item {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.applicationBackground} !important;
    } 
    .ant-collapse-header {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.backgroundColor} !important;
    }   
    .ant-collapse-content {
        color: ${props => props.theme.color};
        background-color: ${props => props.theme.backgroundColor} !important;
    }   
`
export default StyledCollapse;