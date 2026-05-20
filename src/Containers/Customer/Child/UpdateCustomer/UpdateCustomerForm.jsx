import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button ,Switch,Checkbox} from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { updateCustomer,setEditCustomer } from "../../CustomerAction";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
/**
 * yup validation scheme for creating a account
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, "Enter a valid Phone No"),
});

class UpdateCustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      whiteblue: false,
      checked:false,
    };
  }
componentDidMount () {
  this.setState({whiteblue:this.props.setEditingCustomer.category==="White"?true : false,
checked:this.props.setEditingCustomer.category==="White" || this.props.setEditingCustomer.category==="Blue"? false  : true,
})
};
  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };

  handleReset = (resetForm) => {
    resetForm();
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    console.log("wh",this.state.whiteblue)
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateCustomerById,
      updateCustomer,
    } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: this.props.setEditingCustomer.name || "",
            url: this.props.setEditingCustomer.url || "",
            sectorId: this.props.setEditingCustomer.sectorId  ,
            vatNo:this.props.setEditingCustomer.vatNo  ,
            email: this.props.setEditingCustomer.email || "",
            country:this.props.setEditingCustomer.country || "",
            countryDialCode:
              this.props.setEditingCustomer.countryDialCode ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingCustomer.phoneNumber || "",
            userId: this.props.userId,
            // country:"",
            notes: this.props.setEditingCustomer.notes || "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            address: [
              {
                address1: this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].address1 : "",
                address2:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].address2 : "",
                street:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].street : "",
                city:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].city : "",
                state:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].state : "",
                postalCode:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].postalCode : "",
                houseNo:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].houseNo : "",
                // countryDialCode:
                // this.props.setEditingCustomer.countryDialCode
                // country: this.props.setEditingCustomer.country || "",
                // country:"",
             
              },
            ],
            category: this.state.whiteblue ?"White" : "Blue"||"Both",
          }}
          validationSchema={UpdateCustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomer(
              {
                ...values,
                customerId: this.props.customerId,
                category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
              },
              this.props.customerId,
              () => this.handleReset(resetForm)
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
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh",paddingRight: "0.6em" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={
                      <FormattedMessage id="app.url" defaultMessage="URL" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="email"
                    type="text"
                   
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    //isRequired
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                   <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                      
                        label={
                          <FormattedMessage
                            id="app.phone#"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        // value={values.countryDialCode1}
                        inlineLabel
                       />
                    </div>
                    <div style={{ width: "70%" }}>
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        // required
                        //placeholder="Phone #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.phoneNumber"
                        //     defaultMessage="Phone #"
                        //   />
                        // }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        />                   
                         </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    />                 
                  
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                    }}
                >
                   <FlexContainer justifyContent="space-between">
                    <div style={{ width: "37%" }}>
                      <Field
                        name="vatNo"
                        type="text"
                     
                        
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "55%" }}>
                      <FastField
                        // name="department"
                        // label="Department"
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        // options={[
                        //   " Accountancy",
                        //   " Aviation",
                        //   " Banking",
                        //   "Car industry ",
                        //   "Clothing ",
                        //   " Construction ",
                        //   " Content generation/management ",
                        //   " Daycare ",
                        //   "Design",
                        //   "Digital marketing",
                        //   " Distributor ",
                        //   " Finance ",
                        //   "Furniture ",
                        //   " Gaming ",
                        //   "Health services ",
                        //   "HR & Business operations ",
                        //   "Immigration and payrolling ",
                        //   "IT services",
                        //   "Painting ",
                        //   " Real-estate ",
                        //   " Recruitment",
                        //   "Telecommunications ",
                        //   " Transport services ",
                        //   "Web development ",
                        // ]}
                        // onChange={() => {
                        //   this.handleFieldClik();
                        // }}
                        isColumn
                        component={SearchSelect}
                        // defaultValue={{
                        //   value: this.props.user.sectorName,
                        // }}
                        // value={"values.sectorID"}
                        // value={values.sectorId}
                        // style={{
                        //   flexBasis: "80%",
                        //   // marginTop: "0.25em",
                        //   // height: "2.0625em",
                        // }}
                      />
                    </div>
                  </FlexContainer>           
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <FlexContainer justifyContent="space-between">
                  <div style={{ width: "65%" }}>
                  <FlexContainer justifyContent="space-between">                 
                 <StyledLabel>
                  {/* Requirement Type */}
                  <FormattedMessage
                            id="app.requirementType"
                            defaultMessage="Requirement Type"
                          />
                  </StyledLabel>
                 <Switch                   
                   checked={this.state.whiteblue}
                    onChange={this.handleWhiteBlue}
                   disabled={this.state.checked}
                   checkedChildren="White collar"
                   unCheckedChildren="Blue collar"
                 />
                  </FlexContainer>
                  </div>
                  <div style={{ width: "30%" }}>
              <Checkbox
              checked={this.state.checked}
              onChange={() => this.handleChange()}
              style={{marginLeft:"auto"}}
            > 
            {/* Both */}
            <FormattedMessage
                            id="app.both"
                            defaultMessage="Both"
                          />
            </Checkbox>
            </div>
                  </FlexContainer>
                  <Spacer style={{marginTop:"1.25em"}}/>
                  {/* <FieldArray
                    name="address"
                    label="searxh"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  /> */}
                  <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                <FlexContainer justifyContent="space-between"> 
                  <div style={{ width: "47%" }}>  
                  <Field
                  //  label="House No"
                   label={
                      <FormattedMessage
                        id="app.houseNo"
                        defaultMessage="House No"
                      />
                    }
                   name="address[0].houseNo"
                  // placeholder="House No"
                  component={InputComponent}
                  width={"100%"}
                  isColumn
                  inlineLabel
                />
                </div>
                <div style={{ width: "47%" }}>
                  <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                    />
                     </div>
                     </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
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
                        // defaultValue={{
                        //   value: this.props.user.countryName,
                        // }}
                        // value={values.countryName}
                        selectType="country"
                        inlineLabel
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.state"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.pinCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
      
                </div>
              </div>
              <Spacer style={{marginTop:"1.25em"}}/>
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateCustomerById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, customer }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  updateCustomerById: customer.updateCustomerById,
  updateCustomerByIdError: customer.updateCustomerByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomer,
      setEditCustomer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerForm);
