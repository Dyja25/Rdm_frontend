import React, { lazy, Suspense,useState } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
 import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import {handleRecruiterModal} from "../../../../OpportunityAction"
import RecruiterTable from "./RecruiterTable.jsx";

const AddRecruiterModal = (props) => {
  console.log("Best3",props.candidatePostData)
    const { addRecruiterModal, handleRecruiterModal, ...formProps } = props;
    const [selectedRowRecruiter, setSelectedRowRecruiter] = useState([]);

  const rowSelectionForRecruiter = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowRecruiter(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  return (
    <>
      <StyledModal
        // title="Partner"
        title={<FormattedMessage
          id="app.candidate"
          defaultMessage="Candidate"
        />}
        width="95%"
        visible={props.addRecruiterModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleRecruiterModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruiterTable 
          
           rowSelectionForRecruiter={rowSelectionForRecruiter}
          candidatePostData={props.candidatePostData}
          recruiter={props.recruiter}
          //recruitmentId={props.recruitmentId}
           opportunityId={props.opportunityId}/>{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

const mapStateToProps = ({ settings,opportunity }) => ({
    addRecruiterModal:opportunity.addRecruiterModal
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleRecruiterModal,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(AddRecruiterModal);




  
