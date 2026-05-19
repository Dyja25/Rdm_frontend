import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {  Tooltip, Button,Input, } from "antd";

import { 
  getContactListByPartnerId, 
  setEditPartnerContact,
  handleUpdatePartnerContactModal, 
} from "../../../../PartnerAction";
import UpdatePartnerContactModal from "../../../UpdatePartnerContact/UpdatePartnerContactModal.jsx";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";



import Highlighter from "react-highlight-words";
import { ApiOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons"
import PartnerContactActiveToggle from "./PartnerContactActiveToggle.jsx";

// import { ApiOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;
function LinkedContact(props) {
  useEffect(() =>{
    props.getContactListByPartnerId(props.partnerId);
  },[]);

  const [currentContactId, setCurrentContactId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }
  
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
        
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
        
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
    const {
      //   opportunity: { opportunityId },
      fetchingPartnerContact,
      user,
      fetchingPartnerContactError,
      contactByPartnerId,
      handleUpdatePartnerContactModal,
      updatePartnerContactModal,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
    } = props;
    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "2%",
        render: (name, item, i) => {
          console.log(item);
          //   return (
          //     <span style={{ height: "32px" }}>
          //       <MultiAvatar
          //         primaryTitle={item.firstName}
          //         imageId={item.imageId}
          //         imgWidth={"auto"}
          //         imgHeight={"32px"}
          //       />
          //     </span>
          //   );
        },
      },
      {
        // title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        width: "20%",
        ...getColumnSearchProps("firstName"),
         dataIndex: "firstName",
        render: (name, item, i) => {
          const fullName = `${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""} `;
            return (
             fullName
            );
          }
      },
      {
        // title: "Designation",
        title: <FormattedMessage id="app.role" defaultMessage="Role" />,
        width: "12%",
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
        title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
        dataIndex: "sector",
        width: "12%",
        onFilter: (value, record) => record.sector.indexOf(value) === 0,
        sorter: (a, b) => {
          const sectorA = a.sector;
          const sectorB = b.sector;
          if (sectorA < sectorB) {
            return -1;
          }
          if (sectorA > sectorB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },
      {
        title: <FormattedMessage id="emailid" defaultMessage="Email" />,
        width: "20%",
        dataIndex: "emailId",
        
      },
      {
        title: <FormattedMessage id="linkedinid" defaultMessage="Linkedin" />,
        width: "20%",
        dataIndex: "linkedinPublicUrl",
        
      },
      {
        // title: "Role",
        title: "",
        // <FormattedMessage id="app.role" defaultMessage="Role" />,
        dataIndex: "contactId",
        width: "30%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <FlexContainer justifyContect="space-evenly">
              <ButtonGroup>
                <RoleButton
                  type="DecisionMaker"
                  iconType="fa-vote-yea"
                  tooltip="Decision Maker"
                  role={item.role && item.role.type}
                    // onClick={() =>
                    //   setContactRoleForOpportunity(
                    //     opportunityId,
                    //     item.contactId,
                    //     "DecisionMaker"
                    //   )
                    // }
                />
                <RoleButton
                  type="Evaluator"
                  iconType="fa-address-card"
                  tooltip="Evaluator"
                  role={item.role && item.role.type}
                  //   onClick={() =>
                  //     setContactRoleForOpportunity(
                  //       opportunityId,
                  //       item.contactId,
                  //       "Evaluator"
                  //     )
                  //   }
                />
                <RoleButton
                  type="Influencer"
                  iconType="fa-hands-helping"
                  tooltip="Influencer"
                  role={item.role && item.role.type}
                  //   onClick={() =>
                  //     setContactRoleForOpportunity(
                  //       opportunityId,
                  //       item.contactId,
                  //       "Influencer"
                  //     )
                  //   }
                />
                <RoleButton
                  type="Sponsor"
                  iconType="fa-user"
                  tooltip="Sponsor"
                  role={item.role && item.role.type}
                  //   onClick={() =>
                  //     setContactRoleForOpportunity(
                  //       opportunityId,
                  //       item.contactId,
                  //       "Sponsor"
                  //     )
                  //   }
                />
              </ButtonGroup>
              <Tooltip title="Edit">
              {user.userType !== "USER" && user.department !== "Recruiter" && ( 
              <EditOutlined
              type="edit"
              style={{ cursor: "pointer",fontSize:"22px", width:"8%",
              marginLeft:"7px",marginTop:"4px",
            }}
              onClick={() => {
                props.setEditPartnerContact(item);
                handleUpdatePartnerContactModal(true);
                handleSetCurrentContactId(item.contactId);
              }}
            />
              )}
          </Tooltip>
            </FlexContainer>
          );
        },
        onFilter: (value, record) => record.department.indexOf(value) === 0,
      },
      {
        title: "",
        dataIndex: "contactId",
        width: "7%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
             <StyledPopconfirm
              placement="bottom"
              // title="Do you wish to detach?"
              title={<FormattedMessage id="app.doyouwishtodetach" defaultMessage="Do you wish to detach?" />}
              //   onConfirm={() =>
              //     unlinkContactFromOpportunity(opportunityId, name)
              //   }
            >
               {user.userType !== "USER" && user.department !== "Recruiter" && ( 
              <ApiOutlined
             
               
                onClick={null}
                size="16px"
                style={{ color: "#fb8500" }}
              />
               )}
            </StyledPopconfirm>
           
          );
        },
      },
      {
        // title: "Status",
        // dataIndex: "active",
        width: "9%",
        render: (name, item, i) => {
          console.log(item.merchantId);
          return (
            <PartnerContactActiveToggle
            accessInd={item.accessInd}
            contactId={item.contactId}
             //thirdPartyAccessInd={item.thirdPartyAccessInd}
              // merchantId={item.merchantId}
              // item={item}
              // approveInd={item.approveInd}
            />
          );
        },
      },
    ];
    

    // if (fetchingPartnerContactError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          // rowKey={(record) => record.contactId}
          columns={columns}
          pagination={false}
          scroll={{ y: tableHeight }}
          dataSource={contactByPartnerId}
          Loading={fetchingPartnerContact || fetchingPartnerContactError}
          onChange={console.log("contact onChangeHere...")}
          expandedRowRender={(record) => {
          return (
            <>
              <div>
                <i class="fa fa-phone" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;
                {/* {record.mobileNumber || ""} &nbsp; */}
                {record.countryDialCode1 || ""} {record.mobileNumber || ""} &nbsp;
                {record.phoneNumber || ""} &nbsp;
                {/* {record.postalCode || ""}&nbsp; */}
              </div>
            </>
          );
        }}
        />
        <UpdatePartnerContactModal
        contactId={currentContactId}
        updatePartnerContactModal={updatePartnerContactModal}
        handleUpdatePartnerContactModal={handleUpdatePartnerContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
        />
      </>
    );
  }


const mapStateToProps = ({ partner,auth }) => ({
  fetchingPartnerContact: partner.fetchingPartnerContact,
  fetchingPartnerContactError: partner.fetchingPartnerContactError,
  partnerId: partner.partner.partnerId,
  user: auth.userDetails,
  contactByPartnerId: partner.contactByPartnerId,
  updatePartnerContactModal: partner.updatePartnerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByPartnerId,
      handleUpdatePartnerContactModal,
      setEditPartnerContact,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "22px";
  } else {
    size = "16px";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "6px",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "20px" }}></i>
      </Button>
    </Tooltip>
  );
}
