import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch} from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";

import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Spacer, StyledLabel , MainWrapper  } from "../../../../../../Components/UI/Elements";
import {FlexContainer } from "../../../../../../Components/UI/Layout";

import * as Yup from "yup";
import {getCommercialByOrgId,addCommercialByOrgId} from "../../../../PartnerAction";
import { FormattedMessage } from "react-intl";



//import ExperienceTable from "./ExperienceTable";

const FormSchema = Yup.object().shape({ 


});

class CommercialsForm extends Component{
  componentDidMount(){
    this.props.getCommercialByOrgId(this. props.orgId);
  }
  constructor(props) {
    super(props)
  
    this.state = {
      toggle: true
    }
  }

  handleToggle =(checked)=>{
    this.setState({toggle:checked})
  }

render() {
  return (
    <>
      <Formik
        enableReinitialize
        // initialValues={{
        //  // commissionAmount: props.commercials.commissionAmount,
        //   currency: this.props.commercials.currency,
        //   paymentDate: this.props.commercials.paymentDate,
        //   lastUpdatedOn: this.props.commercials.lastUpdatedOn,
        // }}
        initialValues={{
          commissionDeal:this.props.commercials.length && this.props.commercials[0].commissionDeal,
          currency: this.props.commercials.length && this.props.commercials[0].currency,
          paymentDate:this.props.commercials.length && this.props.commercials[0].paymentDate,
          lastUpdatedOn:this.props.commercials.length && this.props.commercials[0].lastUpdatedOn,
          // url: props.website.length && props.website[0].url,
          // ip:  props.website.length && props.website[0].ip,
          // orgId: props.organizationId
        }}
        //validationSchema={FormSchema}
        onSubmit={(values) => {

          this.props.addCommercialByOrgId(
            {
              ...values,
              
            },
            this.props.orgId
          )
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            {/* <MainWrapper> */}
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <div  style={{ width:"25%"}}></div> */}
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
               <div  style={{ width:"40%"}}>         
                <div  style={{ width:"47%"}}><StyledLabel>Permanent</StyledLabel></div>       

                <FlexContainer justifyContent="space-between">
              {/* <div>
              <StyledLabel>Percentage</StyledLabel></div> */}
                   <div>
                      {/* <Field
                        name="visibleExUser"
                        component={SwitchComponent}
                       // data={values.visibleExUser}
                        checkedChildren={"Percentage"}
                        unCheckedChildren={"Amount"}                       
                      /> */}
                       <Switch                         
                         checked={this.state.toggle}
                         onChange={this.handleToggle}
                          unCheckedChildren={"Percentage"}
                          checkedChildren={"Amount"}
                        /> 
                    </div>
                    <div  style={{ width:"38%"}}>               
                 
                    <Field
                    name="commissionDeal"                   
                    type="text"                   
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                   </div>
                { this.state.toggle  ?
                  <div  style={{ width:"38%"}}>
                      <Field
                        name="currency"
                        placeholder="Currency"
                        width={"100%"}
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                      </div>:null}
                      </FlexContainer>                    
                {/* <div style={{ width: "47%" }}>
                      <FlexContainer justifyContent="space-between">
                      <StyledLabel>commissionAmount</StyledLabel>
                      <Switch                                           
                        checked={this.state.billing}
                        onChange={this.handlebilling}
                        checkedChildren="Percentage"
                        unCheckedChildren="Amount"
                      />
                      </FlexContainer>
                      </div> */}
                      <Spacer/>                     
                <FlexContainer justifyContent="space-between">
                <div  style={{ width:"47%"}}><StyledLabel>
                  {/* Payment after (in days) */}
                   <FormattedMessage id="app.paymentAfter" defaultMessage=" Payment after (in days)" />
                  </StyledLabel></div>
                  <div  style={{ width:"38%"}}>
                  <Field
                    name="paymentDate"
                    //label=""
                    type="number"
                    // isColumn
                    isRequired
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                  </FlexContainer>
                
                <Spacer />
                
                <FlexContainer justifyContent="space-between">
                <div  style={{ width:"47%"}}><StyledLabel>
                  {/* Last Updated On */}
                   <FormattedMessage id="app.lastUpdatedOn" defaultMessage="Last Updated On" />
                  </StyledLabel></div>
                  <div  style={{ width:"47%"}}>
                  <Field
                    name="lastUpdatedOn"
                    //label=""
                    type="text"
                    // isColumn
                    width={"100%"}                   
                    // component={}
                    inlineLabel
                    disabled
                    //StyledLabel
                  />
                  </div>
                  </FlexContainer>
                
                </div>
                
                <Spacer style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // icon={<PoweroffOutlined />}
                  //Loading={this.props.addingCommercials}
                >Update
                  {/* <FormattedMessage id="app.update" defaultMessage="Update" /> */}
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
              
                
               
               
                {/* <div
                  style={{                   
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   loading={props.addingExperienceForm}
                  >Add
                </Button>*/}
                </div>
                {/* <div  style={{ width:"25%"}}></div>  */}
              </div>
            {/* </MainWrapper> */}
          </Form>
        )}
      </Formik>
      {/* <CommercialsTable/> */}
    </>   
  )
              }
            }


const mapStateToProps = ({  auth,partner }) => ({
  commercials: partner.commercials,
  addingCommercials: partner.addingCommercials,
  addingCommercialsError: partner.addingCommercialsError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerId: partner.partner.partnerId,
  orgId:auth.userDetails.organizationId,
// 
// fetchingCommercials
// fetchingCommercialsError

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommercialByOrgId,
      addCommercialByOrgId ,
    },dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercialsForm);
