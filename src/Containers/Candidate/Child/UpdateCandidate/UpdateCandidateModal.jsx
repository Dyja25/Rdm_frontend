import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEditCandidate } from "../../CandidateAction";
const UpdateCandidateForm = lazy(() => import("./UpdateCandidateForm.jsx"));

const UpdateCandidateModal = props => {
  const { updateCandidateModal, handleUpdateCandidateModal, ...formProps } = props;
  console.log("cn",props.candidateId )
  console.log("dn",props.setEditingCandidate.fullName)
  return (
    <>
      <StyledModal
        // title=" Update Candidate"
        title={props.setEditingCandidate.fullName}
        width="65%"
        visible={updateCandidateModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => handleUpdateCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCandidateForm 
          candidateId={props.candidateId}
          handleSetCurrentCandidateId={props.handleSetCurrentCandidateId} 
          />
        </Suspense>
      </StyledModal>
    </>
  );
};

const mapStateToProps = ({ auth, candidate, }) => ({
  setEditingCandidate: candidate.setEditingCandidate,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  candidateByUserId: candidate.candidateByUserId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditCandidate
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateModal);
