import React, { Component, useEffect, useState, useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import SkillsLoadMore from "./SkillsLoadMore";
//import AddChoiceCandidateModal from "../CandidateTable/AddChoiceCandidateModal"
import { FormattedMessage } from "react-intl";
import { StyledTable, StyledPopconfirm } from "../../Components/UI/Antd";
import { Button, Select,Input} from "antd";

import {
//   getCandidateListByUserId,
  handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,
  handleChoiceCandidateModal,
  setEditCandidate,
  updateOwnershipById,
  getBlackListCandidate,
  getUnbolckCandidate,
  handleCandidateEmailModal,
  handleDonotCallModal,
  getCandidateBlackList
} from "../Candidate/CandidateAction";

import {getRoles} from "../Settings/Category/Role/RoleAction";
import {getDesignations} from "../Settings/Designation/DesignationAction";

import Highlighter from 'react-highlight-words';

import { getAllSalesList,getRecruiterName } from "../Opportunity/OpportunityAction";
import { SearchOutlined, UpCircleOutlined } from "@ant-design/icons";


const Option =Select;



function CandidateBlackListTable(props) {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
const [visibleselect, setvisibleselect]=useState(false);
const [selectedValue,setselectedValue]=useState("");

function handleTransferClick (){
  setvisibleselect(true)
}
function handlePreview() {
  props.handleContactDrawer()
}

function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}
function handleSend (){
  let data={
    // userId:selectedValue,
    candidateIds:selectedRowKeys
  }
  setselectedValue(props.updateOwnershipById(selectedValue,data));
  console.log(selectedValue,selectedRowKeys)
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

  const [page, setPage] = useState(0);

  useEffect(() => {
    // props.getCandidateListByUserId(props.userId);
    props.getDesignations();
    props.getRoles(props.organizationId); 
    props.getAllSalesList();
    props.getRecruiterName();
    props.getCandidateBlackList(props.userId);
  }, []);

  const [currentCandidateId, setCurrentCandidateId] = useState("");
  const [isViewAll, setIsViewAll] = useState(false);


  function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
  }
  const newSkill=props.skillList&&props.skillList.map((item)=> {
    return { skillName:item,  };
      });

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
              icon={<SearchOutlined 
    style={{ 
      color: "#1890ff",
      border: '!none',          // remove border
      boxShadow: 'none'        // remove hover shadow if any
    }} 
  />}
          
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
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              {/* Reset */}
                <FormattedMessage
                        id="app.reset"
                        defaultMessage="Reset"
                      />
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
              {/* Filter */}
               <FormattedMessage
                        id="app.filter"
                        defaultMessage="Filter"
                      />
            </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined 
        type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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

console.log ("SlR",salelist,recruiterlist)

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

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);

  const {
    // candidateByUserId: {address },
    fetchingContactsLazyLoading,
    contactsLazyLoading,
    fetchingCandidates,
    fetchingCandidatesError,
    setEditCandidate,
    handleUpdateCandidateModal,
    handleupdateCandidateResumeModal,
    candidateByUserId,
    updateCandidateModal,
    handleChoiceCandidateModal,
    updateCandidateResumeModal
  } = props;
  // console.log(address)
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
    //   render: (name, item, i) => {
    //     return (
    //       <SubTitle>
    //         <MultiAvatar
    //           primaryTitle={item.firstName}
    //           imageId={item.imageId}
    //           imageURL={item.imageURL}
    //           imgWidth={"2.1em"}
    //           imgHeight={"2.1em"}
    //         />
    //       </SubTitle>
    //     );
    //   },
    },
    {
      // title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
       dataIndex: "fullName",
      width: "13%",
      ...getColumnSearchProps('fullName'),
      // defaultSortOrder: "descend",
      // sorter: (a, b) => {
      //   var nameA = a.firstName; // ignore upper and lowercase
      //   var nameB = b.firstName; // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }

      //   return 0;
      // },
    //   render: (name, item, i) => {
    //     // const fullName = ` ${item.salutation || ""} ${item.firstName ||
    //     //   ""} ${item.middleName || ""} ${item.lastName || ""}`;
    //        const currentdate = dayjs().format("DD/MM/YYYY");
    //       const date = dayjs(item.creationDate).format("DD/MM/YYYY");
    //     //   console.log(date, currentdate, currentdate === date);
    //     return (
    //       <>
    //       <CandidateDetailsView
    //         candidateId={item.candidateId}
    //         candidateName={item.fullName}
    //       />
    //        &nbsp;&nbsp;
    //         {date === currentdate ? (
    //           <span
    //             style={{
    //               color: "tomato",
    //               fontWeight: "bold",
    //             }}
    //           >
    //             New
    //           </span>
    //         ) : null}
    //       </>
    //     );
    //   },
    },
    {
      title: "",
      width: "2%",
    //   render: (name, item, i) => {
    //     //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
    //     const dataLoc =` Address : ${item.address &&item.address.length &&item.address[0].address1}  Street : ${item.address && item.address.length && item.address[0].street}   
    //     State : ${item.address && item.address.length && item.address[0].state} PostalCode : ${item.address && item.address.length && item.address[0].postalCode} `
    //     return (
    //       <Tooltip
    //       // className="ant-tooltip-inner"
    //       // placement="rightTop" 
    //       overlayStyle={{maxWidth: '300px'}}
      
    //       title={dataLoc}
    //       >
    //         <span
    //           // onClick={() => handleReasonOfDelete(item.orderId)}
    //           style={{
    //             // color:
    //             //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
    //             cursor: "pointer",
    //           }}
    //         >
    //           <i class="fa fa-map-marker" aria-hidden="true"></i>
    //         </span>
    //       </Tooltip>
    //     );
    //   },
    },
    {
      title: <FormattedMessage id="app.category" defaultMessage="Category" />,
      dataIndex: "category",
      width:"6%",
    },
   
    {
      title: (
        <FormattedMessage id="app.vendor" defaultMessage="Vendor" />
      ),
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps('partnerName'),
    },
     {
     
      title: <FormattedMessage id="app.role" defaultMessage="Role" />,
       dataIndex: "roleType",
      width: "8%",
      filters:roleTypeOption,
      
      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

    {
      title: <FormattedMessage id="app.mobile#" defaultMessage="Mobile #" />,
      dataIndex: "mobileNumber",
      width: "10%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      align: "left",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      width: "8%",
    },
    {
      title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
      // dataIndex: "skillList",
      width: "18%",
      ...getColumnSearchProps('skillList'),
    //   render: (name, item, i) => {
    //    const data=item.skillList.filter((skill)=>{
    //     return skill!==null&&skill!==""
    //    }
    //    )
    //     return <>
 
    //       {item.skillList===[] ? "No Data" :
    //       <span>
    //         <SkillsLoadMore
    //         skillList={data}
    //         />
    //       </span>
    //   }
    //       </>
        
    //   },
    
    },
    
    {
    
      title: <FormattedMessage id="app.cost" defaultMessage="Cost" />,
       dataIndex: "billing",
      align: "left",
      width: "6%",
    //   render: (name, item, i) => {        
    //     return (
    //       <>
    //         {/* {item.billing} {item.currency} */}
    //         <span>
    //         {/* <CurrencySymbol currencyType={item.currency} /> */}
    //         {item.billing} {item.currency}
    //       </span>
    //       </>
    //     );
    //   },
    },

     {
      title: "",
      dataIndex: "id",
      width: "2%",
    //   render: (name, item, i) => {
    //     return (
    //       <Tooltip>
     
    //       <span
    //       onClick={() => props.handleDonotCallModal(true)}
    //         style={{
    //           marginRight: "0.5rem",
    //           //color: props.viewType === "dashboard" && "#1890ff",
    //           fontSize: "17px",
    //           cursor: "pointer",
    //         }}
    //       >
    //       <FontAwesomeIcon icon={solid("phone")} />
    //         </span>

    //   </Tooltip>
           
    //     );
    //   },
    },

    {
      title: <FormattedMessage id="app.benefits" defaultMessage="Benefits" />,
       dataIndex: "benifit",
      width: "6%", 
      render: (name, item, i) => {        
        return (
          <>
            {/* {item.billing} {item.currency} */}
            <span>
            {/* <CurrencySymbol currencyType={item.currency} /> */}
            {item.benifit} {item.currency}
          </span>
          </>
        );
      },
    },

{
      title: <FormattedMessage id="app.available" defaultMessage="Available" />,
       dataIndex: "availableDate",
      width: "7%",
    //   render: (text, item) => {
    //     const availableDate = dayjs(item.availableDate).format("ll");
    //     return <>
    //     {item.availableDate === null ? "No Data" :
    //       <span>
    //         {dayjs(item.availableDate).format("l")}
    //       </span>
    //     }
    //   </>
    //   },
      
      
    },

    {
     // title: "",
     title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      // dataIndex: "ownerName",
      width: "8%",
      // ...getColumnSearchProps('ownerName'),
      filters:ownerlistType,
      
      onFilter: (value, record) => {
        return record.fullName === value;
      },
    //   render: (name, item, i) => {
    //     return (
    //       <>
    //        <Tooltip title={item.ownerName}>
    //       <span>
    //         <MultiAvatar
    //           primaryTitle={item.ownerName}
    //           imageId={item.ownerImageId}
    //            imageURL={item.imageURL}
    //           imgWidth={"2.1em"}
    //           imgHeight={"2.1em"}
    //           // style={{borderRadius:"13px" }}
    //         />
    //         </span>
    //        </Tooltip>
          
    //        </>
    //     );
    //   },
    },
    {
      title: <FormattedMessage id="app.active" defaultMessage="Active" />,
      // dataIndex: "active",
      width: "5%",
    //   render: (name, item, i) => {
    //     return (
    //       <StatusToggle
    //       type={ props.active? "primary" : "danger"}
    //         candidateId={item.candidateId}
    //          active={item.active}
    //       />
    //     );
    //   },

    },
{
      title: "",
      dataIndex: "documentId",
      width:"2%",
      render: (name, item, i) => {
        //debugger
        return (
          <StyledPopconfirm
          // title="Do you want to Unblock?"
          title={ <FormattedMessage id="app.doyouwanttoUnblock" defaultMessage="Do you want to Unblock?" />}
          onConfirm={() =>  props.getUnbolckCandidate(item.candidateId)}
        >
        <UpCircleOutlined
       
            style={{ cursor: "pointer" }}
          />
           </StyledPopconfirm>
        );
      },
    },
    // {
    //   title: "",
    //   dataIndex: "documentId",
    //   width:"2%",
    //   render: (name, item, i) => {
    //     //debugger
    //     return (
    //       <Icon
    //         type="edit"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => {
    //            props.setEditCandidate(item);
    //           handleupdateCandidateResumeModal(true);
    //            handleSetCurrentCandidateId(item.candidateId);
             
    //         }}
    //       />
    //     );
    //   },
    // },

    
    // {
    //   title: "",
    //   dataIndex: "documentId",
    //   width:"3%",
    //   render: (name, item, i) => {
    //     //debugger
    //     return (
    //       <>
    //       <div>
    //             <i class="fa fa-map-marker" aria-hidden="true"></i>
    //                {/* &nbsp;&nbsp;&nbsp;
    //               {record.address[0].address1 || ""} &nbsp;{record.address[0].address2 || ""}
    //               {record.address[0].street || ""} &nbsp;{record.address[0].city || ""}&nbsp;
    //               {record.address[0].postalCode || ""}&nbsp;{record.address[0].state || ""} &nbsp;
    //             {record.address[0].country || ""} */}
                 
    //           </div>
    //           </>
    //     );
    //   },
    // },
  
  ];

  // if (fetchingCandidatesError) {
  //   return <APIFailed />;
  // }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;

  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          {/* Clear */}
           <FormattedMessage id="app.clear" defaultMessage="Clear" />
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Button type="primary" onClick={handleTransferClick} disabled={!hasSelected}>
          {/* Select */}
           <FormattedMessage id="app.select" defaultMessage="Select" />
        </Button>
      
        {visibleselect && hasSelected && (
          <>
        <Select  style={{ width: 120 }} onChange={handleSelected}>
          {mergedlist.map((item)=>{
            return <Option value={item.value}>{item.label}</Option>
          }
          )}
    </Select>
    <Button type="primary" onClick={handleSend} >
    Transfer
  </Button>
  <Button
        type="primary" 
         onClick={props.handleChoiceCandidateModal}
        //  handlePreview={() =>
        //   this.props.handleContactDrawer()
        // }
        >
  Email
</Button>
  
  </>
 
)}
      <StyledTable
        rowKey={(record) => record.candidateId}
        rowSelection={rowSelection}
        columns={columns}
        //loading={fetchingCandidates || fetchingCandidatesError}
        scroll={{ y: tableHeight }}
       
        pagination={false}
        // loading={
        //   fetchingContactsLazyLoading ||
        //   fetchingAccounts ||
        //   fetchingCategoryWiseContact ||
        //   fetchingCategory
        // }
       dataSource={props.blackList}

        // expandedRowRender={(record) => {
        //   return (
        //     <>
        //       <div>
        //         <i class="fa fa-map-marker" aria-hidden="true"></i>
        //         &nbsp;&nbsp;&nbsp;
        //         {record.address[0].address1 || ""} &nbsp;{record.address[0].address2 || ""}
        //         {record.address[0].street || ""} &nbsp;{record.address[0].city || ""}&nbsp;
        //         {record.address[0].postalCode || ""}&nbsp;{record.address[0].state || ""} &nbsp;
        //         {record.address[0].country || ""}
               
        //       </div>
        //     </>
        //   );
        // }}
      />
      {/* <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      /> */}
       {/* <AddEmailCandidateModal
       addCandidateEmailModal={props.addCandidateEmailModal}
        // candidateId={currentCandidateId}
        // updateCandidateModal={updateCandidateModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      /> */}
        {/* <AddDonotCallModal
       addDonotCallModal={props.addDonotCallModal}
       candidateId={currentCandidateId}
        // candidateId={currentCandidateId}
        // updateCandidateModal={updateCandidateModal}
        handleDonotCallModal={props.handleDonotCallModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      /> */}
        {/* <AddChoiceCandidateModal
      //  addCandidateEmailModal={props.addCandidateEmailModal}
        // candidateId={currentCandidateId}
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        addCandidateChoiceModal={props.addCandidateChoiceModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        handleChoiceCandidateModal={handleChoiceCandidateModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      /> */}

{/* <UpdateCandidateResumeModal
handleResponseData={props.handleResponseData}
responseData={props.responseData}
         
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        updateCandidateResumeModal={updateCandidateResumeModal}
      handleupdateCandidateResumeModal={handleupdateCandidateResumeModal}
        //  handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      /> */}
 
    </>
  );
}
const mapStateToProps = ({ auth,role, candidate, account,designations,opportunity }) => ({
  userId: auth.userDetails.userId,
  blackList:candidate.blackList,
  candidateId:candidate.candidateByUserId.candidateId,
  addDonotCallModal:candidate.addDonotCallModal,
  candidateByUserId: candidate.candidateByUserId,
  fetchingCandidates: candidate.fetchingCandidates,
  fetchingCandidatesError: candidate.fetchingCandidatesError,
  updateCandidateModal: candidate.updateCandidateModal,
  designations: designations.designations,
  addCandidateChoiceModal:candidate.addCandidateChoiceModal,
  roles: role.roles,
  updateCandidateResumeModal:candidate.updateCandidateResumeModal,
  organizationId: auth.userDetails.organizationId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  addCandidateEmailModal:candidate.addCandidateEmailModal
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCandidateBlackList,
    //   getCandidateListByUserId,
      handleDonotCallModal,
      handleupdateCandidateResumeModal,
      handleUpdateCandidateModal,
      getBlackListCandidate,
      getUnbolckCandidate,
      setEditCandidate,
      handleChoiceCandidateModal,
      getDesignations,
      getRoles,
      getAllSalesList,
      getRecruiterName,
      updateOwnershipById,
      handleCandidateEmailModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateBlackListTable);
