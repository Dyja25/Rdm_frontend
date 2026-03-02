import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {handleCustomerContactModal} from "../../../../CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CustomerContactForm = lazy(() =>
  import("./CustomerContactForm.jsx")
);

const AddCustomerContactModal = (props) => {
  const {
    addCustomerContactModal,
    handleCustomerContactModal,
    ...formProps
  } = props;
  return (
    <>
      <StyledModal
        //title="Contact"
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="55%"
        visible={addCustomerContactModal}
        closable
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }} 
        style={{ top: 40 }}
        onCancel={() => handleCustomerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerContactForm {...formProps} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

const mapStateToProps = ({ customer}) => ({
  addCustomerContactModal:customer.addCustomerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerContactModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerContactModal);
