
 import React, { useEffect, useState } from "react";
 import { connect } from "react-redux";
 import { bindActionCreators } from "redux";
 import { FormattedMessage } from "react-intl";
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import BadgeIcon from '@mui/icons-material/Badge';
 import FileUploadIcon from '@mui/icons-material/FileUpload';
 import SchoolIcon from '@mui/icons-material/School';
 import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
 import { SearchOutlined } from '@ant-design/icons';

// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
 import { Tooltip,Input,Button,Badge  } from "antd";
 import Highlighter from 'react-highlight-words';
 import dayjs from "dayjs";
 import { StyledTable } from "../../../Components/UI/Antd";


 import {
   getDashboardTable2,
  
 } from "../DashboardAction";
 // import OpportunityDetailView from "./OpportunityDetailView";
 // import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import { FlexContainer } from "../../../Components/UI/Layout";
 
 function onChange(pagination, filters, sorter) {
   console.log("params", pagination, filters, sorter);
 }
 
 
 
 function DashboardTable2(props) {
    useEffect(() => {
      if(props.role==="USER"&&props.user.department==="Recruiter"){
        props.getDashboardTable2(props.userId,"Recruiter");     
      }else{
        props.getDashboardTable2(props.userId,"Sales");
      }  
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
               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
               // icon={<SearchOutlined />}
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
  <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
 
    //  {
    //    //title: "Name",
    //    title: <FormattedMessage
    //      id="app.requirement"
    //      defaultMessage="Requirement"
    //    />,
    //    width:"14%",
    //    dataIndex: "requirementName",
    //  },
     {
       //title: "Currency",
       title: <FormattedMessage
         id="app.jobId"
         defaultMessage="Job ID"
       />,
      dataIndex: "jobOrder",
      ...getColumnSearchProps('jobOrder'),
       width: "10%",
       render: (name, item, i) => {
        return {
          props: {
            // style: {
            //   background:
            //      this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
            //       ? "rgb(158 183 223)"
            //       : null,

            // },
          },
          children: (
            <>
              <Badge count={item.number} style={{ right: "1px" }}>
                <span             
                >

                  {`${item.jobOrder} `} &nbsp;


                </span>
              </Badge>
            </>
          ),
        };
       
      },
   
     },
     {
      title: <FormattedMessage
        id="app.role"
        defaultMessage="Role"
      />,
       dataIndex: "role",
       width: "13%",
    },

    
     {
      //title: "Currency",
      title: <FormattedMessage
        id="app.customer"
        defaultMessage="Customer"
      />,
      dataIndex: "customerName",
      ...getColumnSearchProps('customerName'),
       width: "16%",
    },
     {
        //title: "Currency",
        title: <FormattedMessage
          id="app.sponsor"
          defaultMessage="Sponsor"
        />,
  
        dataIndex: "sponserName",
        ...getColumnSearchProps('sponserName'),
         width: "15%",
      },
    //  {
    //    //title: "Start Date",
    //    title: <FormattedMessage
    //      id="app.positions"
    //      defaultMessage= "# Positions" 
    //    />,
 
    //    dataIndex: "number",
    //    width:"12%",
    //    //defaultSortOrder: "descend",
    //  //   sorter: (a, b) => {
    //  //     var nameA = a.startDate; // ignore upper and lowercase
    //  //     var nameB = b.startDate; // ignore upper and lowercase
    //  //     if (nameA < nameB) {
    //  //       return -1;
    //  //     }
    //  //     if (nameA > nameB) {
    //  //       return 1;
    //  //     }
   
    //  //     return 0;
    //  //   },
    //  //   render: (text, item) => {
    //  //     const startDate = dayjs(item.startDate).format("ll");
    //  //     return <span>{startDate}</span>;
    //  //   },
    //  },
    {
      //title: "Currency",
      title: <FormattedMessage
        id="app.created"
        defaultMessage="Created"
      />,

      dataIndex: "creationDate",
      // ...getColumnSearchProps('sponserName'),
       width: "10%",
       render: (text, item) => {
        const creationDate = dayjs(item.creationDate).format("ll");
        return <>
        {item.creationDate === null ? "No Data" :
          <span>
            {dayjs(item.creationDate).format("l")}
          </span>
        }
      </>
      },
    },
    {
      width: "4%",

render: (name, item, i) => {   
    console.log(item.offered);
  return {
    props: {
    
    },
    children: (
      <>
        <Tooltip title="Submitted">
      <Badge count={item.offered}  style={{ right: "1px" }}>
    <span
      style={{
        cursor: "pointer",
        fontSize: "1.3em",
        color:"black"
      }}
    >
      {/* <FontAwesomeIcon icon={solid('file-arrow-up')} /> */}
      <FileUploadIcon/>
     </span>
   
     </Badge>
     </Tooltip>
      </>
    )
  }

    
 
},
},
  //    {
  //           width: "3%",
      
  //     render: (name, item, i) => { 
  //       const drop=`${item.rejected
  //       }`
  // console.log("value",drop)         
  //       return (
  //         <>
  //          {/* <div  style ={{width:"20px",height:"20px",border:"1px solid red",borderRadius:"30px",
  //          backgroundColor:"red",
  //          color:"white",
  //          textAlign:"center",
  //          paddingTop:"0px"}}>{item.rejected}</div> */}
  //          <Badge count={item.drop} style={{ right: "1px" }}>
  //           <div
  //         style={{
  //           color:"red",
  //           fontSize: "1.6em",
  //         }}
  //         >
  //           <FontAwesomeIcon icon={solid('circle-chevron-down')} />
  //           </div>
  //           </Badge>
  //         </>
  //       );
  //     },
  //   },
  {
    width: "4%",

render: (name, item, i) => {   
  console.log(item.rejected);
return {
  props: {
  
  },
  children: (
    <>
      <Tooltip title="Dropped">
    <Badge count={item.rejected}  style={{ right: "1px" }}>
  <span
    style={{
      cursor: "pointer",
      fontSize: "1.3em",
      color:"red"
    }}
  >
     {/* <FontAwesomeIcon icon={solid('circle-chevron-down')} /> */}
     <ArrowCircleDownIcon/>
   </span>
   </Badge>
   </Tooltip>
    </>
  )
}

  

},
},
       {
      //title: "Proposal Amount",
      title: <FormattedMessage
        id="app.progress"
        defaultMessage="Progress"
      />,
      dataIndex: "selectedCandidate",
      width: "15%",
      
      render: (name, item, i) => {        
        return (
          <FlexContainer justifyContent="space-between">
          {item.stageList&&item.stageList.map((data)=>{
            return(
              <>
               <div>
               <Tooltip
                    title={data.stageName}
                >
                <Badge count={data.candidateNo} style={{ right: "1px" }}>  
               
                <svg
                
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  vertical-align="-webkit-baseline-middle" 
                >
                     <g>
                        <title>ram</title>
                        <rect
                            fill="#fff"
                            id="canvas_background"
                            height="19"
                            
                        width="23"
                        y="-1"
                        x="-1"
                        />
                        <g
                            display="none"
                            overflow="visible"
                            y="0"
                            x="0"
                            height="100%"
                            
                            width="100%"
                            id="canvasGrid"
                        >
                            <rect
                                fill="url(#gridpattern)"
                                stroke-width="0"
                                y="0"
                               
                                x="0"
                               
                                height="100%"
                                width="100%"
                            />
                        </g>
                    </g>
                    <g>
                    <title>{item.candidateNo}</title>
                        <path
                            id="svg_1"
                            d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                            stroke-width="0.5"
                            stroke="#000"
                            // value={item.candidateNo}
                            fill="#61ED9F"
                        />
                        {/* <path
                            stroke="#000"
                            id="svg_2"
                            // value={item.candidateNo}
                            d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                            stroke-width="0.5"
                            fill="red"
                        /> */}
                    </g>
                </svg>
                </Badge>
                </Tooltip>
            </div>
              </>
            )
          })}
          </FlexContainer>
        );
        
      },
    },
   

   
    {
      width: "4%",

render: (name, item, i) => {   
    console.log(item.closedPosition);
  return {
    props: {
    
    },
    children: (
      <>
        <Tooltip title="Selected">
      <Badge count={item.closedPosition}  style={{ right: "1px" }}>
    <span
      style={{
        cursor: "pointer",
        fontSize: "1.3em",
        color:"green"
      }}
    >
       {/* <FontAwesomeIcon icon={solid('graduation-cap')} /> */}
       <SchoolIcon/>
     </span>
     </Badge>
     </Tooltip>
      </>
    )
  }

    
 
},
},
    {
      width: "4%",

render: (name, item, i) => {   
    console.log(item.onBoardNo);
  return {
    props: {
    
    },
    children: (
      <>
          <Tooltip title="OnBoarded">
      <Badge count={item.onBoardNo}  style={{ right: "1px" }}>
    <span
      style={{
        cursor: "pointer",
        fontSize: "1.3em",
        color:"blue"
      }}
    >
       {/* <FontAwesomeIcon icon={solid('id-card-clip')} /> */}
       <BadgeIcon/>
     </span>
     </Badge>
     </Tooltip>
      </>
    )
  }

    
 
},
},
   

   

    // {
    //   title: "",
    //   // title: <FormattedMessage
    //   //   id="app.talent"
    //   //   defaultMessage="Talent"
    //   // />,
    //  // dataIndex: "candidatetList",
    //   width: "10%",

    //   render: (name, item, i) => {
    //     return (
    //       <>
    //        <FlexContainer justifyContect="space-evenly">
             
            
               
                  
    //               <Tooltip
    //               title="Edit"
    //           >
    //               <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
    //               <FontAwesomeIcon icon={solid('handshake')} />
    //                 </div>
    //                 </Tooltip>

                           
 
    //           <div>
    //           {/* {item.candidateNo}  */}
    //             </div>            
    //          </FlexContainer>
    //       </>
    //     );
    //   }
    
    //   // dataIndex: "openedPosition",
    //   // return (
    //   //   <SubTitle>
    //   //     <MultiAvatar
    //   //       primaryTitle={item.candidatetList && item.candidatetList.length&&item.candidatetList.firstName||""}
    //   //       imageId={item.imageId}
    //   //       imageURL={item.imageURL}
    //   //       imgWidth={"2.5em"}
    //   //       imgHeight={"2.5em"}
    //   //     />
    //   //   </SubTitle>
    //   // );
    
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
   const tableHeight = tab && tab.offsetHeight - 100;
 
   
 
   return (
     <>
       <StyledTable
         // rowSelection={rowSelection}
         
         // bordered
         rowKey="opportunityId"
         columns={columns}
         dataSource={
          props.tableDashboard2
         // [{Recruitment:"react",jobid:"1",sponsor:"anc",recruiter:"abc",candidate:"20",selectedCandidate:"5",listOfProgress:["21","25","3"]}]
         }
         onChange={onChange}
         // Loading={fetchingOpportunity || fetchingOpportunityError}
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
 const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
    userId: auth.userDetails.userId,
   user: auth.userDetails,
    role: auth.userDetails.role,
 //   recruiterList:opportunity.recruiterList,
 //   fetchingRecruiterList:opportunity.fetchingRecruiterList,
 //   fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
 //   fetchingOpportunity: opportunity.fetchingOpportunity,
 //   fetchingOpportunityError: opportunity.fetchingOpportunityError,
 //   opportunityByUserId: opportunity.opportunityByUserId,
 //   updateOpportunityModal: opportunity.updateOpportunityModal,
    recruiterId:auth.userDetails.userId,
 tableDashboard2:dashboard.tableDashboard2
 });
 const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
     {
     //   getOpportunityListByUserId,
     getDashboardTable2
     //   getRecruiterList,
     //   handleUpdateOpportunityModal,
     //   setEditOpportunity,
     //   deleteOpportunityData,
     },
     dispatch
   );
 export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable2);
 