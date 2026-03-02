import React, { Component } from "react";
import { Button, Upload } from "antd";
import { CompassOutlined, PaperClipOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getCustomerListByUserId } from "../../../../Containers/Customer/CustomerAction";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledModal } from "../../../../Components/UI/Antd";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addCandidateEmail ,getFilteredEmailContact} from "../../CandidateAction";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
// import { getNoOfEmailsSent } from "../../ContactAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ChooseCandidateEmailTable from "./ChooseCandidateEmailTable.jsx";

class AddEmailCandidateModal extends Component {
  componentDidMount() {
    const { getFilteredEmailContact ,getCustomerListByUserId,userId} = this.props;
    getFilteredEmailContact(userId);
    getCustomerListByUserId(userId)
  }
  constructor(props) {
    super(props);
    this.state = {
      // editorState: EditorState.createEmpty(),
      files: null,
      flag: null,
      status: "done",
    };
  }

  
  handleReset = (resetForm) => {
    this.props.setEmailModalVisible(false);
    resetForm();
    this.setState({ editorState: EditorState.createEmpty() });
  };
  handleRemove = ({}) => {
    ////debugger
    console.log(this.state.flag);
    if (this.state.flag === true) {
      return this.setState({ file: null });
    }
    console.log(this.state.files);
  };
  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({ editorState });
  };
  onFileChoose = (file) => {
    //debugger;

    console.log(file);
    if (file.status !== "uploading") {
      this.setState({
        files: file.file.originFileObj,
        flag: true,
      });
    }
  };
  onEditorBlank = () => {
    ////debugger;
    // this.setState({ editorState: EditorState.createEmpty() });
  };
  render() {
     const customerOption = this.props.customerByUserId.map((item) => {
      return {
        label: item.name||"",
        value: item.customerId,
      };
    });
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
    console.log(this.state.editorState);
    console.log("Email",this.props.chooseCandidateEmail.name)
    const {
      user,
    //   user: { userId, organizationId },
      visible,
      setEmailModalVisible,
      sendEmail,
      defaultContacts,
      sendingEmail,
      addCandidateEmail
    //   contact: { firstName, middleName, lastName, phoneNo, emailId, contactId },
    } = this.props;
    console.log(sendEmail);
    console.log("mail",this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].emailInd)
    console.log("mail2",this.props.chooseCandidateEmail)
    // const emptyTo = emailId;
    const { editorState, placeholder } = this.state;
    // const sender = user.emailId;
    // console.log(sender);
    return (
      <div>
 <StyledDrawer
          title={`Email to`}
          width="70%"
          visible={this.props.addCandidateEmailModal}
        //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.handleCandidateEmailModal(false)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Formik
            enableReinitialize
            initialValues={{
              subject: "",
              candidateIds:this.props.selectedRowKeys,
              body: "",
              // cc: [],
              // bcc: [],
              // to: "",
              from: "",
              customer1:"",
              contact1:"",
              customer2:"",
              contact2:"",
              contact3:"",
              customer3:"",
              emailInd: this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].emailInd,
              
              mobileNoInd: this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].mobileNoInd,
              nameInd:this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].nameInd,
         
              roleInd:this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].roleInd,
              skillInd:this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].skillInd,
              availableDateInd: this.props.chooseCandidateEmail.length&&this.props.chooseCandidateEmail[0].availableDateInd,

            }}
            // validationSchema={NoteSchema}
            onSubmit={(values, { resetForm }) => {
              ////debugger
              console.log(
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
              );
              const htmlBody = draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              );
            //   const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

              console.log({ ...values, cc: [values.cc], bcc: [values.bcc] });
              const emailFormData = new FormData();
            //   emailFormData.append("to", new Array(values.to));
            //   emailFormData.append("cc", new Array(values.cc));
            //   emailFormData.append("bcc", new Array(values.bcc));
            //   emailFormData.set("subject", values.subject);
            //   emailFormData.set("from", values.from);
            //   emailFormData.set("body", htmlBody);
            //   emailFormData.set("userId", userId);
            //   emailFormData.set("orgId", organizationId);
            //   emailFormData.set("contactId", contactId);
            //   emailFormData.append("attachment", this.state.files);
              console.log(this.state.files);
              console.log(emailFormData);
            //   sendEmail(emailFormData, this.onEditorBlank(), () =>
            //     this.handleReset(resetForm)
            //   );

            addCandidateEmail({
               ...values, 
              //  cc: [values.cc], 
              //  bcc: [values.bcc], 
               //attachment: this.state.file 
              }, 
              //  () => setEmailModalVisible(false)
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
            }) => {
              const empty = values.to;
              console.log(empty);

              return (
                <Form className="form-background">
                  <FlexContainer justifyContent="space-between">
                    <div style={{width:"43%"}}>
                   
                    {/* <Field
                      name="to"
                       inlineLabel
                      isColumn
                      // label="To"
                      label={
                        <FormattedMessage id="app.to" defaultMessage="To" />
                      }
                      // component={InputComponent}
                      // labelWidth="12%"
                      // style={{ width: "100%" }}
                    /> */}
                    <StyledLabel>To</StyledLabel>
                   </div>
                  
                    <div style={{width:"26%"}}>
                  <Field
                  // style={{ width: "7%" }}
                    name="customerId"
                    //selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    // component={SearchSelect}
                    component={SelectComponent}
                    options={Array.isArray(customerOption) ? customerOption : []}
                    isColumn
                    
                   // margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                    //style={{ width: "80%" }}
                    
                  />
                  </div>
                 
                  <div style={{width:"29%"}}>
                  <Field
                    name="contact1"
                    //selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                   // margintop={"0"}
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    //style={{ flexBasis: "7%" }}
                  />
                  </div>
                  
                  </FlexContainer>

                  <Spacer /> 
                  
                  <FlexContainer  justifyContent="space-between">
                  <div style={{width:"43%"}}>
                    {/* <Field
                      name="cc"
                      inlineLabel
                      isColumn
                      // label="Cc"
                      label={
                        <FormattedMessage id="app.cc" defaultMessage="Cc" />
                      }
                      placeholder=""
                      //labelWidth="6%"
                      // component={InputComponent}
                      //style={{ width: "100%" }}
                    /> */}
                    <StyledLabel>Cc</StyledLabel>
                     </div>
                     <div style={{width:"26%"}}>
                  <Field
                  // style={{ width: "7%" }}
                    name="customer3"
                    //selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    component={SelectComponent}
                    options={Array.isArray(customerOption) ? customerOption : []}
                    isColumn
                    
                   // margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                    //style={{ width: "80%" }}
                    
                  />
                  </div>
                  <div style={{width:"29%"}}>
                  <Field
                    name="contact3"
                    //selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                   // margintop={"0"}
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    //style={{ flexBasis: "7%" }}
                  />
                  </div>
                  </FlexContainer>
                  <FlexContainer  justifyContent="space-between">
                  <div style={{width:"43%"}}>
                  <StyledLabel>Bcc</StyledLabel>
                    {/* <Field
                      //name="bcc"
                      inlineLabel
                      isColumn
                     label="Bcc"
                      // label={
                      //   <FormattedMessage id="app.bcc" defaultMessage="Bcc" />
                      // }
                      placeholder=""
                     // labelWidth="6%"
                      // component={InputComponent}
                      //style={{ width: "100%" }}
                    /> */}
                    </div>
                    <div style={{width:"26%"}}>
                  <Field
                  // style={{ width: "7%" }}
                    name="customer2"
                   // selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    
                   // margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                    //style={{ width: "80%" }}
                    
                  />
                  </div>
                  <div style={{width:"29%"}}>
                  <Field
                    name="contact2"
                    //selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                   // margintop={"0"}
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    //style={{ flexBasis: "7%" }}
                  />
                  </div>
                  </FlexContainer>
                  <Spacer/>
                  <FlexContainer alignItems="center">
                    {/* <Icon type='mail' style={{ fontSize: 18, marginRight: 8 }} /> */}
                    <Field
                      name="subject"
                      inlineLabel
                      // label="Subject"
                      label={
                        <FormattedMessage
                          id="app.subject"
                          defaultMessage="Subject"
                        />
                      }
                      labelWidth="6%"
                      placeholder="Enter subject"
                      component={InputComponent}
                      style={{ width: "100%" }}
                    />
                  </FlexContainer>
                  <ChooseCandidateEmailTable
                  chooseCandidateEmail={this.props.chooseCandidateEmail}
                  />
                  {/* <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 250,
                      overflow: "auto",
                      border: "0.06em solid #aaa",
                      padding: "0.31em 0.62em ",
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={placeholder || "Type here"}
                   
                  /> */}

                 
                  <FlexContainer justifyContent="flex-end">
                  
                     

                      <Button
                        type="primary"
                        htmlType="submit"
                        // disabled={!values.to && values.cc && values.bcc}
                        // disabled={!empty.length}
                        // loading={sendingEmail}
                         style={{ marginTop: "1.62em" }}
                      >
                        {/* Send */}
                        <FormattedMessage id="app.send" defaultMessage="Send" />
                      </Button>
                     
                  </FlexContainer>
                </Form>
              );
            }}
          </Formik>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate,customer }) => ({
    userId: auth.userDetails.userId,
    user:auth.userDetails.user,
    customerByUserId: customer.customerByUserId,
    filteredContact:candidate.filteredContact,
    chooseCandidateEmail:candidate.chooseCandidateEmail,
    addingCandidateEmail:candidate.addingCandidateEmail
    // contactId: contact.contactByUserId.contactId,
    // customerId: customer.customer.customerId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCandidateEmail,
      getFilteredEmailContact,
      getCustomerListByUserId
    //   getNoOfEmailsSent,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailCandidateModal);
