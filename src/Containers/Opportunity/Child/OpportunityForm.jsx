import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import  SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import { Button,Tooltip } from "antd";

import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../Config/Auth";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";




import {
  addOpportunity,
  getRecruiterName,
  getAllSalesList
}
  from "../OpportunityAction";
import { FlexContainer } from "../../../Components/UI/Layout";

import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { PlayCircleOutlined, RotateRightOutlined, StopOutlined } from "@ant-design/icons";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  // startDate:Yup.string().required("Input needed!"),
  // endDate:Yup.string().required("Input needed!"),
});
function OpportunityForm (props) {
  // handleReset = (resetForm) => {
  //   resetForm();
  // };

  // componentDidMount() {
  //   this.props.getRecruiterName();
  //   this.props.getAllSalesList();
  // }
  useEffect(() => {
    props.getRecruiterName();
    props.getAllSalesList();
    
  }, []);

  

    const recruiterNameOption = props.recruiterName.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });

    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    const [text, setText] = useState("");
    function handletext(e){
      setText(e.target.value)
    }
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
   // const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
    if (!browserSupportsSpeechRecognition) {
      //SpeechRecognition.startListening({ continuous: true })
      return <span>Browser doesn't support speech recognition.</span>;
    }



    const {
      user: { userId },
      addingOpportunity,
      employeeId,
      salesUserIds,
      fullName,
      contactId,
      customerId,
      startDate,
      endDate,
      defaultCustomers,
      defaultContacts,
      name,
    } = props;
    console.log(customerId);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: "",
            // startDate: dayjs();
            // endDate: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            userId: props.userId,
            description: "",
            proposalAmount: "",
            currency: props.user.currency,
            orgId: props.organizationId,
            customerId: customerId ? customerId.value : "",
            contact: contactId ? contactId.value : "",
            userId: props.userId,
            // recruiterId:[],
            //  salesUserIds: [],
            salesUserIds: props.user.employeeId||""


          }}
          validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);

            let timeZoneFirst = "GMT+05:30";

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;

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

            props.addOpportunity(
              {
                ...values,
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
                startDate: `${newStartDate}T20:00:00Z`,
                endDate: `${newEndDate}T20:00:00Z`,
                description:transcript?transcript:text

                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              },
              props.userId,
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    //label="Name"

                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn

                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        name="startDate"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.startdate"
                            defaultMessage="Start Date"
                          />
                        }
                        component={DatePicker}
                        value={values.startDate}
                        isColumn
                        inlineLabel                       
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        name="endDate"
                        // label="End Date"
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.endDate || values.startDate}
                        inlineLabel                       
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="proposalAmount"
                        //label="Proposal Amount"

                        label={
                          <FormattedMessage
                            id="app.proposalamount"
                            defaultMessage="Proposal Amount"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                       
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        defaultValue={{
                          value: props.user.currency,
                        }}
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                      // flag={values.currency}
                      // options={Array.isArray(currency) ? currency : []}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  {/* <Field
                    name="description"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                         height: "5em",
                      }}
                  /> */}
                  <StyledLabel>
                    {/* Description */}
                    <FormattedMessage
                            id="app.description"
                            defaultMessage="Description"
                          />
                  </StyledLabel>
                    <div>
      {/* <p>Microphone:  {listening ? 'on' : 'off'} 
        </p> */}
      <div>
      <span
      onClick={SpeechRecognition.startListening}
      
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
        {/* <FontAwesomeIcon icon={solid("record-vinyl")} /> */}
        <PlayCircleOutlined/>
        </span>
        </Tooltip>
      </span>
     
      <span
     
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
        {/* <FontAwesomeIcon icon={solid("stop")} /> */}
        <StopOutlined/>
       
        </span>
        </Tooltip>
      </span>
    
     
      <span
       onClick={resetTranscript}
      >
          <Tooltip title="Clear">
             <span style={{ fontSize: "1.5em",marginLeft:"3px" }}>
        {/* <FontAwesomeIcon icon={solid("rotate-right")} /> */}
        <RotateRightOutlined/>
        </span>
        </Tooltip>
        </span>
        </div>
        <div>
        <textarea
        name="description"
        className="textarea"
        type="text"
         value={transcript?transcript:text}
         onChange={handletext}
        >
        
        </textarea>
    
      
      </div>
      
      
     
    </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="salesUserIds"
                    // selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    // margintop={"0"}
                    isColumn
                    // value={values.employeeId}
                    defaultValue={{
                      label: `${fullName}`,
                      value: employeeId,
                    }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  <Field
                    name="customerId"
                    selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <Field
                    name="contactId"
                    selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    margintop={"0"}
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  {/* <Field
                    name="recruiterId"
                    //  selectType="contactList"
                    // isColumnWithoutNoCreate
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.recruiter"
                        defaultMessage="Recruiter"
                      />
                    }
                  mode
                    placeholder="Select"
                    style={{ 
                    flexBasis: "80%",
                    height:"2em",
                    width:"100%",
                    // marginTop:"0.5em" 
                  }}
                   component={SelectComponent}
                    options={Array.isArray(recruiterNameOption) ? recruiterNameOption : []}
                     
                  /> */}
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={addingOpportunity}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  addingOpportunity: opportunity.addingOpportunity,
  addingOpportunityError: opportunity.addingOpportunityError,
  recruiterName: opportunity.recruiterName,
  // salesUserIds:auth.userDetails.userId,
  sales: opportunity.sales,
  currencies: auth.currencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunity,
      getRecruiterName,
      getAllSalesList,


    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityForm);
