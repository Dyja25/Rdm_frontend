import React, { Component, useEffect, useState,useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, Empty, Tooltip,Input,Select,Space } from "antd";
import Highlighter from 'react-highlight-words';
import { MultiAvatar,SubTitle } from "../../../../Components/UI/Elements";
import {
  getContactListByUserId,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  deleteContactData
} from "../../ContactAction";
import {getAllSalesList,getRecruiterName} from "../../../Opportunity/OpportunityAction"
import {getDesignations} from "../../../Settings/Designation/DesignationAction";

import ContactDetailView from "./ContactDetailView.jsx";

import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal.jsx";
import { DeleteOutlined, EditOutlined, FilterOutlined, PhoneOutlined } from "@ant-design/icons";
import MicIcon from '@mui/icons-material/Mic';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal.jsx")
);

const Option =Select;

function ContactTable(props) {
  useEffect(() => {
    props.getContactListByUserId(props.userId);
    props.getAllSalesList();
    props.getRecruiterName(); 
  }, []);

  const salelist=props.sales.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })
  const recruiterlist=props.recruiterName.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })

  const mergedlist=salelist.concat(recruiterlist)

 

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [visibleselect, setvisibleselect]=useState(false);
const [selectedValue,setselectedValue]=useState("");
const [loading, setLoading] = useState(false);

function handleTransferClick (){
  setvisibleselect(true)
}

const start = () => {
  setLoading(true); // ajax request after empty completing

  setTimeout(() => {
    setSelectedRowKeys([]);
    setLoading(false);
  }, 1000);
};

const onSelectChange = (newSelectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  setSelectedRowKeys(newSelectedRowKeys);
};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;

function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}

function handleSend (){
  let data={
    // userId:props.userId,
    contactIds:selectedRowKeys
  }
  setselectedValue(props.updateOwnercontactById(selectedValue,data));
  console.log(selectedValue,selectedRowKeys)
}

  const [currentContactId, setCurrentContactId] = useState("");
  console.log("Current",props.contactByUserId.length&&props.contactByUserId.contactId)
  console.log("Current1",props.contactByUserId)


  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log("Current2",contactId);
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
            //   searchInput = node;
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
        // <FilterOutlined
        // type="search" 
        // style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchIcon style={{fontSize:"20px"}}/>
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
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

  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]);
  const departmentNameOption = useMemo(() => {
    if (!props.departments) return [];
    return (
      props.departments.length &&
      props.departments.map((departments) => {
        return {
          text: departments.departmentName || "",
          value: departments.departmentName,
        };
      })
    );
  }, [props.departments]);

  const designationTypeOption = useMemo(() => {
    if (!props.designations) return [];
    return (
      props.designations.length &&
      props.designations.map((designations) => {
        return {
          text: designations.designationType || "",
          value: designations.designationType,
        };
      })
    );
  }, [props.designations]);

  const {
    fetchingContacts,
    fetchingContactsError,
    contactByUserId,
    handleUpdateContactModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
  } = props;
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
        );
      },
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "fullName",
      ...getColumnSearchProps('fullName'),
      width: "15%",
      defaultSortOrder: "descend",
      render: (name, item, i) => {
        const fullName = `${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""} `;
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          console.log(date, currentdate, currentdate === date);
        return (
          <>
         <span style={{ color: "#375cb0" }}>
           <ContactDetailView
            contactId={item.contactId}
             contactName={fullName}
          />
         </span>
          &nbsp;&nbsp;
          {date === currentdate ? (
            <span
              style={{
                color: "tomato",
                fontWeight: "bold",
              }}
            >
              New
            </span>
          ) : null}
          </>
        );
      },
    },

    // {
    //   //title: "Type",
    //   title: <FormattedMessage id="app.contactType" defaultMessage="Type" />,
    //   dataIndex: "contactType",
    //   // width: "15%",
    // },
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    {
      title: <FormattedMessage id="app.company" defaultMessage="Company" />,
      dataIndex: "tagWithCompany",
      // width: "15%",
      ...getColumnSearchProps('tagWithCompany'),
    },
    {
      //title: "Designation",
      title: (
        <FormattedMessage id="app.designation" defaultMessage="Designation" />
      ),
      dataIndex: "designation",
      // width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.designation - b.designation,
      filters:designationTypeOption,
      
      onFilter: (value, record) => {
        return record.designation === value;
      },
    },
    {
      //title: "Department",
      title: (
        <FormattedMessage id="app.department" defaultMessage="Department" />
      ),
      // width: "15%",
      dataIndex: "department",
      filters:departmentNameOption,
      onFilter: (value, record) => {
        return record.department === value;
      },
    },
    {
      // title: "Mobile #",
      title: (
        <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />
      ),
      dataIndex: "mobileNumber",
      // width: "15%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      //title: "Email #",
      title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
      width: "17%",
      dataIndex: "emailId",
    },

    {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      // ...getColumnSearchProps('ownerName'),
      width: "8%",

      filters:ownerlistType,
      
      onFilter: (value, record) => {
        return record.fullName === value;
      },
      render: (name, item, i) => {
        return (
           <Tooltip title={item.ownerName}>
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        return (
          // <Tooltip title="Edit">
          <Tooltip
          title={
            <FormattedMessage
              id="app.edit"
              defaultMessage="Edit"
            />
          }
        >
            <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer",fontSize:"17px" }}
              onClick={() => {
                props.setEditContact(item);
                handleUpdateContactModal(true);
                handleSetCurrentContactId(item.contactId);
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "notes",
      width: "5%",
      render: (name, item, i) => {
        
        return (
          // <Tooltip title="Edit">
          <Tooltip
          title="Voice to Text">

        <span                       
                  onClick={()=>handleContactReactSpeechModal(true)}
               >
                <MicIcon
                style={{ cursor: "pointer",fontSize:"17px" }} />
                  
                  </span>
          </Tooltip>
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
                      props.deleteContactData(item.contactId,props.viewType
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

//   if (fetchingContactsError) {
//     return <APIFailed />;
//   }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
      Clear
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Button type="primary" onClick={handleTransferClick} disabled={!hasSelected}>
          Select
        </Button>
        {visibleselect && hasSelected && (
          <>
        <Select  style={{ width: 120 }} onChange={handleSelected}>
          {mergedlist.map((item)=>{
            return <Option value={item.value}>{item.label}</Option>
          }
          )}
    </Select>
    <Button type="primary" 
    onClick={handleSend} 
    >
    Transfer
  </Button>
  </>
        )}
      <StyledTable
        // rowKey="contactId"
        rowSelection={rowSelection}
        rowKey={(record) => record.contactId}
        // rowSelection={rowSelection}
        columns={columns}
        loading={fetchingContacts || fetchingContactsError}
        // scroll={{ y: 350 }}
        scroll={{ y: tableHeight }}          
        pagination={false}
        // loading={
        //   fetchingContactsLazyLoading ||
        //   fetchingAccounts ||
        //   fetchingCategoryWiseContact ||
        //   fetchingCategory
        // }
        dataSource={props.contactByUserId}
        // onChange={onChange}
        expandedRowRender={(record) => {
          return (
            <>
              <div>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;
                {record.address1 || ""} &nbsp;
                {record.city || ""} {record.country || ""} &nbsp;
                {record.state || ""} &nbsp;
                {record.postalCode || ""}&nbsp;
              </div>
            </>
          );
        }}
        // locale={{
        //   emptyText: <Empty description={"We couldn't find relevant data"} />,
        // }}
      />
      <UpdateContactModal
        contactId={currentContactId}
        updateContactModal={updateContactModal}
        handleUpdateContactModal={handleUpdateContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
       <ReactContactSpeechModal
           contactId={ currentContactId }
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          handleSetCurrentContactId={handleSetCurrentContactId}
          />
    </>
  );
}
const mapStateToProps = ({ auth, contact, account,designations,departments,opportunity }) => ({
  userId: auth.userDetails.userId,
  // contactId:contact.contactByUserId.contactId,
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
  designations: designations.designations,
  departments:departments.departments,
  addContactSpeechModal:contact.addContactSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByUserId,
      handleUpdateContactModal,
      setEditContact,
      getDesignations,
      updateOwnercontactById,
      getRecruiterName,
      getAllSalesList,
      handleContactReactSpeechModal,
      deleteContactData


    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);
