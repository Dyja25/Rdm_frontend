import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForCandidate } from "../../CandidateAction";

function ReinstateToggleForCandidate(props) {
  const [paymentCollection, setPaymentCollection] = React.useState(false);

  function handleToggleReinstate(item) {
    props.reinstateToggleForCandidate(
      {
        candidateId: props.candidateId,
        reInStateInd:false,
      },
      props.candidateId,
      props.userId
    );
  }

  return (
    <>
      <div>
        <Popconfirm
          title=" Do you wish to reinstate?"
          onConfirm={() => handleToggleReinstate()}
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
         
        >
          <Switch
            // checked={props.paymentCollection || paymentCollection}
            isLoading={true}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth  }) => ({
 
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        reinstateToggleForCandidate,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReinstateToggleForCandidate);
