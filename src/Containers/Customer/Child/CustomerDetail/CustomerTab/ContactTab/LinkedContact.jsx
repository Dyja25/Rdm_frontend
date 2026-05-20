import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {  Tooltip, Button,Input } from "antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getContactListByCustomerId,deleteContactData } from "../../../../CustomerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import Highlighter from "react-highlight-words";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "../../../../../../Components/Common";
import { ActionIcon } from "../../../../../../Components/Utils";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import CustomerContactActiveToggle from "./CustomerContactActiveToggle";
// import { ApiOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;
class LinkedContact extends Component {
  componentDidMount() {
    this.props.getContactListByCustomerId(this.props.customerId);
  }
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            // icon={<SearchOutlined />}
            // icon="search"
            size="small"
            style={{ width: 90 }}
          >
                           {/* Search */}
                                                       <FormattedMessage
                                                                                  id="app.search"
                                                                                  defaultMessage="Search"
                                                                                />
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
              {/* Reset */}
                                                       <FormattedMessage
                                                                      id="app.reset"
                                                                      defaultMessage="Reset"
                                                                    />          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
               {/* Filter */}
                                                       <FormattedMessage
                                                                      id="app.filter"
                                                                      defaultMessage="Filter"
                                                                    />          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      //   opportunity: { opportunityId },
      fetchingCustomerContact,
      fetchingCustomerContactError,
      contactByCustomerId,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
    } = this.props;
    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "5%",
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
        //title: "Name",

        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        width: "20%",
        ...this.getColumnSearchProps("name"),
        // dataIndex: "firstName",
        // render: (name, item, i) => {
        //   return (
        //     <Link
        //       toUrl={`/contact/${item.contactId}`}
        //       title={`${item.firstName || ""} ${item.middleName ||
        //         ""} ${item.lastName || ""}`}
        //     />

        //   );
        // },
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
        render: (name, item, i) => {
          
          const fullName = ` ${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""}`;
            return(
              <>
             {fullName}
              </>
            )
         
        }
      
      },
      {
        //title: "Group",
        title: <FormattedMessage id="app.email" defaultMessage="Email" />,
        width: "20%",
        dataIndex: "emailId",
      },
      {
        //title: "Group",
        title: <FormattedMessage id="app.mobileno" defaultMessage="Mobile #" />,
        width: "12%",
        dataIndex: "mobileNumber",
      },

      {
        //title: "Function",

        title: (
          <FormattedMessage id="app.department" defaultMessage="Department" />
        ),
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

      {
        // title: "Designation",

        title: (
          <FormattedMessage id="app.designation" defaultMessage="Designation" />
        ),
        width: "20%",
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
     
      // {
      //   //title: "Role",

      //   title: <FormattedMessage id="app.contactId" defaultMessage="Role" />,
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
        // },
      //   onFilter: (value, record) => record.department.indexOf(value) === 0,
      // },
      
      {
        title: "",
        dataIndex: "contactId",
        width: "2%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <Tooltip title="LinkedIn">
               
            <span
              //type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // props.setEditingCustomer(item);
                // handleUpdateCustomerOpportunityModal(true);
                
              }}
            >        <a
            href={`https://www.linkedin.com`}
          target="_blank"
          >   
              <i class ="fab fa-linkedin"></i>
              </a>
            </span>
           
          </Tooltip>
            );
          },
        },

      {
        title: "",
        dataIndex: "contactId",
        width: "2%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={<FormattedMessage
                id="app.doyouwishtodetach?"
                defaultMessage="Do you wish to detach?"
              />}
            //   onConfirm={() =>
            //     unlinkContactFromOpportunity(opportunityId, name)
            //   }
            >
              <ActionIcon
                //tooltipTitle="Detach Contact"
                tooltiptitle={<FormattedMessage
                  id="app.detachcontact"
                  defaultMessage="Detach Contact"
                />}
                iconType="api"
                onClick={null}
                size="1em"
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>
          );
        },
      },
      {
        // title: "Status",
        // dataIndex: "active",
        width: "8%",
        render: (name, item, i) => {
          console.log(item.thirdPartyAccessInd)
          return (
           
            <span>
               {item.thirdPartyAccessInd===true&&(
            <CustomerContactActiveToggle
            accessInd={item.accessInd}
            contactId={item.contactId}
            thirdPartyAccessInd={item.thirdPartyAccessInd}

            />
          )} 
            </span>
        
          );
        },
      },

          {
                    title: "",
                    dataIndex: "id",
                    width: "2%",
                    render: (name, item, i) => {
                      return (
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() =>
                            this.props.deleteContactData(item.contactId
                           )
                          }
                        >
              
                        <DeleteOutlined
                sx={{
                  verticalAlign: "middle",
                  marginLeft: "5px",
                  color: "red",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              />
                        </StyledPopconfirm>
                      );
                      // <Tooltip title="Delete">
                      //               <FontAwesomeIcon
                      //                 icon={solid("trash")}
                      //                 onClick={() =>
                      //                   props.deleteCandidateData(
                      //                     item.candidateId,
                      //                         {
                      //                           reInStateInd:true,
                      //                           candidateId:item.candidateId
                      //                         },
                      //                       )
                      //                     }
                      //                 size="14px"
                      //                 style={{
                      //                   verticalAlign: "center",
                      //                   marginLeft: "5px",
                      //                   color: "red",
                      //                 }}
                      //               />
                      //             </Tooltip>
                    },
                  },
    ];

    // if (fetchingCustomerContactError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          columns={columns}
          pagination={false}
          scroll={{ y: tableHeight }}
          dataSource={contactByCustomerId}
          Loading={fetchingCustomerContact || fetchingCustomerContactError}
          onChange={console.log("contact onChangeHere...")}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.firstName || ""}</p>
                <p>{record.designation || ""}</p>
                <p>{record.department || ""}</p>
              </>
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = ({ customer }) => ({
  fetchingCustomerContact: customer.fetchingCustomerContact,
  fetchingCustomerContactError: customer.fetchingCustomerContactError,
  customerId: customer.customer.customerId,
  contactByCustomerId: customer.contactByCustomerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByCustomerId,
      deleteContactData
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
