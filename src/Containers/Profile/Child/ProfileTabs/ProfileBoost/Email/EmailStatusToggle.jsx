import React, { useEffect } from "react";
import { Switch, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkEmailStatus } from "../../../../ProfileAction";
//import { putCustomerContactToggle } from "../../../../CustomerAction";

function EmailStatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.defaultInd)

    function handleToggleEmail(item) {
        // console.log("toggle",props.thirdPartyAccessInd)
       // setPaymentCollection(!paymentCollection);
        if (props.defaultInd) {
            props.linkEmailStatus(
                {
                //    productId: props.item.productId,
                   
                //defaultInd: props.defaultInd ? false : true,
                id:props.id
                },
                // props.item.productId,
                // props.mrchantDetailsId,
            );
        } else {
            props.linkEmailStatus(
              
                {
                  //productId: props.item.productId,
                    
                 
                  //defaultInd: props.defaultInd ? false : true,
                  id:props.id
                },
                // props.item.productId,
                // props.mrchantDetailsId,
            );
        }
    }

    function handleCancel() {
        if (props.defaultInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <> 
        {/* {props.thirdPartyAccessInd==="false"&& */}
             <div>
                <Popconfirm
                    title="Confirm status change?"
            onConfirm={() => handleToggleEmail()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                     checked={props.defaultInd || toggle}
                       // disabled={props.thirdPartyAccessInd}
                       // isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div> 
{/* } */}
        </>
    );
}

const mapStateToProps = ({ auth,customer }) => ({
//   puttingCustContcToggle: customer.puttingCustContcToggle,
//   puttingCustContcToggleError:customer.puttingCustContcToggleError,

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
      //putCustomerContactToggle
      linkEmailStatus
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(EmailStatusToggle);
