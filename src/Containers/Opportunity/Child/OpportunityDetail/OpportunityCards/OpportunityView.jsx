import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip} from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import {
  StyledModal,
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";

// import {
//   unlinkAccountFromOpportunity,
//   linkAccountToOpportunity,
// } from "../../../OpportunityAction";
// import { ApiOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons";

class OpportunityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkContactModalVisible: false,
    };
  }
  handleLinkContactModalVisible = () =>
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });

  unlinkCallback = () => this.props.updateAccount({});

  linkCallback = (accountId) => {
    console.log("inside link callback");
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });
    this.props.setAccount(accountId);
  };

  render() {
    console.log(this.props.account);
    const {
      // opportunity: { opportunityId, opportunityName, probability },
      opportunity: { opportunityName },
      account: { accountId, accountName, imageId, imageURL },
      opportunity,
      toggleViewType,
      linkContactModal,
      handleLinkContactModal,
      linkAction,
      linkType,
      unlinkAccountFromOpportunity,
      linkAccountToOpportunity,
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "85%",marginTop:"-8px" }}
          >
            <div style={{ width: "20%",marginTop:"4px"  }}>
              {/* {accountName ? (
                <MultiAvatar
                  primaryTitle={accountName}
                  imageId={imageId}
                  imageURL={imageURL}
                />
              ) : ( */}
              <MultiAvatar
                // primaryTitle={

                //    opportunity.opportunityName || opportunity.opportunityId
                // }
                primaryTitle={opportunity.opportunityName}
                imageId={imageId}
                imageURL={imageURL}
              />
              {/* )} */}
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "80%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
                style={{ marginLeft: "0.625em" }}
              >
                {`${opportunityName || ""}`}
              </Title>
              <SubTitle
                overflow="hidden"
                textOverflow="ellipsis"
                style={{ marginLeft: "0.625em" }}
              >
                {accountName}
              </SubTitle>
            </FlexContainer>
          </FlexContainer>

          {this.props.partnerLogin === "Yes" &&
            this.props.department === "Partner" ? null : (
              <FlexContainer style={{ width: "15%" }} justifyContent="flex-end">
                {this.props.account &&
                  this.props.account.hasOwnProperty("accountId") ? (
                    <StyledPopconfirm
                      placement="bottom"
                      title="Do you wish to detach?"
                    // onConfirm={() =>
                    //   unlinkAccountFromOpportunity(
                    //     opportunityId,
                    //     accountId,
                    //     this.unlinkCallback
                    //   )
                    // }
                    >
                      {/* {probability === 100 || probability === 0 ? null : (
                    <Tooltip title="Detach Customer">
                      <Icon
                        tooltipTitle="Detach Customer"
                        iconType="api"
                        onClick={null}
                        size="16px"
                        style={{ color: "#fb8500" }}
                      />
                    </Tooltip>
                  )} */}
                    </StyledPopconfirm>
                  ) : (
                    <Tooltip //title="Tag Customer"
                      title={<FormattedMessage
                        id="app.tagcustomer"
                        defaultMessage="Tag Customer"
                      />}
                    >
                      <LinkOutlined
                        tooltipTitle="Tag Customer"
                        iconType="link"
                        onClick={this.handleLinkContactModalVisible}
                        size="16px"
                        style={{ color: "#fb8500" }}
                      />
                    </Tooltip>
                  )}
              &nbsp;
                <Tooltip //title="Edit"
                  title={<FormattedMessage
                    id="app.edit"
                    defaultMessage="Edit"
                  />}
                >
                  <EditOutlined
                    tooltipTitle="Edit"
                    iconType="edit"
                    onClick={toggleViewType}
                    size="16px"
                  />
                </Tooltip>
              </FlexContainer>
            )}
        </FlexContainer>
        <StyledModal
          //title="Tag Customer"
          title={<FormattedMessage
            id="app.tagcustomer"
            defaultMessage="Tag Customer"
          />}
          width="35%"
          visible={this.state.linkContactModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={this.handleLinkContactModalVisible}
          footer={null}
        >
          <>
            <Formik
              // enableReinitialize
              initialValues={{
                // association: {
                accountIds: [],
                // }
              }}
              // validationSchema={AccountSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                // linkAccountToOpportunity(
                //   opportunityId,
                //   values.accountIds[0],
                //   this.linkCallback
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
                    <Field
                      name="accountIds"
                      selectType="account"
                      //label="Customer"
                      label={<FormattedMessage
                        id="app.accountIds"
                        defaultMessage="Customer"
                      />}
                      isColumn
                      margintop={"4px"}
                      component={SearchSelect}
                      notLinked
                      // value={values.association.contactId}
                      isMulti
                    />
                    <br />
                    <FlexContainer justifyContent="flex-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        disable
                        Loading={false}
                      >
                        <FormattedMessage
                          id="app.add"
                          defaultMessage="Add"
                        /> {/* Add */}
                      </Button>
                    </FlexContainer>
                  </Form>
                )}
            </Formik>
          </>
        </StyledModal>
      </>
    );
  }
}

const mapStateToProps = ({ contact }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // unlinkAccountFromOpportunity,
      // linkAccountToOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityView);
