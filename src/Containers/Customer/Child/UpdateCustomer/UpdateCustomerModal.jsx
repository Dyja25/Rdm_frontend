import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import { setEditCustomer } from "../../CustomerAction";
const UpdateCustomerForm = lazy(() => import("./UpdateCustomerForm"));

const UpdateCustomerModal = (props) => {
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
  // console.log("cn",props.candidateByUserId.fullName && props.candidateByUserId.fullName.length && props.candidateByUserId[0].fullName )
  console.log("dn",props.setEditingCustomer.name)
  return (
    <>
      <StyledModal
        //title="Update Customer"
        title={props.setEditingCustomer.name}
        // title={<FormattedMessage
        //   id="app.updatecustomer"
        //   defaultMessage="Update Customer"
        // />}
        width="60%"
        visible={props.updateCustomerModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => props.handleUpdateCustomerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerForm customerId={props.customerId} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ auth, customer }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditCustomer
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerModal);

