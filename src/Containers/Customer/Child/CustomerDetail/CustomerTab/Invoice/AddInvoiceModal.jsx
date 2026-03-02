import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
// import { RightSquareOutlined, ToTopOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FieldArray } from "formik";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import DocumentUpload from "../../../../../../Components/Forms/Formik/DocumentUpload";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
    handleInvoiceModal,
//   addCustomerDocument,
//   getCustomerDocument,
} from "../../../../CustomerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import LazySelect from "../../../../../../Components/Forms/Formik/LazySelect";
import { base_url } from "../../../../../../Config/Auth";

const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
// documentTitle: Yup.string().required("This field is required !"),
documentId: Yup.string().required("Input needed !"),
// documentDescription: Yup.string().required("This field is required !"),
// stageId: Yup.string().required("This field is required !")
});
class AddInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   documentshare: false,
    //   approvalAbove: false,
    //   ownerAbove: "Specific",
    //   selectedownerAbove: "Specific",
    //   data: [1],
    };
  }
//   handleButtonClick = () => {
//     console.log(length);
//     let length = this.state.data.length;
//     this.setState({ data: [...this.state.data, length + 1] });
//   };

//   handleChange = (checked) => {
//     this.setState({
//       documentshare: checked,
//     });
//     console.log(this.state.documentshare);
//   };
//   handleAboveChange = (data) => {
//     debugger;
//     this.setState({ ownerAbove: data });
//     this.setState({ selectedownerAbove: data });
//   };
  handleClose = () => {
    //debugger
    const { handleInvoiceModal } = this.props;
    //debugger
    this.setState(
      {
        // documentshare: this.state.documentshare ? false : false,
        // approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleInvoiceModal(false)
    );
  };
  callback = () => {
    const {
      customer,
      getCustomerDocument,
      handleInvoiceModal,
    } = this.props;
    // getCustomerDocument(customer.customerId);
    handleInvoiceModal(false);
  };
  //   componentDidMount() {
  //     this.props.getOppoStages();
  //     this.props.getLevels();
  //   }
//   handleApprovalAboveChange = (checked) => {
//     this.setState({
//       approvalAbove: checked,
//     });
//   };
  render() {
    console.log(this.state.data);
    const {
      customer,
      invoiceModal,
      handleInvoiceModal,
      addCustomerDocument,
      addingDocumentByCustomerId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;

    return (
      <>
        <StyledModal
          title={
            <FormattedMessage id="app.invoice" defaultMessage="Invoice" />
          }
          width="65vw"
          visible={invoiceModal}
          destroyOnClose
          maskClosable={false}
          style={{ top: 40 }}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={() => this.handleClose()}
          footer={null}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                documentTitle: '',
                documentDescription: "",
                documentId: "",
                // customerId: this.props.customer.customerId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                // addCustomerDocument(
                //   {
                //     ...values,
                //     // type:
                //     //   this.state.documentshare === true
                //     //     ? "Public"
                //     //     : "Confidential",
                //     // levelType:
                //     //   this.state.approvalAbove === true ? "Above" : "Specific",
                //   },
                //   this.callback
                // );
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      
                      <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
                        isColumnWithoutNoCreate
                        // label="Type"
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }
                        // isRequired
                        component={InputComponent}
                        isColumn
                        //  value={values.documentId}
                        // defaultValue={{ label: firstName, value: documentId }}
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
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                      <Spacer />
                      <Field
                        name="documentDescription"
                        //label="Description"
                        label={
                          <FormattedMessage
                            id="app.description"
                            defaultMessage="Description"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                        />
                      <Spacer />
                        <FlexContainer
                          justifyContent="space-between"
                          style={{ width: "100%"}}
                        >
                              <>
                                <div
                                  style={{ width: "30%", marginRight: "10px" }}
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    //label="Function"
                                    label={
                                      <FormattedMessage
                                        id="app.department"
                                        defaultMessage="Function"
                                      />
                                    }
                                    isRequired
                                    isColumn
                                    // selectType="department"
                                    component={InputComponent}
                                  />
                                </div>
                                <div style={{ width: "43%"}}>
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    component={InputComponent}
                                    inlineLabel
                                    />
                                </div>
                              </>
                            );
                        </FlexContainer>
       
                    </div>
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                    //   Loading={addingDocumentByCustomerId}
                    >
                      {/* Submit */}
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
                    </Button>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ customer,auth }) => ({
//   customer: customer.customer,
  invoiceModal: customer.invoiceModal,
//   addingDocumentByCustomerId: customer.addingDocumentByCustomerId,
//   organization:
//     auth.userDetails &&
//     auth.userDetails.metaData &&
//     auth.userDetails.metaData.organization,
//   organization:
//     auth.userDetails.metaData && auth.userDetails.metaData.organization,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleInvoiceModal,
    //   addCustomerDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddInvoiceModal);