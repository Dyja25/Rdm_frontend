import React, { useEffect } from "react";
import { Switch, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putPartnerContactToggle } from "../../../../PartnerAction";

function PartnerContactActiveToggle(props) {

    const [toggle, setToggle] = React.useState(props.accessInd)

    function handleToggleCollection(item) {
        console.log("toggle",props.thirdPartyAccessInd)
        // setPaymentCollection(!paymentCollection);
        if (props.accessInd) {
            props.putPartnerContactToggle(
                {
                //   productId: props.item.productId,
                accessInd: props.accessInd ? false : true,
                //     instockInd: props.instockInd ? false : true,
                },
                props.contactId,
                // props.item.productId,
                // props.mrchantDetailsId,
            );
        } else {
            props.putPartnerContactToggle(
              
                {
                //   productId: props.item.productId,
                accessInd: props.accessInd ? false : true, 
                 
                //     instockInd: props.instockInd ? false : true,
                },
                props.contactId,
                // props.item.productId,
                // props.mrchantDetailsId,
            );
        }
    }

    function handleCancel() {
        if (props.accessInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                        checked={props.accessInd || toggle}
                        // disabled={props.status}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth,partner }) => ({
    puttingPartnerContcToggle: partner.puttingPartnerContcToggle,
    puttingPartnerContcToggleError:partner.puttingPartnerContcToggleError,

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
      putPartnerContactToggle
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(PartnerContactActiveToggle);
