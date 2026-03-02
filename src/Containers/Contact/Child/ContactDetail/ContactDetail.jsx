import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactByContactId } from "../../ContactAction";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../Components/Placeholder";
const ContactDetailsRight = lazy(()=>import("./ContactDetailsRight.jsx"));
const ContactDetailsLeft = lazy(()=>import("./ContactDetailsLeft.jsx"));
const ContactDetailHeader = lazy(()=>import("./ContactDetailHeader.jsx"));

function ContactDetails (props) {
    const { contactId } = useParams();
//   componentDidMount() {
//     this.props.getContactByContactId(this.props.match.params.contactId);
//   }

useEffect(() => {
    props.getContactByContactId(contactId);
  }, []);
 const { contact, fetchingContactByContactId } = props;
  
   
    return (
      <>
        <>
          <ContactDetailHeader />
          {fetchingContactByContactId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <FlexContainer>
                <Suspense fallback={"Loading..."}>
                  <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                    <div style={{ width: "25%" }}>
                      <ContactDetailsLeft contact={contact} />
                    </div>
                    <div style={{ width: "75%" }}>
                      <ContactDetailsRight contact={contact} />
                    </div>
                  </FlexContainer>
                </Suspense>
              </FlexContainer>
            )}
        </>
      </>
    );

}
const mapStateToProps = ({ contact }) => ({
  fetchingContactByContactId: contact.fetchingContactByContactId,
  contact: contact.contact,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getContactByContactId }, dispatch);

export default(
  connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
);
