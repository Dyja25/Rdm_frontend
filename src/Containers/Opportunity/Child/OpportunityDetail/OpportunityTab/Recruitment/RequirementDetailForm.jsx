import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Input, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field ,FieldArray} from "formik";
import {
  getProcessForRecruit,


} from "../../../../../Settings/SettingsAction";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  Spacer,
  StyledLabel,
  TextInput,
} from "../../../../../../Components/UI/Elements";
import { getAllPartnerListByUserId } from "../../../../../Partner/PartnerAction"

import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";

import { updateRecruitment, getContactListByOpportunityId, getRecruiterName } from "../../../../OpportunityAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray.jsx";
// import { opportunityReducer } from "../../../../OpportunityReducer";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Select } from "antd";

const { Option } = Select;


function RequirementDetailForm(props) {
  const recruiterOptionNameOption = props.currentOpportunityRecruitmentData.recruiterList===null?[]: props.currentOpportunityRecruitmentData.recruiterList.map((item) => {
    return item.employeeId
  }
  )
  const partnerOptionNameOption = props.currentOpportunityRecruitmentData.partnerList===null?[]:props.currentOpportunityRecruitmentData.partnerList.map((item) => {
    return item.partnerId
  }
  )
  const [typeData1, setTypeData1] = useState(true);
  const [typeData, setTypeData] = useState(true);
  const [recruiterNames, setRecruters] = useState(recruiterOptionNameOption);
  const [partners, setPartners] = useState(partnerOptionNameOption);
  useEffect(() => {
    console.log("helo")
    const recruiterOptionNameOption = props.currentOpportunityRecruitmentData.recruiterList===null?[]:props.currentOpportunityRecruitmentData.recruiterList.map((item) => {
      return item.employeeId
    }

    );
    const partnerOptionNameOption = props.currentOpportunityRecruitmentData.partnerList===null?[]:props.currentOpportunityRecruitmentData.partnerList.map((item) => {
      return item.partnerId
    }
    )
    setPartners(partnerOptionNameOption)
    setRecruters(recruiterOptionNameOption)
    console.log("test", recruiterOptionNameOption)
  }, [props.currentOpportunityRecruitmentData]);
  useEffect(() => {
    props.getProcessForRecruit(props.organizationId);
    props.getContactListByOpportunityId(props.opportunityId);
    // props.getRecruiterName();
    props.getAllPartnerListByUserId(props.userId);
    props.getRecruiterName();
  }, []);

  function handleChangeRecruiter(value) {
    setRecruters(value)
  }
  function handleChangePartner(value) {
    setPartners(value)
  }
  function handleType(checked) {
    setTypeData(checked);
  }
  function handleWhiteBlue(checked) {
    setTypeData1(checked);
  }

  const Sponsor = props.contactListByOpportunityId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });





  const processOption = useMemo(() => {
    debugger;
    if (!props.recruitProcess) return [];
    return (
      props.recruitProcess.length &&
      props.recruitProcess.map((process) => {
        return {
          label: process.recruitmentProcessName || "",
          value: process.recruitmentProcessId,
        };
      })
    );
  }, [props.recruitProcess]);


  function handleReset(resetForm) {
    resetForm();
  }
//   console.log("world", recruiterNames)
  // if (!props.currentOpportunityRecruitmentData.requirementName) {
  //   return (<BundleLoader />)
  // }

  return (

    <>
      <Formik
        enableReinitialize
        initialValues={{
          workPreference:props.currentOpportunityRecruitmentData.workPreference || "",
          jobOrder: props.currentOpportunityRecruitmentData.jobOrder || "",
           partnerId: partners,
           closeByDate: dayjs(props.currentOpportunityRecruitmentData.closeByDate) || dayjs(),
          requirementName: props.currentOpportunityRecruitmentData.requirementName || "",
          number: props.currentOpportunityRecruitmentData.number || "",
          sponserId: props.currentOpportunityRecruitmentData.sponserId || "",
          description: props.currentOpportunityRecruitmentData.description || "",
          avilableDate: dayjs(props.currentOpportunityRecruitmentData.avilableDate) || "",
          endDate: dayjs(props.currentOpportunityRecruitmentData.endDate) || "",
          billing: props.currentOpportunityRecruitmentData.billing || "",
          recruitersId: recruiterNames,
          // location: props.currentOpportunityRecruitmentData.location,
          experience: props.currentOpportunityRecruitmentData.experience,
          currency: props.currentOpportunityRecruitmentData.currency || "",
          recruitmentProcessId: props.currentOpportunityRecruitmentData.recruitmentProcessId,
          // stageId: undefined,
          opportunityId: props.opportunityId,
          recruitmentId: props.currentOpportunityRecruitmentData.recruitmentId,
          //  recruiterId:[],
          type: typeData ? "Permanent" : "Contractor",
          category: props.currentOpportunityRecruitmentData.typeData1 ? "White" : "Blue",
          address: [
            {
              addressType: "",
              address1: props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].address1 : "",
              address2: props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].address2 : "",
              town:props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].town : "",
              street:props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].street : "",
              city: props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].city : "",
              postalCode: props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].postalCode : "",
              houseNo: props.currentOpportunityRecruitmentData.address.length ? props.currentOpportunityRecruitmentData.address[0].houseNo : "",
              // country: this.props.user.countryName,
              latitude: "",
              // skills:[],
              longitude: "",
            },
          ],
        }}
        // validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });
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
          let newavilableDate = dayjs(values.avilableDate).format("YYYY-MM-DD");
          console.log(newavilableDate);
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
          props.updateRecruitment(
            {
              ...values,
              recruitersId: recruiterNames,
              partnerId: partners,
              category: values.typeData1 === true ? "White" : "Blue",
              avilableDate: `${newavilableDate}T00:00:00Z`,
              // opportunityId: props.opportunityId,
              type: typeData ? "Permanent" : "Contractor",
            },
            props.opportunityId,
            () => handleReset(resetForm)
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
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <Field
        name="jobOrder"
        label={
          <FormattedMessage
            id="app.jobId"
            defaultMessage="Job ID"
          />
        }
        isColumn
        width={"100%"}
        inlineLabel
        component={InputComponent}
      />
    </div>

    <div style={{ width: "48%" }}>
      <Field
        name="requirementName"
        label={
          <FormattedMessage
            id="app.name"
            defaultMessage="Name"
          />
        }
        width={"100%"}
        isRequired
        isColumn
        inlineLabel
        component={InputComponent}
      />
    </div>
  </FlexContainer>

  <Spacer />
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <Field
        name="experience"
        label={
          <FormattedMessage
            id="app.experienceInYear"
            defaultMessage="Experience (in Years)"
          />
        }
        isColumn
        width={"100%"}
        inlineLabel
        component={InputComponent}
      />
    </div>

    <div style={{ width: "48%" }}>
      {/* <div style={{ width: "47%", }}>
                    <Field
                      name="location"
                      //label="Name"
                      label={<FormattedMessage
                        id="app.location"
                        defaultMessage="Location"
                      />}
                      width={"100%"}
                      // isRequired
                      isColumn
                      inlineLabel
                      component={InputComponent}
                    />

                  </div> */}
      <Field
        name="workPreference"
        label={
          <FormattedMessage
            id="app.workPreference"
            defaultMessage="Work Preference"
          />
        }
        className="field"
        isColumn
        width={"100%"}
        component={SelectComponent}
        options={["Remote", "Hybrid", "Office"]}
        inlineLabel
      />
    </div>
  </FlexContainer>

  <Spacer />

  {/* Row 3 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "100%" }}>
      <Field
        name="closeByDate"
        label={
          <FormattedMessage
            id="app.closeBy"
            defaultMessage="Close By"
          />
        }
        isRequired
        component={DatePicker}
        isColumn
        // width={"100%"}
        value={values.closeByDate}
        inlineLabel
        style={{
          width:"100%"
        }}
      />
    </div>

    {/* <div style={{ width: "48%" }} /> */}
  </FlexContainer>

  <Spacer />

  {/* Row 4 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%", marginTop:"5px" }}>
      <Field
        name="sponserId"
        label={
          <FormattedMessage
            id="app.sponserId"
            defaultMessage="Customer Contact"
          />
        }
        isColumn
        className="w-full"
        style={{ width: "100%" }}
        inlineLabel
        component={SelectComponent}
        options={Array.isArray(Sponsor) ? Sponsor : []}
      />
    </div>

    <div style={{ width: "48%" }}>
      <StyledLabel>Vendor</StyledLabel>

      <Select
        name="partnerId"
        style={{ width: "100%" }}
        placeholder="Select"
        defaultValue={partners}
        onChange={handleChangePartner}
      >
        {props.allpartnerByUserId.map((item) => {
          return (
            <Option value={item.partnerId}>
              {item.partnerName}
            </Option>
          );
        })}
      </Select>
    </div>
  </FlexContainer>

  <Spacer />

  {/* Row 5 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <StyledLabel>Recruiter</StyledLabel>

      <Select
        name="recruitersId"
        style={{ width: "100%" }}
        placeholder="Select"
        defaultValue={recruiterNames}
        onChange={handleChangeRecruiter}
      >
        {props.recruiterName.map((item) => {
          return (
            <Option value={item.employeeId}>
              {item.fullName}
            </Option>
          );
        })}
      </Select>
    </div>

    <div style={{ width: "48%", marginTop:"5px" }}>
      <Field
        name="number"
        label="# Positions"
        width={"100%"}
        isRequired
        isColumn
        component={InputComponent}
      />
    </div>
  </FlexContainer>

  <Spacer />

<<<<<<< Updated upstream
                <Spacer />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="recruitmentProcessId"
                      // label="Workflow"
                      label={<FormattedMessage
                        id="app.workflow"
                        defaultMessage="Workflow"
                      />}
                      isRequired
                      disabled
                      isColumn
                      // component={InputComponent}
                      component={SelectComponent}
                      options={Array.isArray(processOption) ? processOption : []}
                    />
                  </div>
                  <div style={{ width: "47%", }}>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "45%" }}>
                        {" "}
                        <Field
                          name="billing"
                          // label={typeData ? "Salary" : "Rate/hr"}
                          label={typeData ?(<FormattedMessage
                        id="app.salary"
                        defaultMessage="Salary"
                      />) : (<FormattedMessage
                        id="app.rate/hr"
                        defaultMessage="Rate/hr"
                      />) }
                          // label={<FormattedMessage
                          //   id="app.billing"
                          //   defaultMessage="Billing/hour"
                          // />}
                          width={"100%"}
                          isRequired
                          isColumn
                          component={InputComponent}
                        />
                      </div>
                      <div style={{ width: "52%", marginTop: "20px", }}>
                        <Field
                          name="currency"
                          placeholder="Curr"
                          noLabel
                          isRequired
                          selectType="currencyName"
                          component={SearchSelect}
                          flag={values.currency}
                        // options={Array.isArray(currency) ? currency : []}
                        />
                      </div>
=======
  {/* Row 6 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <StyledLabel>Type</StyledLabel>
      <br />
>>>>>>> Stashed changes

      <Switch
        checked={typeData}
        onChange={handleType}
        checkedChildren="Permanent"
        unCheckedChildren="Contractor"
      />
    </div>

    <div style={{ width: "48%" }}>
      <Field
        name="recruitmentProcessId"
        label={
          <FormattedMessage
            id="app.workflow"
            defaultMessage="Workflow"
          />
        }
        isRequired
        disabled
        isColumn
        component={SelectComponent}
        options={
          Array.isArray(processOption)
            ? processOption
            : []
        }
      />
    </div>
  </FlexContainer>

  <Spacer />

  {/* Row 7 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <Field
        name="billing"
        label={typeData ? "Salary" : "Rate/hr"}
        width={"100%"}
        isRequired
        isColumn
        component={InputComponent}
      />
    </div>

    <div style={{ width: "48%", marginTop: "20px" }}>
      <Field
        name="currency"
        placeholder="Curr"
        noLabel
        isRequired
        selectType="currencyName"
        component={SearchSelect}
        flag={values.currency}
      />
    </div>
  </FlexContainer>

  <Spacer />

  {/* Row 8 */}
  <FlexContainer justifyContent="space-between" style={{ gap: "12px" }}>
    <div style={{ width: "48%" }}>
      <Field
        name="avilableDate"
        label={
          <FormattedMessage
            id="app.startdate"
            defaultMessage="Start Date"
          />
        }
        isRequired
        component={DatePicker}
        isColumn
        width={"100%"}
        value={values.avilableDate}
        inlineLabel
      />
    </div>

    <div style={{ width: "48%" }}>
      <Field
        name="endDate"
        label={
          <FormattedMessage
            id="app.enddate"
            defaultMessage="End Date"
          />
        }
        component={DatePicker}
        isColumn
        width={"100%"}
        value={values.endDate}
        inlineLabel
      />
    </div>
  </FlexContainer>

  <Spacer />

  {/* Row 9 */}
  <FlexContainer alignItems="center">
    <StyledLabel style={{ marginLeft: "0px" }}>
      <FormattedMessage
        id="app.category"
        defaultMessage="Category"
      />
    </StyledLabel>

    <Switch
      style={{
        width: "5em",
        marginLeft: "12px",
      }}
      checked={typeData1}
      onChange={handleWhiteBlue}
      checkedChildren={
        <FormattedMessage
          id="app.white"
          defaultMessage="White"
        />
      }
      unCheckedChildren={
        <FormattedMessage
          id="app.blue"
          defaultMessage="Blue"
        />
      }
    />
  </FlexContainer>
</div>
              &nbsp;
              <div
                style={{
                  height: "100%",
                  width: "47%",
                }}
              >
                <FlexContainer justifyContent="space-between">
                <div style={{ width: "100%" }}>
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  </div>
                  <div style={{ width: "100%" }}>
                    <Field
                      name="description"
                      //label="Description"
                      label={<FormattedMessage
                        id="app.description"
                        defaultMessage="Description"
                      />}
                      width={"100%"}
                      isColumn
                      component={TextareaComponent}
                      style={{
                        height: "27em",

                      }}
                    />
                  </div>
                </FlexContainer>
              </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
              {/* <Button
                type="primary"
                htmlType="submit"
              //   Loading={props.linkingRecruitToOpportunity}
              >
                <FormattedMessage
                  id="app.update"
                  defaultMessage="Update"
                />
              
              </Button> */}
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  opportunity,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({

  currentOpportunityRecruitmentData: opportunity.currentOpportunityRecruitmentData,
  updatingRecruitment: opportunity.updatingRecruitment,
  opportunityId: opportunity.opportunity.opportunityId,
  recruitByOpportunityId: opportunity.recruitByOpportunityId,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  //   recruitProcess: settings.recruitProcess,
  //   user: auth.userDetails,
  //   recruitProcessStages: settings.recruitProcessStages,
  //   // allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  //   organizationId: auth.userDetails.organizationId,
  opportunityId: opportunity.opportunity.opportunityId,
  //   // currencies: opportunity.currencies,
  //   linkingRecruitToOpportunity: opportunity.linkingRecruitToOpportunity,
  contactListByOpportunityId: opportunity.contactListByOpportunityId,
  recruiterName: opportunity.recruiterName,
  allpartnerByUserId: partner.allpartnerByUserId,
  recruitProcess: settings.recruitProcess,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getProcessForRecruit,
      // getProcessStagesForRecruit,
      // // getAllProcessStagesForRecruit,
      // addRecruit,
      // getCurrency,
      getProcessForRecruit,
      getContactListByOpportunityId,
      getAllPartnerListByUserId,
      getRecruiterName,
      //   getRecruiterName
      updateRecruitment
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RequirementDetailForm);