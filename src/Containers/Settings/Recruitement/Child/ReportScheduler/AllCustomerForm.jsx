import React,{ useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper } from "../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {addSchedulerCustomer,getSchedulerCustomer} from "../../../SettingsAction";


function AllCustomerForm(props) {
    useEffect(() => {
       props.getSchedulerCustomer(props.organizationId)
      }, []);
      console.log(props.customer)
  return (
    <>
      <Formik
       enableReinitialize
        initialValues={{
            // type: props.scheduler.type,
            // department: props.scheduler.department,
            // frequency: props.scheduler.frequency,
            // orgId: props.organizationId
        }}
        onSubmit={(values) => {
            props.addSchedulerCustomer(
                {
                    ...values,
                },
                props.organizationId
            )
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
            <MainWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "100%",
                  width: "100%",
                  alignItems: "end",
                }}
              >
                
                <div style={{ width: "20%" }}  >           
                 
                  <Field
                    name="type"                   
                    label="Type"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={SelectComponent}
                    options={[ "Requirment", "Selected"] }  
                    inlineLabel
                  />
                </div>
                <div style={{ width: "20%" }}  > 
                  <Field                    
                    name="department"
                    label="Name Of Customer"
                    type="text"
                    isColumn
                    width={"100%"}
                    options={  [
                        "Management",
                        "Recruiter",
                        "Sales",
                        "Vendor"
                    ]
                    }  
                    inlineLabel
                    component={SelectComponent}
                   
                  />
                </div>
                <div style={{ width: "20%" }}  > 
                  <Field
                    name="frequency"
                    label="Frequency"
                    type="text"
                    isColumn
                    width={"100%"}
                    options={["Daily", "Weekly","Monthly", ]}                    
                    component={SelectComponent}
                    inlineLabel
                  />
                </div>               
                <div
                  style={{               
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   // loading={props.addingInventoryConsumption}
                  >Add</Button>
                </div>
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,settings}) => ({
    organizationId: auth.userDetails.organizationId,
    customer: settings.customer,
    addingCustomer: settings.addingCustomer,
    addingCustomerError: settings.addingCustomerError,  
    fetchingCustomer: settings.fetchingCustomer,
    fetchingCustomerError: settings.fetchingCustomerError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSchedulerCustomer,
      getSchedulerCustomer,
     
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCustomerForm);
