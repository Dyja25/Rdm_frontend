import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForLost } from "../../PartnerAction";

function ReinstateToggleForLost(props) {
  const [paymentCollection, setPaymentCollection] = React.useState(false);

  function handleToggleReinstate(item) {
    props.reinstateToggleForLost(
      {
        partnerId: props.partnerId,
        reInStateInd:false,
      },
      props.partnerId,
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
         reinstateToggleForLost,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReinstateToggleForLost);
