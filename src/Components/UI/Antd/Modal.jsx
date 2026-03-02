import Modal from "antd/lib/modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
    .ant-modal-content{
        background-color: #fff !important;
        padding: 0;
        color: ${props => props.theme.color};
        border-radius: ${props => props.modalBorderRadius || ""};
     }
     .ant-modal-header{
          background-image: linear-gradient(-90deg, #001529, #1890ff);
          color: ${props => props.theme.color};
     }
     .ant-modal-body{
          background-color :"	#F5F5F5"
          /* background-color: ${props =>
          props.theme.backgroundColor} !important; */
          color: ${props => props.theme.color};
         padding: 24px !important;
         font-size: 13px;
         
         border-radius: ${props => props.modalBorderRadius || ""};
   }
    .ant-modal-footer{
        background-color: ${props => props.theme.backgroundColor} !important;
        color: ${props => props.theme.color};
   }
    .ant-modal-title{
        color: ${props => "#fff"};
        font-size: 1.3rem;
      border-radius: 0.25rem;
      margin-left: 2rem;
      line-height: 2.5;
   }
   .ant-modal-close-x{
        color: ${props => "#fff"};
        cursor: pointer;
   }
  
`;
export default StyledModal;
