import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Switch,
  Icon,
  Tooltip,
  Popconfirm,
  Checkbox,
  message,
} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer } from "../../../Components/UI/Elements";
// import { shareEmployeePermission, getEmployeePermissionsList } from "../EmployeeAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { FormattedMessage } from "react-intl";

function EmployeeShareForm(props) {
  useEffect(() => {
    // props.getEmployeePermissionsList();
    // props.getsharePartnerUsers();
  }, []);
//   const permissionList = props.permissionsDataList.map((item) => {
//     return {
//       label: `${item.userName || ""}`,
//       value: item.userId,
//     };
//   });
  
  function handleReset(resetForm) {
    resetForm();
  }
  // console.log(props.shareUsers);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
        //   userId: props.permissionsDataList.value || [],
        //   type:"employee",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });

            props.shareEmployeePermission(
            {
                ...values,
            },
             values.userId,
            () => handleReset(resetForm)
          );
          
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "12em", marginTop: "0.6em" }}>
                <Field
                  name="userId"
                  //  label="Sponsor"
                  // label={<FormattedMessage
                  //   id="app.sponserId"
                  //   defaultMessage="Sponsor"
                  // />}
                  placeholder="Select"
                  isColumn
                  style={{
                    flexBasis: "80%",
                    width: "100%",
                    // marginTop: "0.25em",
                  }}
                //   component={SelectComponent}
                //   options={Array.isArray(permissionList) ? permissionList : []}
                />
              </div>

              {/* <Popconfirm
                title="Do you wish to share?"
                onConfirm={() => {
                  props.shareContactEmployeePermission(values);
                }}
                // onCancel={props.getOrganizationLeadsUser}
                okText="Ok"
                cancelText="Cancel"
              > */}
              <Button
                type="primary"
                htmlType="submit"
                //   disabled={!values.userIds.length}
                // Loading={props.addSharingEmployee}
                style={{
                  marginTop: "0.7em",
                  marginLeft: "0.5em",
                }}
              >
                View
              </Button>
              {/* </Popconfirm> */}
            </div>

            <Spacer />
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ employee }) => ({
//   addSharingEmployee: employee.addSharingEmployee,
//      users: team.users,
//      shareUsers: partner.shareUsers,
//   permissionsDataList: employee.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // shareEmployeePermission,
      //   getUsers,
      //   getsharePartnerUsers,
    //   getEmployeePermissionsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeShareForm);
