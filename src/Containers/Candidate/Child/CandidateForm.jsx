import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCountries,  } from "../../../Containers/Auth/AuthAction";
import { getDepartments } from "../../../Containers/Settings/Department/DepartmentAction";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import {
  getLibrarys,
 
} from "../../../Containers/Settings/Library/LibraryAction";
import { Button, Select, Input, Tag, Switch, Checkbox } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { Spacer } from "../../../Components/UI/Elements";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray.jsx";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
//import { InputComponent1 } from "../../../Components/Forms/Formik/InputComponent1";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addCandidate,getValidEmail } from "../CandidateAction";
import Upload from "../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";
// import {getAllPartnerListByUserId} from "../../Partner/PartnerAction";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import SkillsLoadMore from "./CandidateTable/SkillsLoadMore";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CandidateSchema = Yup.object().shape({
  // experience:Yup.string()
  // .integer("Must be more than 0"),
  // contactOwner: Yup.string().required("Select contact owner"),
  emailId: Yup.string()
 
    .email("Enter a valid Email")
    .required("Input needed!"),
  firstName: Yup.string().required("Input needed!"),
  // phoneNumber: Yup.string().matches(phoneRegExp, "Enter a valid Phone No").required("Input needed!"),
  // tag_with_company: Yup.string().required("Select Company"),
  // billing: Yup.string().required("Input needed!"),
  // currency: Yup.string().required("Select Currency"),
});

class CandidateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: true,
      billing: false,
      whiteblue: true,
      checked: true,
      whatsapp:false,
      value: '',
      share:false
      // onChange4: this.onChange4.bind(this)

    };
  }

  NumericOnly= (e) => { //angka only
    const reg = /^[0-9\b]+$/
    let preval=e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) return true
    else e.target.value = preval.substring(0,(preval.length-1))
}

//   onChange4(e){
//     const re = /^[0-9\b]+$/;
//     if (e.target.value === '' || re.test(e.target.value)) {
//        this.setState({value: e.target.value})
//     }
//  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleShare = (checked) => {
    this.setState({ share: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handlebilling = (checked) => {
    this.setState({ billing: checked });
  };
  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }

  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

 

  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

 

  componentDidMount() {
    const { getLibrarys,organizationId,} = this.props;
    const emailId=this.props.responseData&&this.props.responseData.emails.length && this.props.responseData.emails[0]
    console.log();
    getLibrarys(organizationId);
    this.props.getValidEmail(emailId)
    this.props.getSectors();
    this.props.getDepartments();
    this.props.getCountries();
  }
  // componentDidMount() {
  //   this.props.getCurrency();
  // }
  render() {
    const {
      user: { userId, firstName, lastName,department },
      addCandidate,
      addingCandidate,
      availableDate,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
    } = this.props;
    console.log(this.props.resumeForm.length && this.props.resumeForm)
    console.log(this.props.sectors)
    //console.log(this.props.responseData ? this.props.responseData.linkedInProfile.length && this.props.responseData.linkedInProfile : "")

    const libraryOption = this.props.librarys.map((item) => {
      return {
        // label: `${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.name || ""}`,
        // value: item.userId,
        label: item.name || "",
        value: item.name,
      };
    });
    // console.log(linkContact);
    
    // const sectorOption = this.props.sectors.map((item) => {
    //   return {
    //     label: item.sectorName||"",
    //     value: item.sectorId,
    //   };
    // });
   
    // console.log("sector",sectorOption)
    // const getdepartmentOptions =(filterOptionKey, filterOptionValue)=> {
    //   const departmentOptions =
    //     this.props.departments.length &&
    //     this.props.departments
    //       .filter((option) => {
    //         if (
    //           option.sectorId === filterOptionValue &&
    //           option.probability !== 0
    //         ) {
    //           return option;
    //         }
    //       })
    //       .map((option) => ({
    //         label: option.departmentName || "",
    //         value: option.departmentId,
    //       }));
  
    //   return departmentOptions;
    // }

    return (
      <>
        <Formik
          initialValues={{
            sectorId: "",
            roleTypeId: "",
            workpreference:"Remote",
            partnerId: "",
            experience:"",
            sectorName: "",
            partnerName: "",
            sectorDescription: "",
            currentCtc: "",
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            noticeDetail: "",
            channel:"Self",
            definationId:[],
            countryDialCode: this.props.user.countryDialCode,
            phoneNumber: "",
            // mobileNumber: "", phoneNumbers
            mobileNumber: this.props.responseData&&this.props.responseData.phoneNumbers.length  ?  this.props.responseData.phoneNumbers[0] : "",
            countryDialCode1: this.props.user.countryDialCode,
            emailId: this.props.responseData ? this.props.responseData.emails.length && this.props.responseData.emails[0] : "",
            documentId: this.props.resumeForm.length && this.props.resumeForm ? this.props.resumeForm.length && this.props.resumeForm : "",
            // emailId:"",
           
            // designation: "",
            linkedin_public_url: this.props.responseData&&this.props.responseData.hasOwnProperty("linkedInProfile") ? this.props.responseData.linkedInProfile: "",
            designation: "",
            departmentId:"",
            countryDialCode1:"",
            phoneNumber:"",
            notes: "",
            country: this.props.user.country,
            availableDate: availableDate || dayjs(),
            benifit: "",
            tag_with_company: "",
            billing: 0,
            noticeDetail: "",
            currency: this.props.user.currency,
            userId: this.props.userId,
            active: this.state.availability ? "true" : "false",
            workType: this.state.billing ? "Permanent" : "Contract",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            share:this.state.share ? "true" : "false",
            category: this.state.checked ? "Both" : this.state.whiteblue ? "White" : "Blue",
            // startDate: dayjs(),
            dateOfBirth: dayjs(),
            gender: "",
            nationality: this.props.user.countryName,
            idProof: "",
            idNumber: "",
            CostType: "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                houseNo:"",
                country: this.props.user.countryName,
                latitude: "",
                skills:[],
                longitude: "",
              },
            ],
          }}
          validationSchema={CandidateSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Value1",values)
            console.log(values,this.props.responseData&&this.props.responseData.phoneNumbers.length  ?  this.props.responseData.phoneNumbers[0] : "",);

          
            addCandidate(
              {
                ...values,
                // skills: this.props.responseData ? this.props.responseData.skills : [],
                skills:this.props.responseData ? this.props.responseData.skills.concat(values.skills):values.skills||[],
                mobileNumber:values.mobileNumber,
                linkedin_public_url:values.linkedin_public_url,
                //linkedin: this.props.responseData ? this.props.responseData.linkedInProfile.length && this.props.responseData.linkedInProfile:"",
                // emailId:this.props.responseData ? this.props.responseData.emails : "",


                active: this.state.availability ? "true" : "false",
                workType: this.state.billing ? "Permanent" : "Contract",
                whatsapp: this.state.whatsapp ? "Different" : "Same",
                // category: this.state.whiteblue ?"White" : "Blue",
                category: this.state.checked ? "Both" : this.state.whiteblue ? "White" : "Blue",
                // availableDate: dayjs(values.availableDate).format(
                //   "YYYY-MM-DD"
                availableDate: dayjs(values.availableDate).toISOString(),
                // availableDate: `${newavailableDate}T00:00:00Z`,

              },
              this.props.userId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form className="form-background">
   <div className="flex justify-between h-[70vh] overflow-y-scroll overflow-x-hidden pr-[0.6em]">
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <FlexContainer flexWrap="no-wrap">
                    <FastField name="imageId" component={Upload} />
                    <div style={{marginLeft:"16px"}}>
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "41%" }}>
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None","Dr.","Mevr.","Dhr."]}
                            component={SelectComponent}
                            inlineLabel
                            className="field w-[100px]"
                            isColumn
                          />
                        </div>

                        <div style={{ width: "54%" }}>
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </FlexContainer>
                            <Spacer />
                      <FlexContainer justifyContent="space-between">
                        {/* <div style={{ width: "40%" }}>
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middleName"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div> */}
                        <div style={{ width: "46%" }}>
                      <FastField
                        name="gender"
                        type="text"
                        // label="Salutation"
                        label={
                          <FormattedMessage
                            id="app.gender"
                            defaultMessage="Gender"
                          />
                        }
                        options={["Male", "Female", "Others"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field w-full"
                        isColumn
                      />
                    </div>
                        <div style={{ width: "50%" }}>
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastName"
                                defaultMessage="Last Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>                  
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "70%" }}>
                      <FastField
                        isRequired
                        type="email"
                        name="emailId"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                         {/* {this.props.validEmail.candidateInd==true&& ( */}
                         {values.emailId ===this.props.validEmail.emailId && (
                  <div style={{color:"red"}}>{this.props.validEmail.candidateInd==true?this.props.validEmail.message:null}</div>
                         )}  
                {/* )} */}
                    </div>                 
                    <div style={{ width: "28%" }}>
                      <FastField
                        // isRequired
                        // type="email"
                        name="workpreference"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.workpreference"
                            defaultMessage="Work Preference"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={SelectComponent}
                        options={[
                          "Remote",
                          "Hybrid",
                          "Office"
                        ]}
                        // defaultValue={'value'}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                                    
                    <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="nationality"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.nationality"
                            defaultMessage="Nationality"
                          />
                        }
                        isColumn                        
                        selectType="country"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName}
                        inlineLabel
                      />
                    </div>
                   
                    {/* <div style={{ width: "47%" }}>
                      <div>
                      <StyledLabel >Allow sharing info?</StyledLabel> 
                      </div>                      
                      <div>
                      <Switch                                              
                         checked={this.state.share}
                         onChange={this.handleShare}
                        // disabled={this.state.availability}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                      </div>
                    </div>                       */}
                      </FlexContainer>
                      <Spacer/>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Mobile #"
                          />
                        }
                        isColumn                       
                        selectType="dialCode"                       
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "40%", }}>
                      <FastField
                        type="text"
                        name="mobileNumber"                      
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        style={{ flexBasis: "30%" }}
                        isColumn
                      />
                    </div>
                    {/* <div
                      style={{
                        width: "25%",
                        fontWeight: "bold",                      
                      }}
                    >
                      WhatsApp
                      <Switch                        
                         onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div> */}
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        {" "}
                         {this.state.whatsapp && ( 
                          <Field
                            name="countryDialCode1"
                            isColumnWithoutNoCreate
                            selectType="dialCode"
                            //label="Available from"

                            label={
                              <FormattedMessage
                                id="app.#whatsApp"
                                defaultMessage="WhatsApp #"
                              />
                            }
                            component={SearchSelect}
                            isColumn
                            // value={values.availableDate}
                            inlineLabel                            
                           
                          />
                         )} 
                      </div>
                      <div style={{ width: "47%" }}>
                      {this.state.whatsapp && ( 
                        <FastField
                          name="phoneNumber"
                          //label="Email"
                          // label={
                          //   <FormattedMessage
                          //     id="app.experience"
                          //     defaultMessage="Experience (Years)"
                          //   />
                          // }
                          // className="field"
                          isColumn
                          width={"100%"}
                          style={{ flexBasis: "30%" }}
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                         
                      </div>
                         
                      </FlexContainer>
                      {/* <Spacer /> */}
                  <FlexContainer justifyContent="space-between">
                      <div style={{ width: "100%" }}>
                      <FastField
                        type="text"
                        name="linkedin_public_url"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        //value={ this.props.responseData.hasOwnProperty("linkedInProfile") ? this.props.responseData.linkedInProfile: ""}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    </FlexContainer>                 
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="idProof"
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.idproof"
                            defaultMessage="ID Proof"
                          />
                        }
                        isColumn                       
                        options={[
                          "PassPort",
                          "ID Card",
                        ]}

                        component={SelectComponent}                       
                        inlineLabel
                        className="w-full"
    style={{ width: "100%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        type="idNumber"
                        name="idNumber"
                        //placeholder="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.idNumber"
                            defaultMessage="ID Number"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </FlexContainer>
                 
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="dateOfBirth"
                        label={
                          <FormattedMessage
                            id="app.dateOfBirth"
                            defaultMessage="Date of Birth"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.dateOfBirth}
                      // defaultValue={dayjs("2020-01-01")}
                      />
                    </div>                 

                    {/* <div style={{ width: "47%" }}>
                      <FastField
                        name="gender"
                        type="text"
                        // label="Salutation"
                        label={
                          <FormattedMessage
                            id="app.gender"
                            defaultMessage="Gender"
                          />
                        }
                        options={["Male", "Female", "Others"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                      />
                    </div> */}
                  </FlexContainer> 
                <Spacer />
                <div className="w-full">
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
                  <FlexContainer justifyContent="space-between">
                   
                    <div style={{ width: "47%" }}>
                      {/* <Field
                        // name="address[0].country"
                        name="country"
                        isColumnWithoutNoCreate
                        // label="Country"

                        label={
                          <FormattedMessage
                            id="app.country"
                            defaultMessage="Country"
                          />
                        }
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName}
                        selectType="country"
                        inlineLabel
                        // style={{ flexBasis: "80%" }}
                        isColumn
                        width="100%"
                      /> */}
                        <StyledLabel >Country</StyledLabel> 
                        <Select
                        name="country"
                        //mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select"
                        //defaultValue={recruiterNames}
                        //onChange={handleChangeRecruiter}
                      >
  
                        {this.props.countries.map((item, i) => {
                          return (
                            <Option value={item.countryName}>{item.countryName}</Option>
                          )
                        })}
                      </Select>
                    </div>
                    
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        name="houseNo"
                        isColumnWithoutNoCreate
                         label="House No"

                      
                        component={InputComponent}
                     
                      
                        inlineLabel
                        // style={{ flexBasis: "80%" }}
                        isColumn
                        width="100%"
                      />
                    </div> */}
                  </FlexContainer>
                </div>
                
                <div
                  style={{
                    height: "70%",
                    width: "45%",
                  }}
                >
                  {this.props.responseData && (
                    <>
                      <StyledLabel>Skill set</StyledLabel>
                      <SkillsLoadMore
                        skillList={this.props.responseData.skills}
                      />
                    </>
                  )}
                  <>
                  <FlexContainer justifyContent="space-between">
                    <FlexContainer justifyContent="space-between">

                       <Field
                    name="skills"
                    //  selectType="contactList"
                    // isColumnWithoutNoCreate
                    label="Skills"
                  
                  mode
                    placeholder="Select"
                    width={"100%"}
                   component={SelectComponent}
                    options={Array.isArray(libraryOption) ? libraryOption : []}
                     
                  />
                    </FlexContainer>
                    </FlexContainer>
                    <Spacer style={{ marginTop: "1em" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        // name="department"
                        name="sectorId"
                        isColumnWithoutNoCreate
                         selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }                        
                        isColumn  
                        component={SearchSelect}                      
                        // component={SelectComponent}
                        // options={Array.isArray(sectorOption) ? sectorOption : []}                      

                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="departmentId"
                         selectType="departmentListFilter"
                         isColumnWithoutNoCreate
                        label="Department"
                        component={SearchSelect}   
                        isColumn
                        //  component={SelectComponent}
                        //  options={
                        //   Array.isArray(
                        //     getdepartmentOptions("sectorId", values.sectorId)
                        //   )
                        //     ? getdepartmentOptions("sectorId", values.sectorId)
                        //     :
                        //     []
                        // }
                        //value={values.departmentId}
                        filterOption={{
                          filterType: "candidate",
                          filterValue: values.sectorId,
                        }}
                        // disabled={!values.sectorId}
                        // value={values.designationTypeId}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  
                  <FlexContainer justifyContent="space-between">                   
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="roleTypeId"
                        selectType="roleType"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.role"
                            defaultMessage="Role"
                          />
                        }
                        isColumnWithoutNoCreate                        
                        isColumn
                        component={SearchSelect}                        
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="designation"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="Designation"
                          />
                        }
                        isColumnWithoutNoCreate
                        selectType="designationType"                        
                        isColumn
                        // component={SelectComponent}
                        component={SearchSelect}
                        value={values.designationTypeId}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>               
                  
                <FlexContainer justifyContent="space-between">
                <div style={{ width: "47%" }}>
                      <>
                        <Field
                          name="tag_with_company"
                          // selectType="customerList"
                          // label="Tag Company"
                          label={
                            <FormattedMessage
                              id="currentemployer"
                              defaultMessage="Current Employer"
                            />
                          }
                          component={InputComponent}
                          isColumn
                          // value={values.customerId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          width={"100%"}
                        />
                      </>
                    </div>
                  <div style={{ width: "47%" }}>
                      <FastField
                        name="partnerId"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.vendor"
                            defaultMessage="Vendor"
                          />
                        }
                        isColumn                       
                        selectType="partnerListName"
                        component={SearchSelect}                       
                        inlineLabel
                      />
                    </div>                    
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1em" }} />
                  <FlexContainer justifyContent="space-between">
                  <div>
                  <StyledLabel >Category</StyledLabel>
                  </div>
                  <div style={{width:"26%"}}>
                  <Switch  
                    checked={this.state.whiteblue}
                    onChange={this.handleWhiteBlue}
                    disabled={this.state.checked}
                    checkedChildren="White collar"
                    unCheckedChildren="Blue collar"
                    />
                    </div>
                    <div>
                    <Checkbox
                    checked={this.state.checked}
                    onChange={() => this.handleChange()}
                    style={{ marginLeft: "auto" }}
                    >Both
                    </Checkbox>
                    </div>
                    <div>
                    <StyledLabel>Type</StyledLabel>
                    </div>
                    <div style={{width:"25%"}}>
                    <Switch                                           
                      checked={this.state.billing}
                      onChange={this.handlebilling}
                      checkedChildren="Permanent"
                      unCheckedChildren="Contract"
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1em" }} />
                  <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                  <FlexContainer justifyContent="space-between">
                  <StyledLabel >Active</StyledLabel>                     
                  <Switch                                              
                  checked={this.state.availability}
                  onChange={this.handleAvailability}
                   // disabled={this.state.availability}
                   checkedChildren="Yes"
                   unCheckedChildren="No"
                    />
                  </FlexContainer>
                  </div>    
                  </FlexContainer>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        {" "}
                        {this.state.availability && (
                          <Field
                            name="availableDate"
                            //label="Available from"

                            label={
                              <FormattedMessage
                                id="app.availableDate"
                                defaultMessage="Available from"
                              />
                            }
                            // disabled={!this.state.availability}
                            component={DatePicker}
                            isColumn
                            width={"100%"}
                            value={values.availableDate}
                            inlineLabel                            
                            disabledDate={(currentDate) => {
                              if (values.availableDate) {
                                if (
                                  dayjs(currentDate).isBefore(
                                    dayjs(values.availableDate)
                                  )
                                ) {
                                  return true;
                                } else {
                                  return false;
                                }
                              }
                            }}
                          />
                        )}
                      </div>
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="experience"
                          type="number"
                          //label="Email"
                          label={
                            <FormattedMessage
                              id="app.experience"
                              defaultMessage="Experience (in Years)"
                            />
                          }
                          // className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                        />
                     {/* <StyledLabel>Experience(in Years)</StyledLabel>   */}

                  {/* <Input 
                  type="number"
                  name="experience"
                  style={{ 
                    width: '100%',
                    border: "0.0625em solid gainsboro",
    backgroundColor: "#fff",
    height: "1.8125em",
    boxShadow: "0em 0.25em 0.625em -0.25em #aaa"
                   }}
                  placeholder="Select"
                  />  */}
                  {/* <input 
type="text"
className="form-control"
name="experience"
onChange={this.NumericOnly}
/> */}

  
                      </div>
                      </FlexContainer>
                      <Spacer style={{marginTop:"1.25em"}}/>
                      <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          name="billing"
                          label={this.state.billing ? "Expectation" : "Billing"}

                          // label={ 
                          //   <FormattedMessage
                          //     id="app.billing"
                          //     defaultMessage="Billing/Hr"
                          //   />
                          // }

                          width={"100%"}
                          isColumn
                          component={InputComponent}                          
                        />
                       
                      </div>
                  
                      {this.state.billing ? (
                      <div style={{ width: "47%" }}>
                        <Field
                          name="CostType"
                          //label="Email"
                          label={
                            <FormattedMessage
                              id="app.cost"
                              defaultMessage="Cost Type"
                            />
                          }
                          // className="field"
                          isColumn
                          width={"100%"}
                          component={SelectComponent}
                          options={[ "Monthly Salary", "Annual Salary"]}
                         
                          inlineLabel
                        />
                      </div>
                        ) : (
                       
                      <div style={{ width: "47%" }}>
                        <Field
                          name="CostType"                         
                          label="Cost Type"
                          // className="field"
                          isColumn
                          width={"100%"}
                          component={SelectComponent}
                          options={["Hourly", "Weekly", "Monthly"]}
                          inlineLabel
                          className="w-full"
    style={{ width: "100%" }}
                        />                       

                      </div>
                       )}
                          </FlexContainer>
                    
                  </>
                
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        // isRequired
                        // type="text"
                        name="currentSalary"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.currentsalary"
                            defaultMessage="Current Salary"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>

                    <div style={{ width: "47%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                    </div>
                  </FlexContainer>
                 
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="benifit"
                        //label="State"
                        label={
                          <FormattedMessage
                            id="benifit"
                            defaultMessage="Benefits"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>                    
                    <div style={{ width: "47%", marginTop:"0.2rem" }}>
                      <FastField
                        name="noticePeriod"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.notice"
                            defaultMessage="Notice (months)"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        options={["1","2","3","4","5","6","7","8"]}
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                    </FlexContainer>
                   
                    <FlexContainer >
                      <div style={{ width: "100%" }}>
                        <Field
                          name="noticeDetail"
                          //label="Description"
                          label={
                            <FormattedMessage
                              id="app.noticeperiodinfo"
                              defaultMessage="Notice Period Info"
                            />
                          }
                          isRequired
                          isColumn
                          component={TextareaComponent}
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
                  // icon={<PoweroffOutlined />}
                  Loading={addingCandidate}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate,departments,sector, librarys,team, opportunity }) => ({
  // token: auth.token,
  // opportunityId: opportunity.opportunity.opportunityId,
  // contact: contact.contact,
  addingCandidate: candidate.addingCandidate,
  resumeForm: candidate.resumeForm,
  sectors: sector.sectors,
  organizationId: auth.userDetails.organizationId,
  addingCandidateError: candidate.addingCandidateError,
  // fetchingcontacts: contact.fetchingcontacts,
  // fetchingcontactsError: contact.fetchingcontactsError,
  // contacts: contact.contacts,
  // users: team.users,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
   department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.userDetails && auth.userDetails.partnerLogin,
  // creatorName: opportunity.opportunity.creatorName,
  // creatorId: opportunity.opportunity.creatorId,
  // accountName:
  //   opportunity.opportunity &&
  //   opportunity.opportunity.metaData &&
  //   opportunity.opportunity.metaData.account &&
  //   opportunity.opportunity.metaData.account.accountName,
  // accountIdTag:
  //   opportunity.opportunity &&
  //   opportunity.opportunity.metaData &&
  //   opportunity.opportunity.metaData.account &&
  //   opportunity.opportunity.metaData.account.accountId,
  currencies: auth.currencies,
  countries: auth.countries,
  librarys: librarys.librarys,
  departments: departments.departments,
  validEmail:candidate.validEmail
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      addCandidate,
      getCountries,
      getLibrarys,
      getSectors,
      getDepartments,
      getValidEmail
      // getAllPartnerListByUserId,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
