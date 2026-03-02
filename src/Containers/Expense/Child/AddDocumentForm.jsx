import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import {
  handleDocumentUploadModal,
  addExpenseDocument,
  // getCustomerDocument,
} from "../ExpenseAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({});

class AddDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
  handleButtonClick = () => {
    console.log(length);
    let length = this.state.data.length;
    this.setState({ data: [...this.state.data, length + 1] });
  };

  handleChange = (checked) => {
    this.setState({
      documentshare: checked,
    });
    console.log(this.state.documentshare);
  };
  handleAboveChange = (data) => {
    debugger;
    this.setState({ ownerAbove: data });
    this.setState({ selectedownerAbove: data });
  };
  handleClose = () => {
    //debugger
    const { handleDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleDocumentUploadModal(false)
    );
  };
  // callback = () => {
  //   const {
  //     customer,
  //     getCustomerDocument,
  //     handleDocumentUploadModal,
  //   } = this.props;
  //   getCustomerDocument(customer.customerId);
  //   handleDocumentUploadModal(false);
  // };
  //   componentDidMount() {
  //     this.props.getOppoStages();
  //     this.props.getLevels();
  //   }
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    const {
      opportunity,
      documentUploadModal,
      handleDocumentUploadModal,
      addExpenseDocument,
      addingDocumentByExpenseId,
      documentContentType,
      documentType,
      documentTypeId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            documentTypeId: "",
            expenseId: this.props.expenseId,
            documentName: "", //input
            documentDescription: "",
            documentId: "",
            documentTitle: "", 
          }}
          //   validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addExpenseDocument(
              {
                ...values,

              },
              this.callback
            );
            resetForm();
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
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  // component={DocumentUpload}
                  />
                  {errors.contactDocumentId && (
                    <p style={{ color: "tomato", fontWeight: 600 }}>
                      {errors.contactDocumentId}
                    </p>
                  )}
                  <Spacer />
                  <Field
                    name="documentTypeId"
                    selectType="documentType"
                    label="Type"
                    //   label={
                    //     <FormattedMessage
                    //       id="app.contactDocumentId"
                    //       defaultMessage="Type"
                    //     />
                    //   }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    inlineLabel
                    />
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="documentTitle"
                    label="Name"
                    //   label={
                    //     <FormattedMessage
                    //       id="app.documentName"
                    //       defaultMessage="Name"
                    //     />
                    //   }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    />
                  <Spacer />
                  <Field
                    name="documentDescription"
                    label="Description"
                    //   label={
                    //     <FormattedMessage
                    //       id="app.documentDescription"
                    //       defaultMessage="Description"
                    //     />
                    //   }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>

              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingDocumentByExpenseId}
                >
                  {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
                  Submit
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ expense, auth }) => ({
//   contactId: customer.customer.contactId,

  documentUploadModal: expense.documentUploadModal,
  addingDocumentByExpenseId: expense.addingDocumentByExpenseId,

  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      addExpenseDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentForm);
