import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import {
  Tooltip,

} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { FlexContainer } from "../../Components/UI/Layout";
import { getAllRequirementTable,emptyRequirement } from "../Requirement/RequirementAction";
import { MultiAvatar } from "../../Components/UI/Elements";
import { StyledTable } from "../../Components/UI/Antd";

import RequirementDetailView from "../Opportunity/Child/OpportunityTable/RequirementDetailView.jsx";

const AllRequirementTable = ({
  getAllRequirementTable,
  requirementTable,
  getCandidateById,
  emptyRequirement,
  handleSponsorModal,
  getTopicsByCandidateId,
  fetchingAllRequirementTable,
  auth,
  getContactDocument,
  currentUser,
  orgId
}) => {
  const [tableHeight, setTableHeight] = useState(0);
  const [page, setPage] = useState(0);
  const [subTableVisible, setSubTableVisible] = useState(false);
  const [recruitmentId, setRecruitmentId] = useState('');
  const [editModal, setEditModal] = useState(false);

  const handleEditModal = (data) => {
    setEditModal(data);
  };

  const handleError = (recruitmentId, profileId) => {
    debugger;
    setRecruitmentId(recruitmentId);
    // Assuming `handleSponsorModal` and other relevant functions are props
    handleSponsorModal(true);
  };

  const handleIconClick = (profileId, candidateId, stageList, recruitmentId) => {
    debugger;
    // Assuming these functions are props
    getCandidateById(candidateId);
    getTopicsByCandidateId(candidateId);
    // getContactDocument(contactId);
    setSubTableVisible(true);
    setRecruitmentId(recruitmentId);
  };

  const handleCloseIconClick = () => {
    setSubTableVisible(false);
  };


  useEffect(() => {


    setPage(page + 1);
    // props.shareCandidatePermission(page);
    getAllRequirementTable(orgId, page);
        const tab = document.querySelector(".ant-layout-sider-children");
    const height = tab ? tab.offsetHeight - 100 : 0;
    setTableHeight(height);
  }, []);
  useEffect(() => {
    return () => emptyRequirement();
  }, []);
  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      getAllRequirementTable(
        currentUser ? currentUser : orgId,
        page
      );
      // }
      // props.getCandidatePagination(props.userId,page);
    }, 100);
  };

  // useEffect(() => {
  //   getAllRequirementTable(auth.userDetails.organizationId);
  //   const tab = document.querySelector(".ant-layout-sider-children");
  //   const height = tab ? tab.offsetHeight - 100 : 0;
  //   setTableHeight(height);
  // }, [getAllRequirementTable, auth.userDetails.organizationId]);

  const columns = [
    {
      title: "",
      width: "2%",
      // render: (name, item, i) => {
      //   const data = ` Profile ID : ${item.profileId}  Recruitment ID : ${item.recruitmentId}`
      //   return {
      //     props: {
      //       style: {
      //         background:
      //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //             ? "rgb(158 183 223)"
      //             : null,

      //       },
      //     },
      //     children: (
      //       <Tooltip
      //       // className="ant-tooltip-inner"
      //       // placement="rightTop" 
      //       overlayStyle={{ maxWidth: '300px', }}

      //       title={data}
      //     >
      //       <span
      //         // onClick={() => handleReasonOfDelete(item.orderId)}
      //         style={{
      //           // color:
      //           //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
      //           cursor: "pointer",
      //         }}
      //       >
      //         <i class="fa fa-info-circle"></i>
      //       </span>
      //     </Tooltip>
      //     ),
      //   };
       
      // },
    },
    {
      title: "Job ID",
      width: "9%",
    //   dataIndex: "jobOrder",
      render: (name, item, i) => {
         
        return (
          <>
          <RequirementDetailView
            opportunityId={item.opportunityId}
            jobOrder={item.jobOrder}
          />
          
          </>
        );
      },
      // render: (name, item, i) => {
      //   return {
      //     props: {
      //       style: {
      //         background:
      //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //             ? "rgb(158 183 223)"
      //             : null,

      //       },
      //     },
      //     children: (
      //       <>
      //         <Badge count={item.number} style={{ right: "1px" }}>
      //           <span             
      //           >

      //             {`${item.jobOrder} `} &nbsp;


      //           </span>
      //         </Badge>
      //       </>
      //     ),
      //   };
       
      // },

    },

    // {
    //   title:"",
    //     width: "8%",
    //   dataIndex:"number",

    // },
    {
      //title: "Requirement",
      title: <FormattedMessage
        id="app.requirementName"
        defaultMessage="Requirement"
      />,
      dataIndex: "requirementName",
      width: "13%",
    
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "9%",
 

    },
    {
      title: "Customer",
      dataIndex: "customerName",
      width: "9%",
 

    },
   

    {
      title:"Created",
      width: "7%",
       dataIndex: "recruitOwner",
       render: (text, item) => {
       return <>
       {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
       <Tooltip title={item.recruitOwner}>
          <span>
            <MultiAvatar
              primaryTitle={item.recruitOwner}
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
      title: "Recruiter",
      width: "7%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                 subTableVisible&&recruitmentId === item.recruitmentId
                  ? "rgb(158 183 223)"
                  : null,

            },
          },

          children: 
          
            <>
      
            
             <FlexContainer justifyContect="space-evenly">
             {item.recruiterList && item.recruiterList.map((item, i) => {
               return (
                <Tooltip
                title={item.fullName}
             >
                <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
              <MultiAvatar
               primaryTitle={item.fullName||""}
                // imageId={item.imageId}
                // imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
              />
              </div>
            </Tooltip>
               );
          })} 
          </FlexContainer>
          </>
          
            
         
        };
      
      },
    },
    {
      title: "On",
      width: "10%",
      dataIndex: "creationDate",
      render: (text, item) => {
        const creationDate = dayjs(item.creationDate).format("ll");

        return {
          props: {
            style: {
              background:
                 subTableVisible&&recruitmentId === item.recruitmentId
                  ? "rgb(158 183 223)"
                  : null,

            },
          },

          children: <span>
            
         {creationDate}
          </span>,
        };
      
        
      },
    },





    {
      //title: "Start",
      title: <FormattedMessage
        id="app.processName"
        defaultMessage="Start"
      />,
      width: "9%",
      render: (name, item, i) => {
        console.log(item);
        return {
          props: {
            style: {
              background:
                 subTableVisible&&recruitmentId === item.recruitmentId
                  ? "rgb(158 183 223)"
                  : null,

            },
          },

          children:<span>{dayjs(item.avilableDate).format("ll")}</span>
        };
      
      },
      sorter: (a, b) => {
        if (a.avilableDate < b.avilableDate) {
          return -1;
        }
        if (a.avilableDate > b.avilableDate) {
          return 1;
        }
        return 0;
      },
    },
    {
      title:"Duration",
      width: "8%",
      render: (text, item) => {
        //const getDate = (date) => dayjs(date, 'DD/MM/YYYY').startOf('month')
const diff = Math.abs(dayjs(item.availableDate).diff(dayjs(item.endDate), 'months'));
const date=diff+1
       // const availableDate = dayjs(item.availableDate).subtract(item.endDate);
        return <>
        {/* {item.availableDate === null ? "No Data" : */}
          <span>
            {/* {dayjs(item.availableDate).subtract(item.endDate).month()} */}
            {date} months
          </span>
        {/* } */}
      </>
      },
      
    },
    {
      //title: "Rate/hr",
      title: <FormattedMessage
        id="app.billing"
        defaultMessage="Billing"
      />,
      dataIndex: "billing",
      width: "8%",
        defaultSortOrder: "descend",
      sorter: (a, b) => a.billing - b.billing,
      render: (name, item, i) => {
        console.log(item);
        return {
          props: {
            style: {
              background:
                 subTableVisible&&recruitmentId === item.recruitmentId
                  ? "rgb(158 183 223)"
                  : null,

            },
          },

          children:<span>{item.billing} {item.currency}</span>
        };
      
      },
    },
   
  
   
   





    {
      title: "Talent",
      dataIndex: "candidatetList",
      width: "12%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                 subTableVisible&&recruitmentId === item.recruitmentId
                  ? "rgb(158 183 223)"
                  : null,

            },
          },
          children: (
            <span>
          
          
             <FlexContainer justifyContect="space-evenly">
              {item.candidatetList && item.candidatetList.map((candidate, i) => {
                console.log(candidate)
                return (
                  
                  <Tooltip
                  title={candidate.fullName}
              >
                  <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
                  //  onClick={() => {
                  //   this.handleClickCandidateName(item.recruitmentId)
                  //   this.props.getCandidateRequirement(
                  //      item.recruitmentId, 
  
                  //   );
                  //   }}
               
                  >
                    
                      <MultiAvatar
                         primaryTitle={candidate.fullName||""}
                        // imageId={item.imageId}
                        // imageURL={item.imageURL}
                        imgWidth={"30"}
                        imgHeight={"30"}
                      />
                    </div>
                     </Tooltip>

                );                 
              })} 
              <div
              // style={{ 
              //   margin: "2px", 
              //   borderRadius: "50%",
              //   cursor:"pointer" ,
              //   background:
              //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
              //     ? "rgb(158 183 223)"
              //     : null,
            
              // onClick={() => {
              //   this.handleClickCandidateName(item.recruitmentId)
              //   this.props.getCandidateRequirement(
              //      item.recruitmentId, 

              //   );
              //   }}
              >   
             {/* {item.candidateNo}  */}
             </div>           
             </FlexContainer>
          </span>
          ),
        };
      },
     },

    {
      //title: "Sponsor",
      title: <FormattedMessage
        id="app.sponserName"
        defaultMessage="Sponsor"
      />,
      dataIndex: "sponserName",
      width: "7%",
     
    },
  
  
   
   

   

  ];

  return (
    <>
       <InfiniteScroll
        dataLength={requirementTable.length}
        next={handleLoadMore}
        hasMore={true}
        // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // height={652}
      >
         <StyledTable
        rowKey="profileId"
        dataSource={requirementTable}
        loading={fetchingAllRequirementTable}
        scroll={{ y: tableHeight }}
        columns={columns}
        pagination={false}
      />
      </InfiniteScroll>
 
    </>
  );
};

const mapStateToProps = ({ auth, requirement }) => ({
  auth,
  orgId: auth.userDetails.organizationId,
  requirementTable: requirement.requirementTable,
  fetchingAllRequirementTable: requirement.fetchingAllRequirementTable,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllRequirementTable,
      emptyRequirement
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);





































// import React, { Component, lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";

// import {getAllRequirementTable} from "../Requirement/RequirementAction"


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import {
//   MultiAvatar,
//   Spacer,
//   SubTitle,
//   StyledLabel,
// } from "../../Components/UI/Elements";

// import { Link } from "../../Components/Common";
// import {
//   StyledTable,
//   StyledPopconfirm,
//   StyledModal,
// } from "../../Components/UI/Antd";
// import { FlexContainer } from "../../Components/UI/Layout";
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';




// import { BundleLoader } from "../../Components/Placeholder";
// import {

//   Popconfirm,
//   Tooltip,
//   Dropdown,
//   Menu,
//   Progress,
//   Table, Input, Button,
//   message,
//   Icon,
//   Badge
// } from "antd";

// // import { Table, Input, Button, Icon } from 'antd';
// import Highlighter from 'react-highlight-words';


// import dayjs from "dayjs";
// import { CurrencySymbol } from "../../Components/Common";


// import { Suspense } from "react";
// import { elipsize } from "../../Helpers/Function/Functions";



// import { map } from "lodash";

// // const CandidateDetailsView =lazy(()=>import("../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailsView"));
// class AllRequirementTable extends Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,
//       show1:false,
//       profileId: "",
//       contactId: "",
//       candidateId: "",
//       editModal: false,
//       stageList: [],
//       recruitmentId: "",
//       skillSetData: "",
//       candidatePostData: {},
//       searchText: '',
//       searchedColumn: '',
//       subTableVisible: false
//     };
//   }

//   handleClickCandidateName = (recruitmentId) => {
//     this.setState({
//        subTableVisible: !this.state.subTableVisible,
//        recruitmentId:recruitmentId
//       })
//   };
//   handleCandidateDataSet = (data) => {
//     this.setState({ candidatePostData: data })
//   }
//   handleSkillsetChoose = (data) => {
//     this.setState({ skillSetData: data })
//   }
// //   handleCallback = () => {
// //     if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
// //       this.props.getRecruiterRequiremnt(this.props.recruiterId);
// //     } else {
// //       this.props.getRecruitByOpportunityId(this.props.opportunityId);

// //     }
// //     // this.props.getRecruitByOpportunityId(this.props.opportunityId);
// //   };
// //   handleCopy = (
// //     recruitmentId,
// //     recruitmentProcessId,
// //     stageId,
// //     opportunityId
// //   ) => {
// //     const value = {
// //       recruitmentId: recruitmentId,
// //       recruitmentProcessId: recruitmentProcessId,
// //       stageId: stageId,
// //       opportunityId: opportunityId,
// //     };
// //     this.props.addRecruitProProfile(value, this.handleCallback);
// //   };

//   handleEditModal = (data) => {
//     this.setState({ editModal: data });
//   };
 
//   // handleRecruitertModal = (data) => {
//   //   this.setState({ recruiterModal: data });
//   // };
//   handleError = (recruitmentId, profileId) => {
//     debugger;
//     this.setState({ recruitmentId: recruitmentId, profileId: profileId });
//     this.props.handleSponsorModal(true);
//     // message.error("Select sponser");
//     // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
//   };
//   handleIconClick = (profileId, candidateId, stageList,recruitmentId) => {
//     debugger;
//     this.setState({ show: true, profileId, candidateId, stageList,recruitmentId });
//     // this.props.getCandidateById(candidateId);
//     // this.props.getTopicsByCandidateId(candidateId);
//     // this.props.getContactDocument(contactId);
//   };

//   // handleDeleteIconClick = (profileId, ) => {
//   //   debugger;
//   //   this.setState({  profileId, });
//   //  this.props.deleteRequirementData(this.props.recruitmentId);
//   //   // this.props.getTopicsByCandidateId(candidateId);
//   //   // this.props.getContactDocument(contactId);
//   // };


//   handleCloseIconClick = () => {
//     this.setState({ show: false });
//   };

//   handleReasonOfDelete() {
//     this.setshow(false);
//     this.setshowHis(false);
//     this.setshowFeed(false);
//     this.setshowPayment(false);
//     this.setshowRes(true);
//     // setorderId(orderId);
//   }

//   componentDidMount() {
//   this.props.getAllRequirementTable(this.props.orgId)
   
//   }

// //   handleCallBack = (status, opportunityId, profileId) => {
// //     if (status === "success") {
// //       // message.success("Candidate Selected");
// //       this.props.emailSendRecruitment({
// //         opportunityId: opportunityId,
// //         userId: this.props.userId,
// //         profileId: profileId,
// //       });
// //     }
// //   };


//   render() {
   
// console.log(this.props.requirementTable)
    

//     // console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
   
    
//     const columns = [
//       {
//         title: "",
//         width: "2%",
//         // render: (name, item, i) => {
//         //   const data = ` Profile ID : ${item.profileId}  Recruitment ID : ${item.recruitmentId}`
//         //   return {
//         //     props: {
//         //       style: {
//         //         background:
//         //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//         //             ? "rgb(158 183 223)"
//         //             : null,

//         //       },
//         //     },
//         //     children: (
//         //       <Tooltip
//         //       // className="ant-tooltip-inner"
//         //       // placement="rightTop" 
//         //       overlayStyle={{ maxWidth: '300px', }}

//         //       title={data}
//         //     >
//         //       <span
//         //         // onClick={() => handleReasonOfDelete(item.orderId)}
//         //         style={{
//         //           // color:
//         //           //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
//         //           cursor: "pointer",
//         //         }}
//         //       >
//         //         <i class="fa fa-info-circle"></i>
//         //       </span>
//         //     </Tooltip>
//         //     ),
//         //   };
         
//         // },
//       },
//       {
//         title: "Job ID",
//         width: "9%",
//         dataIndex: "jobOrder",
//         // render: (name, item, i) => {
//         //   return {
//         //     props: {
//         //       style: {
//         //         background:
//         //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//         //             ? "rgb(158 183 223)"
//         //             : null,

//         //       },
//         //     },
//         //     children: (
//         //       <>
//         //         <Badge count={item.number} style={{ right: "1px" }}>
//         //           <span             
//         //           >

//         //             {`${item.jobOrder} `} &nbsp;


//         //           </span>
//         //         </Badge>
//         //       </>
//         //     ),
//         //   };
         
//         // },

//       },

//       // {
//       //   title:"",
//       //     width: "8%",
//       //   dataIndex:"number",

//       // },
//       {
//         //title: "Requirement",
//         title: <FormattedMessage
//           id="app.requirementName"
//           defaultMessage="Requirement"
//         />,
//         dataIndex: "requirementName",
//         width: "13%",
      
//       },
//       {
//         title: "Category",
//         dataIndex: "category",
//         width: "9%",
   

//       },
//       {
//         title: "Customer",
//         dataIndex: "customerName",
//         width: "9%",
   

//       },
     

//       {
//         title:"Created",
//         width: "7%",
//          dataIndex: "recruitOwner",
//          render: (text, item) => {
//          return <>
//          {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
//          <Tooltip title={item.recruitOwner}>
//             <span>
//               <MultiAvatar
//                 primaryTitle={item.recruitOwner}
//                 // imageId={item.ownerImageId}
//                 //  imageURL={item.imageURL}
//                 imgWidth={"2.1em"}
//                 imgHeight={"2.1em"}
//               />
//               </span>
//              </Tooltip>      
         
//          </>
//         },
         
//       },
//       {
//         title: "Recruiter",
//         width: "7%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: 
            
//               <>
        
              
//                <FlexContainer justifyContect="space-evenly">
//                {item.recruiterList && item.recruiterList.map((item, i) => {
//                  return (
//                   <Tooltip
//                   title={item.fullName}
//                >
//                   <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
//                 <MultiAvatar
//                  primaryTitle={item.fullName||""}
//                   // imageId={item.imageId}
//                   // imageURL={item.imageURL}
//                   imgWidth={"2.1em"}
//                   imgHeight={"2.1em"}
//                 />
//                 </div>
//               </Tooltip>
//                  );
//             })} 
//             </FlexContainer>
//             </>
            
              
           
//           };
        
//         },
//       },
//       {
//         title: "On",
//         width: "10%",
//         dataIndex: "creationDate",
//         render: (text, item) => {
//           const creationDate = dayjs(item.creationDate).format("ll");

//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: <span>
              
//            {creationDate}
//             </span>,
//           };
        
          
//         },
//       },





//       {
//         //title: "Start",
//         title: <FormattedMessage
//           id="app.processName"
//           defaultMessage="Start"
//         />,
//         width: "9%",
//         render: (name, item, i) => {
//           console.log(item);
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children:<span>{dayjs(item.avilableDate).format("ll")}</span>
//           };
        
//         },
//         sorter: (a, b) => {
//           if (a.avilableDate < b.avilableDate) {
//             return -1;
//           }
//           if (a.avilableDate > b.avilableDate) {
//             return 1;
//           }
//           return 0;
//         },
//       },
//       {
//         title:"Duration",
//         width: "8%",
//         render: (text, item) => {
//           //const getDate = (date) => dayjs(date, 'DD/MM/YYYY').startOf('month')
// const diff = Math.abs(dayjs(item.availableDate).diff(dayjs(item.endDate), 'months'));
// const date=diff+1
//          // const availableDate = dayjs(item.availableDate).subtract(item.endDate);
//           return <>
//           {/* {item.availableDate === null ? "No Data" : */}
//             <span>
//               {/* {dayjs(item.availableDate).subtract(item.endDate).month()} */}
//               {date} months
//             </span>
//           {/* } */}
//         </>
//         },
        
//       },
//       {
//         //title: "Rate/hr",
//         title: <FormattedMessage
//           id="app.billing"
//           defaultMessage="Billing"
//         />,
//         dataIndex: "billing",
//         width: "8%",
//           defaultSortOrder: "descend",
//         sorter: (a, b) => a.billing - b.billing,
//         render: (name, item, i) => {
//           console.log(item);
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children:<span>{item.billing} {item.currency}</span>
//           };
        
//         },
//       },
     
    
     
     

  



//       {
//         title: "Talent",
//         dataIndex: "candidatetList",
//         width: "12%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <span>
            
            
//                <FlexContainer justifyContect="space-evenly">
//                 {item.candidatetList && item.candidatetList.map((candidate, i) => {
//                   console.log(candidate)
//                   return (
                    
//                     <Tooltip
//                     title={candidate.fullName}
//                 >
//                     <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
//                     //  onClick={() => {
//                     //   this.handleClickCandidateName(item.recruitmentId)
//                     //   this.props.getCandidateRequirement(
//                     //      item.recruitmentId, 
    
//                     //   );
//                     //   }}
                 
//                     >
                      
//                         <MultiAvatar
//                            primaryTitle={candidate.fullName||""}
//                           // imageId={item.imageId}
//                           // imageURL={item.imageURL}
//                           imgWidth={"30"}
//                           imgHeight={"30"}
//                         />
//                       </div>
//                        </Tooltip>
  
//                   );                 
//                 })} 
//                 <div
//                 // style={{ 
//                 //   margin: "2px", 
//                 //   borderRadius: "50%",
//                 //   cursor:"pointer" ,
//                 //   background:
//                 //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                 //     ? "rgb(158 183 223)"
//                 //     : null,
              
//                 // onClick={() => {
//                 //   this.handleClickCandidateName(item.recruitmentId)
//                 //   this.props.getCandidateRequirement(
//                 //      item.recruitmentId, 

//                 //   );
//                 //   }}
//                 >   
//                {/* {item.candidateNo}  */}
//                </div>           
//                </FlexContainer>
//             </span>
//             ),
//           };
//         },
//        },

//       {
//         //title: "Sponsor",
//         title: <FormattedMessage
//           id="app.sponserName"
//           defaultMessage="Sponsor"
//         />,
//         dataIndex: "sponserName",
//         width: "7%",
       
//       },
    
    
     
     

     

//     ];
   
//     const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight - 100;
//     return (
//       <>
//         {/* {callsListByOpportunityId && ( */}
//         <StyledTable
//           // rowKey={(record) =>record.profileId}
//           rowKey="profileId"
//           dataSource={
//             this.props.requirementTable
             
//           }

//            loading={
//             this.props.fetchingAllRequirementTable
//           }
         
//         //   scroll={{ y: 220 }}
//           scroll={{ y: tableHeight }}
//           columns={columns}
//           pagination={false}

     
//         />
    
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth, requirement }) => ({
//   user: auth.userDetails,
//   requirementTable:requirement.requirementTable,
//   userId:auth.userDetails.userId,
//   orgId:auth.userDetails.organizationId,
//   fetchingAllRequirementTable:requirement.fetchingAllRequirementTable

// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getAllRequirementTable
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);
