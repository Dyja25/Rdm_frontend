import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Input, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
// import {
//   getContactListByOpportunityId,
//   updateRecruitment,
//   sponsorSwitch,
// } from "../../../../OpportunityAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({});

function SelectSponsorForm(props) {
  const Sponsor = props.contactListByOpportunityId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });

  function handleCallback(status) {
    if (status === "success") {
      props.handleSponsorModal(false);
      message.success("sponser Offered successfully");
      // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
    }
  }
  function handleSponsor(data, id) {
    debugger;
    if (data === "success") {
      props.sponsorSwitch(
        props.profileId,
        props.opportunityId,
        props.recruitmentId,
        id,
        handleCallback
      );
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          sponserId: undefined,
          recruitmentId: props.recruitmentId,
          profileId: props.profileId,
        }}
        validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
          // props.updateRecruitment(
          //   {
          //     ...values,
          //   },
          //   props.opportunityId,
          //   (data, id) => handleSponsor(data, id)
          // );
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
                  width: "100%",
                }}
              >
                {Sponsor.length ? (
                  <>
                    <Field
                      name="sponserId"
                      //label="Sponsor"
                      label={
                        <FormattedMessage
                          id="app.sponserId"
                          defaultMessage="Sponsor"
                        />
                      }
                      isColumn
                      style={{
                        flexBasis: "80%",

                        marginTop: "0.25em",
                      }}
                      component={SelectComponent}
                      options={Array.isArray(Sponsor) ? Sponsor : []}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      Please Create or Tag atleast one Contact for selecting
                      Sponsor
                    </p>
                  </>
                )}

                <Spacer />
              </div>
              &nbsp;
              <div
                style={{
                  height: "100%",
                }}
              ></div>
            </div>
            <Spacer />
            {Sponsor.length ? (
              <>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.updatingRecruitment}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                    {/* Update */}
                  </Button>
                </FlexContainer>
              </>
            ) : (
              <></>
            )}
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
  // contactListByOpportunityId: opportunity.contactListByOpportunityId,
  // currentRecruitmentData: opportunity.currentRecruitmentData,
  // updatingRecruitment: opportunity.updatingRecruitment,
  // opportunityId: opportunity.opportunity.opportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContactListByOpportunityId,
      // updateRecruitment,
      // sponsorSwitch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectSponsorForm);
