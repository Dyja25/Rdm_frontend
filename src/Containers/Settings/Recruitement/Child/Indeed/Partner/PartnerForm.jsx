import PropTypes from 'prop-types'
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
//import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from '../../../../../../Components/UI/Layout'
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { Button,Input,Switch } from "antd";
import { Formik, Form, Field } from "formik";
import {
  getEmployeelist,
  // handleEmployeeDrawerForAdmin,
} from "../../../../../Employees/EmployeeAction";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { getPartner,addPartner } from '../../../../SettingsAction';
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";


    function PartnerForm(props) {
        useEffect(() =>{
          props.getPartner( props.organizationId);
          props.getEmployeelist();
        },[]);
        console.log(props.partner.length && props.partner[0].ip)

        const employeeNameOption = props.employees.map((item) => {
          return {
            label: `${item.fullName || ""}`,
            value: item.employeeId,
          };
        });
  return (
    <>
      <Formik
      enableReinitialize
        initialValues={{
          url: props.partner.length && props.partner[0].url,
          ip:  props.partner.length && props.partner[0].ip,
          orgId: props.organizationId,
          assignToUserId: props.partner.length && props.partner[0].assignToUserId
        }}
        onSubmit={(values) => {
            props.addPartner(
                {
                    ...values,
                },
                props.organizationId
            )
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between",alignItems: "center" }}>
              <div
                style={{
                  height: "100%",
                  width: "60%",
                }}
              > 
              <FlexContainer justifyContent= "space-between">  
              <div style={{width:"45%"}}>           
                <Field
                  label="URL"
                  name="url"
                  type="text"
                  width={"100%"}
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
                </div>  
                <div style={{width:"45%"}}>
                  
                <Field
                  label="IP"
                  name="ip"
                  type="text"
                  width={"100%"}
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
                </div>                  
                </FlexContainer>
                <Spacer />
                {/* <FlexContainer justifyContent="space-between">
                  <StyledLabel>Candidate  From This Channel Will be Assigned to</StyledLabel> 
                  <div style={{ width: "45%" }}>  
                      <Field
                        name="assignToUserId"
                        // isColumnWithoutNoCreate
                        isColumn
                        
                        width={"47%"}
                       
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(employeeNameOption) ? employeeNameOption : []}
                      />
                      </div>
                      </FlexContainer> */}
                      <FlexContainer justifyContent="space-between">
                      <div style={{ width: "65%" }}>
                      <FlexContainer justifyContent="space-between">                 
                      <StyledLabel >
                        {/* Vendor From This Channel Will be Assigned to */}
                        <FormattedMessage id="app.vendorFromThisChannel" defaultMessage=" Vendor From This Channel Will be Assigned to" />
                        </StyledLabel>                  
                      <Switch                                              
                        // checked={this.state.availability}
                        // onChange={this.handleAvailability}
                        // disabled={this.state.availability}
                        checkedChildren="Internal"
                        unCheckedChildren="External"
                      />
                      </FlexContainer>
                      </div>
                      <div style={{ width: "30%" }}>
                       <Field
                        name="assignToUserId"
                        // isColumnWithoutNoCreate
                        isColumn
                        
                        width={"47%"}
                       
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(employeeNameOption) ? employeeNameOption : []}
                      />
                      </div>
                      
                      </FlexContainer>
              </div>
              </div>   
              <Spacer style={{ marginTop: "1.25em" }} />

              <FlexContainer justifyContent="flex-end">
                <Button 
                      type="primary"
                      htmlType="submit"
                   Loading={props.addingPartner}
                   className='mr-gap'
                    >Update                  
                    </Button>
                    </FlexContainer>
                     </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,settings,employee }) => ({
  // user: auth.userDetails,
  // userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  partner: settings.partner,
  employees: employee.employees,
  userId:auth.userId,
      addingPartner: settings.addingPartner,
      addingPartnerError: settings.addingPartnerError,
      fetchingPartner: settings.fetchingPartner,
      fetchingPartnerError: settings.fetchingPartnerError,
});


const mapDispatchToProps = (dispatch) =>
bindActionCreators(
    {
        getPartner,
        getEmployeelist,
        addPartner,
      },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm)