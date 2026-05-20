import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Tooltip,Input,Button,Select, } from "antd";
import Highlighter from 'react-highlight-words';
import { CurrencySymbol } from "../../../../Components/Common";
import dayjs from "dayjs";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";

import {
  getOpportunityListByUserId,
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  getRecruiterName,
  updateOwneroppById,
      getAllSalesList
} from "../../OpportunityAction";
import OpportunityDetailView from "./OpportunityDetailView.jsx";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal.jsx";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const Option =Select;

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}



function OpportunityTable(props) {
  // useEffect(() => {
  //   if((props.role==="ADMIN"||props.role==="USER")&& user.department==="Sales"){
  //     props.getOpportunityListByUserId(props.userId);
  //   }else
  //   if(props.role==="USER"&&user.department==="Recruiter"){
  //     props.getRecruiterList(props.recruiterId);

  //   }
    
  // }, []);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
      props.getOpportunityListByUserId(props.userId);
    } 
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
    opportunityIds:selectedRowKeys
  }
  setselectedValue(props.updateOwneroppById(selectedValue,data));
  console.log(selectedValue,selectedRowKeys)
}


  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log("opp",opportunityId);
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
              icon={<SearchOutlined/>}
            
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
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
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
            textToHighlight={text ? text.toString(): ""}
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
    fetchingOpportunity,
    fetchingRecruiterList,
    fetchingRecruiterListError,
    user,
    fetchingOpportunityError,
    opportunityByUserId,
    recruiterList,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     data,
     fetchingAllOpportunities,
  } = props;
  // if (fetchingOpportunity) {
  //   return <BundleLoader />;
  // }
  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      //title: "Name",
      title: <FormattedMessage
        id="app.name"
        defaultMessage="Name"
      />,

      dataIndex: "opportunityName",
      ...getColumnSearchProps('opportunityName'),
      defaultSortOrder: "ascend",
      width: "20%",
      render: (name, item, i) => {
        const fullName = ` ${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""}`;

        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
          <OpportunityDetailView
            opportunityId={item.opportunityId}
            opportunityName={item.opportunityName}
          />
            &nbsp;&nbsp;
            {date === currentdate ? (
             <span className="blink">
                New
              </span>
            ) : null}
          </>
        );
      },
    },
    {
      //title: "Currency",
      title: <FormattedMessage
        id="app.customer"
        defaultMessage="Customer"
      />,

      dataIndex: "customer",
      ...getColumnSearchProps('customer'),
       width: "15%",
    },
    {
      //title: "Start Date",
      title: <FormattedMessage
        id="app.startdate"
        defaultMessage="Start Date"
      />,

      dataIndex: "startDate",
      width:"10%",
      //defaultSortOrder: "descend",
      sorter: (a, b) => {
        var nameA = a.startDate; // ignore upper and lowercase
        var nameB = b.startDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      //title: "End Date",
      title: <FormattedMessage
        id="app.enddate"
        defaultMessage="End Date"
      />,
      dataIndex: "endDate",
      width:"10%",
      //defaultSortOrder: "descend",
      sorter: (a, b) => {
        var nameA = a.endDate; // ignore upper and lowercase
        var nameB = b.endDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
    },
    {
      //title: "Proposal Amount",
      title: <FormattedMessage
        id="app.proposalamount"
        defaultMessage="Proposal Amount"
      />,
      width: "10%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {item.proposalAmount} {item.currency} 
            {/* <span>
            <CurrencySymbol currencyType={item.currency} />
            {item.proposalAmount}
          </span> */}
          </>
        );
      },
    },
    {
      title:"Sales Rep",
      width: "7%",
       dataIndex: "assignedTo",
       render: (text, item) => {
       return <>
       {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
       <Tooltip title={item.assignedTo}>
          <span>
            <MultiAvatar
              primaryTitle={item.assignedTo}
              // imageId={item.ownerImageId}
              //  imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           </Tooltip>      
       
       </>
      },
       
    },
   
    {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      //...getColumnSearchProps('ownerName'),
      filters:ownerlistType,
      
      // onFilter: (value, record) => {
      //   return record.fullName === value;
      // },
      render: (name, item, i) => {
        return (
          <>
           <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           </Tooltip>
          
           </>
        );
      },
       width: "7%",
    },
   

    // {
    //   //title: "Email",
    //   title: <FormattedMessage id="app.recruiter" defaultMessage="Recruiter" />,
    //   dataIndex: "fullName",
    //   // ...getColumnSearchProps('recruiterDetails'),
    //   render: (name, item, i) => {
        
         
    //     //     return {
    //     //     children: `${item.recruiterDetails.fullName || ""} `,
    //     //     };
          
    //     // },
        
    //     return (
    //       <>
    //        <Tooltip title={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].fullName||""}>
    //       <span>
    //         <MultiAvatar
    //           primaryTitle={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].fullName||""}
    //           imageId={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].imageId||""}
    //            imageURL={item.imageURL}
    //           imgWidth={"2.1em"}
    //           imgHeight={"2.1em"}
    //         />
    //         </span>
    //        </Tooltip>
          
    //        </>
    //     );
    //   },
    //    width: "12%",
    // },


    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, documentId,i) => {
        // documentId &&
        // documentId.map((documentId) => (
        //   <a className="documentId" href>
        //     {documentId}
        //   </a>
        // ));
      
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
            {user.opportunityUpdateInd ===true && (
            <EditOutlined
              type="edit"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item.opportunityId);
              }}
            />
           )}
          </Tooltip>
        );
      },
      // className: "documentId",
    },

    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteOpportunityData(item.opportunityId)}
          >
             {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
             {user.opportunityDeleteInd ===true && (
            <DeleteOutlined
            type="delete" style={{ cursor: "pointer", color: "red" }} />
             )}
          </StyledPopconfirm>
        );
      },
    },

    
  ];
  if (fetchingOpportunityError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  

  return (
    <>
     {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
     <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
      <FormattedMessage
                 id="app.clear"
                 defaultMessage="Clear"
                                    />
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
         <FormattedMessage
                 id="app.select"
                 defaultMessage="Select"
                                    />
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
    {/* Transfer */}
     <FormattedMessage
                               id="app.transfer"
                               defaultMessage="Transfer"
                                                  />
  </Button>
  </>
)}
      <StyledTable
        rowSelection={rowSelection}
        rowKey={(record) => record.opportunityId}
        
        // bordered
        // rowKey="opportunityId"
        columns={columns}
        dataSource={
          user.department === "Recruiter"
          ? recruiterList
          : opportunityByUserId
        }
        onChange={onChange}
        loading={fetchingOpportunity || fetchingOpportunityError || fetchingAllOpportunities}
        // pagination={{
        //   defaultPageSize: 10,
        // }}
        // scroll={{ y: 460 }}
        
        // pagination={false
        //   // defaultPageSize: 15,
        //   // showSizeChanger: true,
        //   // pageSizeOptions: ["15", "25", "40", "50"],
        // }

        scroll={{ y: tableHeight }}
       
        pagination={false}
      />
      

      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
      getRecruiterList,
      getRecruiterName,
      getAllSalesList,
      handleUpdateOpportunityModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
