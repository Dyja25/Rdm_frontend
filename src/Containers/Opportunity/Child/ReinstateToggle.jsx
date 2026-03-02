import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForOppo } from "../OpportunityAction";

function ReinstateToggle(props) {
  const [paymentCollection, setPaymentCollection] = React.useState(false);

  function handleToggleReinstate(item) {
    props.reinstateToggleForOppo(
      {
        opportunityId: props.opportunityId,
      },
      props.opportunityId
    );
  }

  return (
    <>
      <div>
        <Popconfirm
          title="Confirm received"
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
      reinstateToggleForOppo,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReinstateToggle);
