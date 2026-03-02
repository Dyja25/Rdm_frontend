
 import { useEffect, useState } from "react";
 import { connect } from "react-redux";
 import { bindActionCreators } from "redux";
 import { FormattedMessage } from "react-intl";
 import LockOpenIcon from '@mui/icons-material/LockOpen';
 import PublishStatusToggle from "../PublishStatusToggle.jsx";
 import { FlexContainer } from "../../../Components/UI/Layout";
 import { Tooltip,Input,Button  } from "antd";
 import SearchIcon from "@mui/icons-material/Search";
 import Highlighter from 'react-highlight-words';
 import { StyledTable} from "../../../Components/UI/Antd";
 import { MultiAvatar} from "../../../Components/UI/Elements";
 import {
   getPublishTable,
  
 } from "../PublishAction";
import OpportunityDetailView from "../../Opportunity/Child/OpportunityTable/OpportunityDetailView";
 
 function onChange(pagination, filters, sorter) {
   console.log("params", pagination, filters, sorter);
 }
 
 
 
 function PublishTable(props) {
    useEffect(() => {
       props.getPublishTable()      
      }, []);
   // useEffect(() => {
   //   if((props.role==="ADMIN"||props.role==="USER")&& user.department==="Sales"){
   //     props.getOpportunityListByUserId(props.userId);
   //   }else
   //   if(props.role==="USER"&&user.department==="Recruiter"){
   //     props.getRecruiterList(props.recruiterId);
 
   //   }
     
   // }, []);
 //   useEffect(() => {
 //     if(props.role==="USER"&&user.department==="Recruiter"){
 //       props.getRecruiterList(props.recruiterId);     
 //     }else{
 //       props.getOpportunityListByUserId(props.userId);
 //     }      
 //   }, []);
 
  
 
   
   const [currentOpportunityId, setCurrentOpportunityId] = useState("");
 
 
   function handleSetCurrentOpportunityId(opportunityId) {
     setCurrentOpportunityId(opportunityId);
     console.log(opportunityId);
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
  icon={<SearchIcon fontSize="small" />}
               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
               // icon={<SearchOutlined />}
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
         // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
<SearchIcon
  fontSize="small"
  style={{ color: filtered ? "#1890ff" : undefined }}
/>       ),
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
 //   const {
 //     fetchingOpportunity,
 //     fetchingRecruiterList,
 //     fetchingRecruiterListError,
 //     user,
 //     fetchingOpportunityError,
 //     opportunityByUserId,
 //     recruiterList,
 //     handleUpdateOpportunityModal,
 //     updateOpportunityModal,
 //     deleteOpportunityData,
 //      data,
 //   } = props;
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
         id="app.requirement"
         defaultMessage="Requirement"
      
       />,
       width:"14%",
 
       dataIndex: "requirementName",
     //   ...getColumnSearchProps('opportunityName'),
     //   defaultSortOrder: "ascend",
     //   width: "20%",
     //   render: (name, item, i) => {
     //     const fullName = ` ${item.salutation || ""} ${item.firstName ||
     //       ""} ${item.middleName || ""} ${item.lastName || ""}`;
 
     //     const currentdate = dayjs().format("DD/MM/YYYY");
     //     const date = dayjs(item.creationDate).format("DD/MM/YYYY");
     //     console.log(date, currentdate, currentdate === date);
     //     return (
     //       <>
     //       <OpportunityDetailView
     //         opportunityId={item.opportunityId}
     //         opportunityName={item.opportunityName}
     //       />
     //         &nbsp;&nbsp;
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
       //title: "Currency",
       title: <FormattedMessage
         id="app.jobId"
         defaultMessage="Job ID"
       />,
 
       dataIndex: "jobOrder",
     //   ...getColumnSearchProps('customer'),
        width: "13%",
     },
     {
      //title: "Currency",
      title: <FormattedMessage
        id="app.opportunityName"
        defaultMessage="Opportunity Name"
      />,

      // dataIndex: "opprtunityName",
    //   ...getColumnSearchProps('customer'),
       width: "13%",
            ...getColumnSearchProps('opportunityName'),
       defaultSortOrder: "ascend",
       width: "20%",
       render: (name, item, i) => {
         
         return (
           <>
           <OpportunityDetailView
             opportunityId={item.opportunityId}
             opportunityName={item.opportunityName}
           />
           
           </>
         );
       },
    },
     {
        //title: "Currency",
        title: <FormattedMessage
          id="app.sponsor"
          defaultMessage="Sponsor"
        />,
  
        dataIndex: "sponserName",
      //   ...getColumnSearchProps('customer'),
         width: "10%",
      },
     {
       //title: "Start Date",
       title: <FormattedMessage
         id="app.positions"
         defaultMessage= " # Positions" 
       />,
 
       dataIndex: "number",
       width:"12%",
       //defaultSortOrder: "descend",
     //   sorter: (a, b) => {
     //     var nameA = a.startDate; // ignore upper and lowercase
     //     var nameB = b.startDate; // ignore upper and lowercase
     //     if (nameA < nameB) {
     //       return -1;
     //     }
     //     if (nameA > nameB) {
     //       return 1;
     //     }
   
     //     return 0;
     //   },
     //   render: (text, item) => {
     //     const startDate = dayjs(item.startDate).format("ll");
     //     return <span>{startDate}</span>;
     //   },
     },
     {
        //title: "Proposal Amount",
        title: <FormattedMessage
          id="app.submitted"
          defaultMessage="Submitted"
        />,
        dataIndex: "offered",
        width: "12%",
        onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      //   render: (name, item, i) => {        
      //     return (
      //       <>
      //         {item.proposalAmount} {item.currency} 
      //         {/* <span>
      //         <CurrencySymbol currencyType={item.currency} />
      //         {item.proposalAmount}
      //       </span> */}
      //       </>
      //     );
      //   },
      },
      {
        //title: "Proposal Amount",
        title: <FormattedMessage
          id="app.selected"
          defaultMessage="Selected"
        />,
        dataIndex: "closedPosition",
        width: "12%",
        onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      //   render: (name, item, i) => {        
      //     return (
      //       <>
      //         {item.proposalAmount} {item.currency} 
      //         {/* <span>
      //         <CurrencySymbol currencyType={item.currency} />
      //         {item.proposalAmount}
      //       </span> */}
      //       </>
      //     );
      //   },
      },
      {
       //title: "End Date",
       title: <FormattedMessage
         id="app.onBoarded"
         defaultMessage="On Boarded"
       />,
       dataIndex: "onBoardNo",
       width:"10%",
       //defaultSortOrder: "descend",
     //   sorter: (a, b) => {
     //     var nameA = a.endDate; // ignore upper and lowercase
     //     var nameB = b.endDate; // ignore upper and lowercase
     //     if (nameA < nameB) {
     //       return -1;
     //     }
     //     if (nameA > nameB) {
     //       return 1;
     //     }
   
     //     return 0;
     //   },
     //   render: (text, item) => {
     //     const endDate = dayjs(item.endDate).format("ll");
     //     return <span>{endDate}</span>;
     //   },
     },
     {
       title:"Recruiter",
       width: "12%",
        dataIndex: "fullName",
        render: (name, item, i) => {
          return (
            <>
             <FlexContainer justifyContect="space-evenly">
                {item.recruiterList && item.recruiterList.map((item, i) => {
                  console.log(item)
                  // console.log(item.fullName)
                  return (
                    
                    <Tooltip
                    title={item.fullName}
                >
                    <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
                        <MultiAvatar
                         primaryTitle={item.fullName||""}
                          // imageId={item.imageId}
                          // imageURL={item.imageURL}
                          // imgWidth={"1.8em"}
                          // imgHeight={"1.8em"}
                        />
                      </div>
                      </Tooltip>
                       
  
                  );  
                                
                })}              
               </FlexContainer>
            </>
          );
        }
     //    render: (text, item) => {
     //    return <>
     //    {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
     //    <Tooltip title={item.assignedTo}>
     //       <span>
     //         <MultiAvatar
     //           primaryTitle={item.assignedTo}
     //           // imageId={item.ownerImageId}
     //           //  imageURL={item.imageURL}
     //           imgWidth={"2.1em"}
     //           imgHeight={"2.1em"}
     //         />
     //         </span>
     //        </Tooltip>      
        
     //    </>
     //   },
        
     },

     {
      title:"Pin to the top",
      width:"10%",
      render: (name, item, i) => {
        //console.log(item.thirdPartyAccessInd)
        return (
         
          <span>
      
      <PublishStatusToggle
      recruitmentId={item.recruitmentId}
      pingInd={item.pingInd}
      
      // defaultInd={item.defaultInd}
      // id={item.id}
      />
                  
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
          <Tooltip>
     
          <span
           onClick={() => {
            this.props.LinkOpenedRequirement(
              item.recruitmentId,
              this.handleCallback
              // this.props.organizationId,


            );
            // item.opportunityId
          }}
          //onClick={() => props.handleDonotCallModal(true)}
            style={{
              marginRight: "0.5rem",
              //color: props.viewType === "dashboard" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            {/* <FontAwesomeIcon icon={solid("lock-open")} /> */}
            <LockOpenIcon />
            {/* <FontAwesomeIcon icon={solid("phone-volume")} /> */}
          {/* <FontAwesomeIcon icon={solid("phone")} /> */}
            </span>

      </Tooltip>
           
        );
      },
    },
    //  {
    //   title:
    //    <FormattedMessage id="app.active" defaultMessage="Active"
    //     />,
    //   // dataIndex: "active",
    //   width: "6%",
    //   render: (name, item, i) => {
    //     return (
    //       <StatusToggle
    //         recruitmentId={item.recruitmentId}
    //       closeInd={item.closeInd}
    //       />
    //     );
    //   },

    // },
    
    
     //  {
    //    //title: "Email",
    //    title: <FormattedMessage id="app.sponsor" defaultMessage="Sponsor" />,
    //    dataIndex: "ownerName",
    //  //   ...getColumnSearchProps('ownerName'),
    //  //   render: (name, item, i) => {
    //  //     return (
    //  //       <>
    //  //        <Tooltip title={item.ownerName}>
    //  //       <span>
    //  //         <MultiAvatar
    //  //           primaryTitle={item.ownerName}
    //  //           imageId={item.ownerImageId}
    //  //            imageURL={item.imageURL}
    //  //           imgWidth={"2.1em"}
    //  //           imgHeight={"2.1em"}
    //  //         />
    //  //         </span>
    //  //        </Tooltip>
           
    //  //        </>
    //  //     );
    //  //   },
    //     width: "10%",
    //  },
    
 
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
 
 
     // {
     //   title: "",
     //   dataIndex: "documentId",
     //   width: "2%",
     //   render: (name, item, documentId,i) => {
     //     // documentId &&
     //     // documentId.map((documentId) => (
     //     //   <a className="documentId" href>
     //     //     {documentId}
     //     //   </a>
     //     // ));
       
     //     return (
     //       // <Tooltip title="Edit">
     //       <Tooltip
     //       title={
     //         <FormattedMessage
     //           id="app.edit"
     //           defaultMessage="Edit"
     //         />
     //       }
     //     >
     //        {user.userType !== "USER" && user.department !== "Recruiter" && ( 
     //         <Icon
     //           type="edit"
     //           style={{ cursor: "pointer", color: "blue" }}
     //           onClick={() => {
     //             props.setEditOpportunity(item);
     //             handleUpdateOpportunityModal(true);
     //             handleSetCurrentOpportunityId(item.opportunityId);
     //           }}
     //         />
     //        )}
     //       </Tooltip>
     //     );
     //   },
     //   // className: "documentId",
     // },
 
     // {
     //   title: "",
     //   dataIndex: "id",
     //   width: "2%",
     //   render: (name, item, i) => {
     //     return (
     //       <StyledPopconfirm
     //         title="Do you want to delete?"
     //         onConfirm={() => deleteOpportunityData(item.opportunityId)}
     //       >
     //          {user.userType !== "USER" && user.department !== "Recruiter" && ( 
     //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
     //          )}
     //       </StyledPopconfirm>
     //     );
     //   },
     // },
 
     
   ];
 //   if (fetchingOpportunityError) {
 //     return <APIFailed />;
 //   }
 
   const tab = document.querySelector(".ant-layout-sider-children");
   const tableHeight = tab && tab.offsetHeight * 0.4;
 
   
 
   return (
     <>
       <StyledTable
         // rowSelection={rowSelection}
         
         // bordered
        //  rowKey="opportunityId"
         columns={columns}
         dataSource={props.tablePublish }
         onChange={onChange}
          Loading={props.fetchingpublishTable || props.fetchingpublishTableError}
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
       
 
       {/* <UpdateOpportunityModal
         opportunityId={currentOpportunityId}
         updateOpportunityModal={updateOpportunityModal}
         handleUpdateOpportunityModal={handleUpdateOpportunityModal}
         handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
       /> */}
     </>
   );
 }
 
 // }
 const mapStateToProps = ({ auth, account, publish,opportunity }) => ({
  tablePublish:publish.tablePublish
 //   userId: auth.userDetails.userId,
 //   user: auth.userDetails,
 //   role: auth.userDetails.role,
 //   recruiterList:opportunity.recruiterList,
 //   fetchingRecruiterList:opportunity.fetchingRecruiterList,
 //   fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
 //   fetchingOpportunity: opportunity.fetchingOpportunity,
 //   fetchingOpportunityError: opportunity.fetchingOpportunityError,
 //   opportunityByUserId: opportunity.opportunityByUserId,
 //   updateOpportunityModal: opportunity.updateOpportunityModal,
 //   recruiterId:auth.userDetails.userId,
 });
 const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
     {
     //   getOpportunityListByUserId,
     getPublishTable
     //   getRecruiterList,
     //   handleUpdateOpportunityModal,
     //   setEditOpportunity,
     //   deleteOpportunityData,
     },
     dispatch
   );
 export default connect(mapStateToProps, mapDispatchToProps)(PublishTable);
 