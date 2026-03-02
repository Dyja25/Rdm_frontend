import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEditPartnerContact } from "../../PartnerAction";
const UpdatePartnerContactForm = lazy(() => import("./UpdatePartnerContactForm.jsx"));

const UpdatePartnerContactModal = (props) => {
  const { updatePartnerContactModal, handleUpdatePartnerContactModal, ...formProps } = props;
  console.log("dn",props.setEditingPartnerContact.firstName)
  return (
    <>
      <StyledModal
        //title="Update Customer"
        title={
          // props.setEditingPartnerContact.salutation
          // ||
           props.setEditingPartnerContact.firstName
          // ||props.setEditingPartnerContact.middleName
          // ||props.setEditingPartnerContact.lastName
          }
        // title={<FormattedMessage
        //   id="app.updatepartnercontact"
        //   defaultMessage="Partner Contact"
        // />}
        width="60%"
        visible={props.updatePartnerContactModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => props.handleUpdatePartnerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdatePartnerContactForm contactId={props.contactId} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ auth, partner, }) => ({
  setEditingPartnerContact: partner.setEditingPartnerContact,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerByUserId: partner.partnerByUserId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditPartnerContact
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePartnerContactModal);
