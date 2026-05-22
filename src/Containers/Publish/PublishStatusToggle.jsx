import React, { useEffect } from "react";
import { Switch, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkPublishStatus } from "../Publish/PublishAction";
//import { putCustomerContactToggle } from "../../../../CustomerAction";
import { FormattedMessage } from "react-intl";

function PublishStatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.pingInd)

    function handleTogglePublish(item) {
        // console.log("toggle",props.thirdPartyAccessInd)
       // setPaymentCollection(!paymentCollection);
        if (props.pingInd) {
            props.linkPublishStatus(
                {
                //    productId: props.item.productId,
                   
                pingInd: props.pingInd ? false : true,
                // id:props.id
                },
                 props.recruitmentId,
                // props.mrchantDetailsId,
            );
        } else {
            props.linkPublishStatus(
              
                {
                  //productId: props.item.productId,
                    
                 
                  pingInd: props.pingInd ? false : true,
                 // id:props.id
                },
                 props.recruitmentId,
                // props.mrchantDetailsId,
            );
        }
    }

    function handleCancel() {
        if (props.pingInd) {
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
                    // title={"Confirm status change?"}
                    title={<FormattedMessage
         id="app.confirmstatuschange"
         defaultMessage="Confirm status change?"
       />}
            onConfirm={() => handleTogglePublish()}
                   onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                     checked={props.pingInd || toggle}
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
    linkPublishStatus
      //putCustomerContactToggle
    //   linkEmailStatus
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(PublishStatusToggle);
