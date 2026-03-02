import React, {  } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCountryToggle } from "./CountryAction";

function CountryStatusToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.mandatoryInd);
  console.log(props.mandatoryInd)

  function handleToggleCollection(item) {
    if (props.mandatoryInd) {
      props.linkCountryToggle({
        countryId: props.countryId,
        mandatoryInd: props.mandatoryInd ? false : true,
         
      },props.countryId);
 
    } else {
      props.linkCountryToggle({
        countryId: props.countryId,
        mandatoryInd: props.mandatoryInd ? false : true,
      },props.countryId);
    }
  }

  function handleCancel() {
    if (props.mandatoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.mandatoryInd ?props.mandatoryInd || toggle :null}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Mandatory"
            unCheckedChildren="Not Mandatory"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkCountryToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryStatusToggle);
