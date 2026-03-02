import React, { Component,useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { getContactListByCustomerId,getAllCustomerListByUserId } from "../../../Containers/Customer/CustomerAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {linkOpportunityContact} from "../../Contact/ContactAction"


import { FlexContainer } from "../../../Components/UI/Layout";

import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";


/**
 * yup validation scheme for creating a opportunity
 */


class LinkedContactForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

  componentDidMount() {
     this.props.getContactListByCustomerId(this.props.opportunity.customerId);
    //  this.props.getAllSalesList();
}

  render() {
    
    const customerNameOption = this.props.contactByCustomerId.map((item) => {
      return {
          label: `${item.firstName || ""} ${item.middleName ||
            ""} ${item.lastName || ""}`,
          value: item.contactId,
      };
  });

//   const salesNameOption = this.props.sales.map((item) => {
//     return {
//         label: `${item.fullName || ""}`,
//         value: item.employeeId,
//     };
// });
 
 
  
    const {
    //   user:{userId},
    //   addingOpportunity,
    //   fullName,
    //   employeeId,
    //   salesUserIds,
    //   firstName,
    //   middleName,
    //   lastName,
    //   contactId,
    //   customerId,
    //   startDate,
    //   endDate,
    //   defaultCustomers,
    //   defaultContacts,
    //   name,
    } = this.props;
    // console.log(customerId);
    return (
      <>
        <Formik
            initialValues={{
              contactId: [],
              opportunityId:this.props.opportunityId
            }}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                console.log(values);
    
    
                // let testVal = {
                //   ...values,
                //   // callCategory: this.state.category,
                //   // callType: this.state.Type,
    
                //   salesUserIds:  [],
    
                //   // startDate: `${newStartDate}T${newStartTime}`,
                //   // endDate: `${newEndDate}T${newEndTime}`,
    
                //   // startTime: 0,
                //   // endTime: 0,
                // };
               
                this.props.linkOpportunityContact(
                  {
                    ...values,
                   
                    // startDate: dayjs(values.startDate).toISOString(),
                    // endDate: dayjs(values.endDate).toISOString(),
                    // startDate: `${newStartDate}T00:00:00Z`,
                    // endDate: `${newEndDate}T00:00:00Z`,
                   
                    // orgId: this.props.organizationId,
                    // userId: this.props.userId,
                  },
                  this.props.opportunityId,
                  // this.props.customerId,
                  resetForm()
                );
              }}
            
          >
            {({
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              values,
              ...rest
            }) => (
              <Form className="form-background">
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "80%" }}>
                    <Field
                       name="contactId"
                    //    selectType="contactOpportunityList"
                      placeholder="Select"
                      noLabel
                      
                      component={SelectComponent}
                      options={Array.isArray(customerNameOption) ? customerNameOption : []}
                    
                    //   mode
                      style={{
                        borderRadius: 5,

                      }}
                    />
                  </div>

                  <Button type="primary" htmlType="submit" 
                  loading={this.props.linkingOpportunityContact}>
                  
                    <FormattedMessage
                      id="app.add"
                      defaultMessage="Add"
                    />
                  </Button>
                </FlexContainer>
              </Form>
            )}
          </Formik>
        
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
//   user: auth.userDetails,
linkContactModal: contact.linkContactModal,
linkingOpportunityContact:contact.linkingOpportunityContact,
// customerId: customer.customer.customerId,
  contactByCustomerId: customer.contactByCustomerId,
  opportunityId: opportunity.opportunity.opportunityId,
  opportunity: opportunity.opportunity,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactListByCustomerId,
        linkOpportunityContact
       
 
       
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactForm);