import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {  Tooltip, Button } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import {
  getContactListByOpportunityId,
  //   unlinkContactFromOpportunity,
  //   setContactRoleForOpportunity,
} from "../../../OpportunityAction";

import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";

import { ActionIcon } from "../../../../../Components/Utils";
// import { ApiOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;
class LinkedContact extends Component {
  componentDidMount() {
    this.props.getContactListByOpportunityId(
      this.props.opportunity.opportunityId
    );
  }
  render() {
    const {
      opportunity: { opportunityId },
      fetchingContactListByOpportunityId,
      fetchingContactListByOpportunityIdError,
      contactListByOpportunityId,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
    } = this.props;
    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "10%",
        render: (name, item, i) => {
          console.log(item);
          //   return (
          //     <span style={{ height: "2em" }}>
          //       <MultiAvatar
          //         primaryTitle={item.firstName}
          //         imageId={item.imageId}
          //         imgWidth={"auto"}
          //         imgHeight={"2em"}
          //       />
          //     </span>
          //   );
        },
      },
      {
        // title: "Name",
        title: <FormattedMessage
          id="app.firstName"
          defaultMessage="Name"
        />,
        width: "25%",
        // dataIndex: "firstName",
        render: (name, item, i) => {
          const fullName = `${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""} `;
            return (
             fullName
            );
        }
        // onFilter: (value, record) => record.firstName.indexOf(value) === 0,
        // sorter: (a, b) => {
        //   const firstNameA = a.firstName;
        //   const firstNameB = b.firstName;
        //   if (firstNameA < firstNameB) {
        //     return -1;
        //   }
        //   if (firstNameA > firstNameB) {
        //     return 1;
        //   }

        //   // names must be equal
        //   return 0;
        // },
      },
      {
        //title: "Designation",
        title: <FormattedMessage
          id="app.designation"
          defaultMessage="Designation"
        />,
        width: "25%",
        dataIndex: "designation",
        onFilter: (value, record) => record.designation.indexOf(value) === 0,
        sorter: (a, b) => {
          const designationA = a.designation;
          const designationB = b.designation;
          if (designationA < designationB) {
            return -1;
          }
          if (designationA > designationB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },
      {
        // title: "Function",
        title: <FormattedMessage
          id="app.department"
          defaultMessage="Function"
        />,
        dataIndex: "department",
        width: "20%",
        onFilter: (value, record) => record.department.indexOf(value) === 0,
        sorter: (a, b) => {
          const departmentA = a.department;
          const departmentB = b.department;
          if (departmentA < departmentB) {
            return -1;
          }
          if (departmentA > departmentB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },
      // {
      //   //title: "Role",
      //   title: <FormattedMessage
      //     id="app.role"
      //     defaultMessage="Role"
      //   />,
      //   dataIndex: "contactId",
      //   width: "30%",
      //   render: (name, item, i) => {
      //     console.log(name);
      //     console.log(item);
      //     return (
      //       <FlexContainer justifyContect="space-evenly">
      //         <ButtonGroup>
      //           <RoleButton
      //             type="DecisionMaker"
      //             iconType="fa-vote-yea"
      //             tooltip="Decision Maker"
      //             role={item.role && item.role.type}
      //           //   onClick={() =>
      //           //     setContactRoleForOpportunity(
      //           //       opportunityId,
      //           //       item.contactId,
      //           //       "DecisionMaker"
      //           //     )
      //           //   }
      //           />
      //           <RoleButton
      //             type="Evaluator"
      //             iconType="fa-address-card"
      //             tooltip="Evaluator"
      //             role={item.role && item.role.type}
      //           //   onClick={() =>
      //           //     setContactRoleForOpportunity(
      //           //       opportunityId,
      //           //       item.contactId,
      //           //       "Evaluator"
      //           //     )
      //           //   }
      //           />
      //           <RoleButton
      //             type="Influencer"
      //             iconType="fa-hands-helping"
      //             tooltip="Influencer"
      //             role={item.role && item.role.type}
      //           //   onClick={() =>
      //           //     setContactRoleForOpportunity(
      //           //       opportunityId,
      //           //       item.contactId,
      //           //       "Influencer"
      //           //     )
      //           //   }
      //           />
      //           <RoleButton
      //             type="Sponsor"
      //             iconType="fa-user"
      //             tooltip="Sponsor"
      //             role={item.role && item.role.type}
      //           //   onClick={() =>
      //           //     setContactRoleForOpportunity(
      //           //       opportunityId,
      //           //       item.contactId,
      //           //       "Sponsor"
      //           //     )
      //           //   }
      //           />
      //         </ButtonGroup>
      //       </FlexContainer>
      //     );
      //   },
      //   onFilter: (value, record) => record.department.indexOf(value) === 0,
      // },
      {
        //title: "Email #",
        title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
        width: "15%",
        dataIndex: "emailId",
      },
      {
        // title: "Mobile #",
        title: <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />,
        dataIndex: "mobileNumber",
        width: "15%",
        render: (name, item, i) => {
          return (
            <span>
              {item.countryDialCode} {item.mobileNumber}
            </span>
          );
        },
      },
      {
        title: "",
        dataIndex: "contactId",
        width: "5%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={<FormattedMessage
                id="app.doyouwishtodetach"
                defaultMessage="Do you wish to detach?"
              />}
            //   onConfirm={() =>
            //     unlinkContactFromOpportunity(opportunityId, name)
            //   }
            >
              <ActionIcon
                tooltipTitle="Detach Contact"
                iconType="api"
                onClick={null}
                size="1em"
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingContactListByOpportunityId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          columns={columns}
          pagination={{ pageSize: 50 }}
          scroll={{ y: tableHeight }}
          dataSource={contactListByOpportunityId}
          onChange={console.log("contact onChangeHere...")}
        />
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunity: opportunity.opportunity,
  contactListByOpportunityId: opportunity.contactListByOpportunityId,
  fetchingContactListByOpportunityId: opportunity.fetchingContactListByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByOpportunityId,
      //   unlinkContactFromOpportunity,
      //   setContactRoleForOpportunity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}
