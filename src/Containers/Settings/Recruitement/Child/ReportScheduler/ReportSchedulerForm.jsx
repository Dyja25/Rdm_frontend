import React,{ useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper } from "../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {addScheduler,getScheduler} from "../../../SettingsAction";


function SchedulerForm(props) {
    useEffect(() => {
        props.getScheduler(props.organizationId)
      }, []);
      console.log(props.scheduler)
  return (
    <>
      <Formik
       enableReinitialize
        initialValues={{
            type: props.scheduler.type,
            department: props.scheduler.department,
            frequency: props.scheduler.frequency,
            orgId: props.organizationId
        }}
        onSubmit={(values) => {
            props.addScheduler(
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
                    options={[ "Requirement", "Selected"] }  
                    inlineLabel
                  />
                </div>
                <div style={{ width: "20%" }}  > 
                  <Field                    
                    name="department"
                    label="Department"
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
    scheduler: settings.scheduler,
    addingScheduler: settings.addingScheduler,
    addingSchedulerError: settings.addingSchedulerError,  
    fetchingScheduler: settings.fetchingScheduler,
    fetchingSchedulerError: settings.fetchingSchedulerError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getScheduler,
      addScheduler
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulerForm);
