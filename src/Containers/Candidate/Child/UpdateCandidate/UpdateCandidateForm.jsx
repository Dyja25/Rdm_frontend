import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getCountries,  } from "../../../../Containers/Auth/AuthAction";
import { Button, Select,Tag, Switch,Checkbox} from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray.jsx";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateCandidate,setEditCandidate } from "../../CandidateAction";
import Upload from "../../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import * as Yup from "yup";
import { SwitchComponent } from "../../../../Components/Forms/Formik/SwitchComponent";
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
const { Option } = Select;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCandidateSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Enter a valid Email")
    .required("Input needed!"),
  firstName: Yup.string().required("Input needed!"),
});
class UpdateCandidateForm extends Component {
  constructor(props) {
    super(props);
    const { category, whatsApp, workType,active } = props.setEditingCandidate || {};
    this.state = {
      // availability: true,
      // billing:false,
      // whiteblue:false,
      // checked:false,
      // whatsapp:false,
      availability: active === true,
      billing: workType === "Permanent",
      whiteblue: category === "White",
      checked: category !== "White" && category !== "Blue", // If neither White nor Blue, assume Both
      whatsapp: whatsApp === "Same",
    };
  }
 

  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked , checked: false });
  };
  handleAvailability = (checked) => {
    this.setState({ availability:checked});
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handlebilling = (checked) => {
    this.setState({ billing: checked });
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked, whiteblue: false
    });
  };
  componentDidMount () {
    this.setState({whiteblue:this.props.setEditingCandidate.category==="White"?true : false,whatsapp:this.props.setEditingCandidate.whatsApp==="Same"?true : false,billing:this.props.setEditingCandidate.workType==="Permanent"?true : false,
  checked:this.props.setEditingCandidate.category==="White" || this.props.setEditingCandidate.category==="Blue"? false  : true||this.props.setEditingCandidate.whatsApp==="Different"? false  : true||this.props.setEditingCandidate.workType==="Contract"? false  : true
  ||this.props.setEditingCandidate.active === true? true  : false
  })
};

// componentDidMount () {
//   this.setState({whatsapp:this.props.setEditingCandidate.whatsApp==="Different"?"Different":"Same",
// checked:this.props.setEditingCandidate.whatsApp==="Different"?"Different":"Same",
// })
// };

  componentDidMount() {
    this.props.getCountries();
  }
 
  render() {
    const {
      user: { userId, firstName, lastName },
      updateCandidateById,
      updateCandidate,
      availableDate,
    } = this.props;   
    console.log("wp",this.props.setEditingCandidate.active )
    return (
      <>
        <Formik
          initialValues={{
            sectorId: this.props.setEditingCandidate.sectorId || "",
            partnerId:this.props.setEditingCandidate.partnerId || "",
            currentCtc:this.props.setEditingCandidate.currentCtc || "",
            experience:this.props.setEditingCandidate.experience || "",
            // sectorName: "",
            partnerName: "",
            sectorDescription: "",
            workPreference:this.props.setEditingCandidate.workPreference || "",
            departmentId:this.props.setEditingCandidate.departmentId || "",
            noticePeriod:this.props.setEditingCandidate.noticePeriod || "",
            noticeDetail:this.props.setEditingCandidate.noticeDetail || "",
            benifit:this.props.setEditingCandidate.benifit || "",
            salutation: this.props.setEditingCandidate.salutation || "",
            firstName: this.props.setEditingCandidate.firstName || "",
             middleName: this.props.setEditingCandidate.middleName || "",
             lastName: this.props.setEditingCandidate.lastName || "",
             gender:  this.props.setEditingCandidate.gender || "", 
            countryDialCode: this.props.setEditingCandidate.countryDialCode || this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingCandidate.phoneNumber || "",
            mobileNumber: this.props.setEditingCandidate.mobileNumber || "",
            countryDialCode1: this.props.user.countryDialCode,
             emailId: this.props.setEditingCandidate.emailId || "",
             linkedin: this.props.setEditingCandidate.linkedin || "",
             designation: this.props.setEditingCandidate.designationTypeId || "",
             roleTypeId: this.props.setEditingCandidate.roleTypeId || "",
             department: this.props.setEditingCandidate.department || "",
            notes: this.props.setEditingCandidate.notes || "",
            availableDate:dayjs(this.props.setEditingCandidate.availableDate) || dayjs(),
            tag_with_company:
              this.props.setEditingCandidate.tag_with_company || "",
            billing: this.props.setEditingCandidate.billing || "",
            currency: this.props.setEditingCandidate.currency || "",
            dateOfBirth: dayjs(this.props.setEditingCandidate.dateOfBirth) || dayjs(),
            idProof: this.props.setEditingCandidate.idProof || "",
            idNumber: this.props.setEditingCandidate.idNumber ||"",
            costType:this.props.setEditingCandidate.costType ||"",
            userId: this.props.userId,
            workType: this.state.billing ? "Permanent" : "Contract",
            nationality: this.props.setEditingCandidate.nationality || "",
            country : this.props.setEditingCandidate.country || "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            whatsApp: this.state.whatsapp? "Same" : "Different",
            active: this.state.availability ? "Yes" : "No",
           // active: this.props.setEditingCandidate.active ? true : false,   
            // whiteblue: this.state.setEditingCandidate.whiteblue || "",         
            address: [
              {
                addressId: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].addressId : "",
                address1: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].address1 : "",
                address2: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].address2 : "",
                street: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].street : "",
                city: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].city : "",
                state: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].state : "",
                postalCode: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].postalCode : "",
                houseNo: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].houseNo : "",
                country: this.props.setEditingCandidate.countryName || "",
              },
            ],
            // noteMapper: [{ description: "" }],
          }}
          // validationSchema={UpdateCandidateSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCandidate(
              {
                ...values,
               active: values.active === false ? false : true,
                 workType: this.state.billing ? "Permanent" : "Contract",
                 //category: this.state.whiteblue ? "White" : "Blue"||"Both",
                 category: this.state.checked ? "Both" : this.state.whiteblue ? "White" : "Blue",
                 whatsApp: this.state.whatsapp? "Same" : "Different",
                 availableDate: dayjs(values.availableDate).toISOString(),
                 emailId:this.props.setEditingCandidate.emailId === values.emailId? null : values.emailId,
                 
                
              },
              this.props.candidateId,
             
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
                  <FlexContainer flexWrap="nowrap" alignItems="flex-start">
                    <FastField name="imageId" component={Upload} />
<div style={{ marginLeft: "14px", width: "100%" }}>
                      <FlexContainer
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "flex-start",
                                            }}
                                          >
                         <div style={{ width: "40%" }}>
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
                            className="w-full"
                            style={{
          width: "95%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                            isColumn
                            />
                        </div>
                         <div style={{ width: "60%" }}>
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstname"
                                defaultMessage="First Name"
                              />
                            }
                            type="text"
                            className="w-full"
                            style={{width:"100%"}}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            />
                        </div>
                      </FlexContainer>
                      <Spacer />
                   <FlexContainer
                                         style={{
                                           width: "100%",
                                           display: "flex",
                                           flexDirection: "row",
                                           alignItems: "flex-start",
                                         }}
                                       >
                        <div style={{ width: "40%" }}>
                          <FastField
                            name="middleName"
                            // label="Middle "
                            label={
                              <FormattedMessage
                                id="app.middleName"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                             className="w-full "
                            style={{
           width: "95%",
          // height: "38px",
          // border: "1px solid #d9d9d9",
          // outline: "none",
          // boxShadow: "none",
        }}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            />
                        </div>
                        <div style={{ width: "60%" }}>
                          <FastField
                            name="lastName"
                            // label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastname"
                                defaultMessage="Last Name"
                              />
                            }
                            type="text"
                            className="w-full"
                            style={{width:"100%"}}
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
                        // label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailid"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                  
                    <div style={{ width: "28%" }}>
                      <FastField
                        // isRequired
                        // type="email"
                        name="workPreference"
                        //label="Email"
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
                        options={[
                          "Remote",
                          "Hybrid",
                          "Office"
                        ]}
                        inlineLabel
                        className="w-full"
    style={{ width: "100%" }}
                      />
                    </div>
                  </FlexContainer>             
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
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
                    </div> */}
                  </FlexContainer>
                  <FlexContainer
  justifyContent="space-between"
  style={{ display: "flex", gap: "12px", width: "100%" }}
>
  <div style={{ flex: 0.7,marginTop:"3px" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        // label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.mobile#"
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
                    <div style={{ flex: 1.3,marginTop:"3px" }}>
                      <FastField
                        type="text"
                        // isRequired
                        name="mobileNumber"
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{ height: "30px"}}
                        />
                    </div>
                    {/* <div
                      style={{
                        width: "22%",
                        fontWeight: "bold",
                       // marginTop: "2px",
                      }}
                    >
                      WhatsApp
                      <Switch
                        style={{                      
                        marginLeft: "0.3125em"
                       }}
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
                            
                            // disabled={!this.state.availability}
                            component={SearchSelect}
                            isColumn
                            style={{
                              flexBasis: "80%",
                             // marginTop: "0px",
                            }}
                            // width={"100%"}
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
                     
                  <FlexContainer justifyContent="space-between">
                  <div style={{ width: "100%",marginTop:"3px" }}>
                      <FastField
                        type="text"
                        name="linkedin"
                        // label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="LinkedIn"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    </FlexContainer>
                     
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%",marginTop:"3px" }}>
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
                        // defaultValue={{
                        //   value: this.props.user.countryDialCode,
                        // }}
                        // value={values.countryDialCode}
                        inlineLabel
                        className="w-full"
    style={{ width: "100%" }}
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        type="text"
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
                            id="app.dateofbirth"
                            defaultMessage="Date of Birth"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.dateOfBirth}
                         className="w-full"
    style={{ width: "100%" }}
                        // defaultValue={dayjs("2020-01-01")
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                         width={"100%"}
                          style={{
          width: "95%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                        />
                    </div>
                  </FlexContainer> 
                  <Spacer />
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
                        <StyledLabel >
                          {/* Country */}
                          <FormattedMessage
                            id="app.country"
                            defaultMessage="Country"
                          />
                          </StyledLabel> 
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
                  </FlexContainer>
                </div>
                
                <div
                  style={{
                    height: "70%",
                    width: "45%",
                  }}
                >                 
                   <Spacer style={{ marginTop: "1em" }} />
                   <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <FastField
                      // name="department"
                      name="sectorId"
                      isColumnWithoutNoCreate
                      selectType="sectorName"
                      // label="Department"
                      label={
                        <FormattedMessage
                          id="app.sector"
                          defaultMessage="Sector"
                        />
                      }                      
                      isColumn
                      component={SearchSelect}
                       value={values.sectorId}
                      inlineLabel
                      />
                  </div>
                
                     <div style={{ width: "47%" }}>
                      <FastField
                        name="departmentId"
                        selectType="departmentName"
                        // label="Department"   
                         label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }                   
                        isColumnWithoutNoCreate                        
                        isColumn
                        component={SearchSelect}
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
                        // value={values.designationTypeId}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="designation"
                        // label="Designation"
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="Designation"
                          />
                        }
                        selectType="designationType"
                        isColumnWithoutNoCreate                       
                        isColumn
                        component={SearchSelect}
                        // value={values.designation}
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
                            id="app.currentemployer"
                            defaultMessage="Current Employer"
                          />
                          }
                          component={InputComponent}
                          isColumn
                          // value={values.customerId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          style={{ width:"100%" }}
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
                  <FlexContainer
  alignItems="flex-start"
  justifyContent="space-between"
  style={{
    width: "75%",
    gap: "20px",
  }}
>
  {/* Category Section */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}
  >
    <StyledLabel>
      <FormattedMessage
        id="app.category"
        defaultMessage="Category"
      />
    </StyledLabel>

    <Switch
      checked={this.state.whiteblue}
      onChange={this.handleWhiteBlue}
      disabled={this.state.checked}
      checkedChildren="White collar"
      unCheckedChildren="Blue collar"
    />
  </div>

  {/* Checkbox */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginTop: "24px",
    }}
  >
    <Checkbox
      checked={this.state.checked}
      onChange={() => this.handleChange()}
    >
      <FormattedMessage
        id="app.both"
        defaultMessage="Both"
      />
    </Checkbox>
  </div>

  {/* Type Section */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}
  >
    <StyledLabel>Type</StyledLabel>

    <Switch
      checked={this.state.billing}
      onChange={this.handlebilling}
      checkedChildren="Permanent"
      unCheckedChildren="Contract"
    />
  </div>
</FlexContainer>
                      <Spacer style={{marginTop:"1.25em"}}/>
                      <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          name="billing"
                          label={this.state.billing?"Expectation":"Billing"}
                          // label={
                          //   <FormattedMessage
                          //     id="app.billinghour"
                          //     defaultMessage="Billing/hour (Sell)"
                          //   />
                          // }
                          width={"100%"}
                          isColumn
                          component={InputComponent}                         
                        />
                      </div>
                      <div style={{ width: "47%" }}>
                     
                      <FastField
                        name="costType"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.costType"
                            defaultMessage="Cost Type"
                          />
                        }
                        // className="field"
                        isColumn
                        component={SelectComponent}
                        options={["Hourly","Weekly","Monthly","Monthly Salary","Annual Salary"]}
                        inlineLabel
                         className="w-full"
    style={{ width: "100%" }}
                        />
                        </div> 
                     
                    </FlexContainer>
                   
                    <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                  <FastField
                        // isRequired
                        // type="text"
                        name="currentCtc"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.currentSalary"
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
                        defaultValue={{
                          value: this.props.user.currency,
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
                        // value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                        // flag={values.currency}
                        // options={Array.isArray(currency) ? currency : []}
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
                            id="app.benefits"
                            defaultMessage="Benefits"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                        component={InputComponent}
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
                  loading={updateCandidateById}
                >                
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate, team, opportunity,designations }) => ({
  setEditingCandidate: candidate.setEditingCandidate,
  countries: auth.countries,
  updateCandidateById: candidate.updateCandidateById,
  updateCandidateByIdError: candidate.updateCandidateByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  designationTypeId:designations.designationTypeId,
  currencies:auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCandidate,
      getCountries,
      setEditCandidate,
      getDesignations
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateForm);
