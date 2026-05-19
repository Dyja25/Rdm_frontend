import React,{useEffect,Component} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Suspense } from "react";
import {
  getCandidateById,
  getTopicsByCandidateId,
  handleRecruiterDrawerModal,
  //   getContactDocument,
} from "../../../../../Candidate/CandidateAction";
import {deleteSubtableData} from "../../../../OpportunityAction.js"
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "../../../../../../Components/Common";
import { DeleteOutlined, EditOutlined  } from "@ant-design/icons";
import dayjs from "dayjs";
import AddCandidateDateModal from "../Recruitment/AddCandidateDateModal.jsx"

import RecruitmentStages from "./RecruitmentStages.jsx";
import {

  Popconfirm,
  Tooltip,
  Dropdown,
  Menu,
  Progress,

  Table, Input, Button,
  message,

  DatePicker,
  Badge
} from "antd";
import { bindActionCreators } from "redux";

import { StyledPopconfirm, StyledTable } from "../../../../../../Components/UI/Antd";
 import {getCandidateRequirement,LinkStatusRecruit,LinkStageRecruit,handleCandidateDateModal} from "../../../../OpportunityAction"
import { CheckCircleTwoTone, CompassOutlined, EyeInvisibleTwoTone, EyeOutlined, StopTwoTone } from "@ant-design/icons";
import AddRecruiterDrawerModal from "./child/AddRecruiterDrawerModal.jsx";
import { Person2Outlined } from "@mui/icons-material";

class SubTableClickCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profileId: "",
      candidateId: "",
      currentcandidateIdId:"",
      setCurrentcandidateIdId:""
      // contactId: "",
      // candidateId: "",
      // editModal: false,
      // stageList: [],
      // recruitmentId: "",
      // skillSetData: "",
      // candidatePostData: {},
      // searchText: '',
      // searchedColumn: '',
      // subTableVisible: false
    };
  }

  handleSetCurrentcandidateId(candidateId) {
    this.setState({ setCurrentcandidateId:candidateId,  });
    // setCurrentcandidateId(candidateId);
    console.log("frt1",candidateId);
  }

  handleIconClick = (profileId, candidateId, stageList,candidateName) => {
    debugger;
    this.setState({ show: true, profileId, candidateId, stageList,candidateName });
    this.props.getCandidateById(candidateId);
    this.props.getTopicsByCandidateId(candidateId);
    // this.props.getContactDocument(contactId);
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
  // useEffect(() => {
  //   props.getCandidateRequirement(props.recruitmentId);
   
  // }, []);
  render() {
    console.log("Profile",this.state.profileId)
    console.log(this.props.candidateRequirement.profileId)
    const dateFormat = "MM/DD/YYYY";
  const {
    candidateRequirement:{candidateId},
  } = this.props;
  const columns = [
    { title: "Talent",
       dataIndex:"candidateName",
       render(name, item, ) {
        return (
          <>
           <Link
              toUrl={`/candidate/${item.candidateId}`}
              title={`${item.candidateName || ""} `}
            />
            {/* <Link
              to={`candidate/${item.candidateId}`}
              title={`${item.candidateName}`}
            /> */}
          </>
        );
      }
   },
    { title: "",
     //  dataIndex:"webSiteInd",
       width: "4%",
       render(name, item, ) {
        return (
          <>
           {item.webSiteInd && (
          <Tooltip title="Website">
           
              <LanguageIcon className="!text-blue-600" />
            
            </Tooltip>
            )}
          </>
        );
      }
   },
   {
     title:"Recruit Owner",
     dataIndex:"recruitOwner",
   },
    { title: "Cost" ,
    dataIndex:"candidateBilling",
    render: (name, item, i) => {        
      return (
        <>
          {item.candidateBilling} {item.currency} 
         
        </>
      );
    },

  },

  {
    title:"Availabillity",
    dataIndex:"avilableDate",
  },
    {
        title: "Stages",
        // title: <FormattedMessage
        //   id="app.callType"
        //   defaultMessage="Stages"
        // />,
        dataIndex: "callType",
        width: "6%",
        render: (name, item, i) => {
          var findProbability = 0;
          item.stageList.forEach((element) => {
            if (element.stageId === item.stageId) {
              findProbability = element.probability;
            }
          });
          return (
            <span>
              <Dropdown
                overlay={
                  <div>
                    <Menu mode="horizontal">
                      <Menu.Item
                        style={{
                          paddingLeft: 5,
                          paddingRight: 5,
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <RecruitmentStages
                          rec={item}
                          stageId={item.stageId}
                          candidateName={item.candidateName}
                          approveInd={item.approveInd}
                          rejectInd={item.rejectInd}
                          stageClick={(stageId) => {
                            this.props.LinkStageRecruit(
                              {
                                opportunityId: this.props.opportunityId,
                                stageId: stageId,
                                recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },
                              // this.props.emailSendStage({
                              //   opportunityId: item.opportunityId,
                              //   userId: this.props.userId,
                              //   profileId: item.profileId,
                              //   stageId: stageId,
                              //   candidateId: item.contactId,
                              // })
                            );
                          }}
                        />{" "}
                      </Menu.Item>
                    </Menu>
                  </div>
                }
                trigger={["click"]}
              >
                <Tooltip title={item.stageName}>
                  {" "}
                  <Progress
                    type="circle"
                    style={{ cursor: "pointer" }}
                    percent={findProbability}
                    width={30}
                    strokeColor={"#005075"}
                  />
                </Tooltip>
              </Dropdown>
            </span>
          );
        },
       },
    {
        title: "",
        dataIndex: "callType",
        width: "6%",
        render: (name, item, i) => {
          return (
            <span>
              {/* {item.candidateName ? ( */}
                <>
                  {item.approveInd ? (
                    <>
                      <Tooltip //title={"Offer rolled out"}
                        title={<FormattedMessage
                          id="app.selected"
                          defaultMessage="Selected"
                        />}

                      >
                        <CheckCircleTwoTone
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={140}
                          style={{ fontSize: "1.2em", }}
                        />
                      </Tooltip>
                    </>
                  ) : item.rejectInd ? (
                    <>
                      <Tooltip title={"Dropped"}>
                        {" "}
                        <StopTwoTone
                          type="stop"
                          theme="twoTone"
                          twoToneColor="red"
                          size={140}
                          style={{ fontSize: "1.2em", marginLeft: "0.875em" }}
                        />
                      </Tooltip>
                    </>
                  ) : (

                    <>


                      <Tooltip //title={"Offer"}
                        title={<FormattedMessage
                          id="app.select"
                          defaultMessage="Select"
                        />}

                      >
                        <CheckCircleTwoTone
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={140}
                          style={{ fontSize: "1.2em" }}
                          onClick={() => {
                            this.props.LinkStatusRecruit(
                              {
                                approveInd: true,
                                opportunityId: item.opportunityId,
                                candidateId: item.candidateId,
                                // stageId: item.stageId,
                                // recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },

                              // (data) =>
                              //   this.handleCallBack(
                              //     data,

                              //     item.opportunityId,
                              //     item.profileId
                              //   )
                            );
                          }}
                        />
                      </Tooltip>

                      &nbsp; &nbsp;
                      <Tooltip //title={"Drop"}
                        title={<FormattedMessage
                          id="app.drop"
                          defaultMessage="Drop"
                        />}

                      >
                        <StopTwoTone
                          type="stop"
                          theme="twoTone"
                          twoToneColor="red"
                          size={140}
                          style={{ fontSize: "1.2em" }}
                          onClick={() => {
                            this.props.LinkStatusRecruit(
                              {
                                rejectInd: true,
                                opportunityId: item.opportunityId,
                                // stageId: item.stageId,
                                candidateId: item.candidateId,
                                // recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },
                              // (data) =>
                              //   this.handleCallBack(
                              //     data,

                              //     item.opportunityId,
                              //     item.profileId
                              //   )
                            );
                          }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              {/* ) : null} */}




            </span>


          );

        },

     },
     {
      title: "",
      dataIndex: "callType",
      width: "2%",
      render: (name, item, i) => {
        const close =
          this.state.show === true && this.state.profileId === item.profileId;

        return (
          <>
            {/* {item.candidateName ? ( */}
              <>
                {close ? (
                  // <Tooltip //title="Close Details"
                  //   title={<FormattedMessage
                  //     id="app.closedetails"
                  //     defaultMessage="Close Details"
                  //   />}
                  // >
                    <EyeInvisibleTwoTone
                      // type="eye-invisible"
                      onClick={() => this.handleCloseIconClick()}
                      style={{
                        fontSize: "1.125em",
                        color:
                          this.state.show === true &&
                          this.state.profileId === item.profileId &&
                          "#1890ff",
                      }}
                      size="30"
                    />
                  // </Tooltip>
                ) : (
                  <>
                    <Tooltip //title="Access Details"
                      title={<FormattedMessage
                        id="app.accessdetails"
                        defaultMessage="Access Details"
                      />}
                    >
                      <EyeOutlined
                        type="eye"
                        // onClick={() =>
                        //   this.handleIconClick(
                        //     item.profileId,
                        //     item.candidateId,
                        //     item.stageList
                        //   )
                        // }
                          onClick={() =>{
                          this.props.handleRecruiterDrawerModal(  true );
                          this.handleIconClick(
                                item.profileId,
                                item.candidateId,
                                item.stageList,
                                item.candidateName
                              )
                        }}
                        
                        style={{
                          fontSize: "1.125em",
                          color:
                            this.state.show === true &&
                            this.state.profileId === item.profileId &&
                            "#1890ff",
                        }}
                        size="30"
                      />
                    </Tooltip>
                  </>
                )}
              </>
            {/* ) : ( */}
              <></>
            {/* )} */}
          </>
        );
      },
    },

  //  {
  //       title: "OnBoard",
  //       dataIndex: "callType",
  //       width: "7%",
  //       render: (text, item) => {
  //         return (
  //           <>
  //             <RecruitmentSwitch
  //               contactId={item.contactId}
  //               profileId={item.profileId}
  //               opportunityId={item.opportunityId}
  //               recruitmentId={item.recruitmentId}
  //               candidateInd={item.candidateInd}
  //               approveInd={item.approveInd}
  //               rejectInd={item.rejectInd}
  //             />
    
  //           </>
  //         );
  //       },
  //     },
  {
    title: "",
    width: "2%",
    render: (name, item, i) => {
      return (
        <>
           {item.approveInd===true ? (
        
           <span
            style={{ 
              cursor: "pointer",
              color:
              item.onboardInd===true&&"blue" 
            }}
            onClick={() => {
              this.props.handleCandidateDateModal(true);
              this.handleIconClick(
                item.profileId,
                item.candidateId
                
              )
              

            }}
            >
             {/* <FontAwesomeIcon icon={solid("person-booth")}/> */}
             <Person2Outlined/>
            </span>
            
            ) : null}
          
          
            {/* <AddCandidateDateModal
                handleCandidateDateModal={this.props.handleCandidateDateModal}
                   profileId={item.profileId}
                addCandidateDateModal={this.props.addCandidateDateModal}
               /> */}
    
          
        
        </>
               
      );
    },
  },

    { 
      title: "OnBoardDate" ,
      dataIndex:"onboardDate",
      render: (text, item) => {
        const onboardDate = dayjs(item.onboardDate).format("ll");
        return <>
        {item.onboardDate === null ? "No Data" :
          <span>
            {dayjs(item.onboardDate).format("l")}
          </span>
        }
      </>
      },

  },
   
    {
           title: "",
           dataIndex: "id",
           width: "2%",
           render: (name, item, i) => {
             return {
              //  props: {
              //    style: {
              //      background:
              //        this.state.subTableVisible &&
              //        this.state.recruitmentId === item.recruitmentId
              //          ? "rgb(158 183 223)"
              //          : null,
              //    },
              //  },
               children: (
                
                 <StyledPopconfirm
                   title="Do you want to delete?"
                   onConfirm={() =>
                     this.props.deleteSubtableData(item.profileId)
                   }
                 >
                  
                   {/* {this.props.user.userType !== "USER" &&
                     this.props.user.department !== "Recruiter" && ( */}
                     {item.onboardInd !== true && (
                       <DeleteOutlined
                       type="delete"
                       style={{ cursor: "pointer", color: "red" }}
                     />
                       )}
                     {/* )} */}
                 </StyledPopconfirm>
             
               ),
             };
           },
         },
   
    // { title: "doc icon" },
    // { title: "employement icon" },
    // { title: "Training icon" }
  ]
  return (
    <>
    <StyledTable
       rowKey="talentId"
      scroll={{ y: 220 }}
      pagination={false}
      columns={columns}
      dataSource={this.props.candidateRequirement}

    />
   
   <Suspense fallback={"Loading..."}>
           <AddCandidateDateModal
   handleCandidateDateModal={this.props.handleCandidateDateModal}
    candidateId={this.state.candidateId}
      // candidate={this.props.candidate}
      profileId={this.state.profileId}
   addCandidateDateModal={this.props.addCandidateDateModal}
  />
  </Suspense>
  {/* {this.state.show && (
    <RecruitmentDetails
      candidateId={this.state.candidateId}
      candidate={this.props.candidate}
      profileId={this.state.profileId}
      stageList={this.state.stageList}
    />
  )} */}
   {this.state.show && (
    <AddRecruiterDrawerModal
    handleRecruiterDrawerModal={this.props.handleRecruiterDrawerModal}
    addDrawerRecruiterModal={this.props.addDrawerRecruiterModal}
      candidateId={this.state.candidateId}
      candidate={this.props.candidate}
      profileId={this.state.profileId}
      stageList={this.state.stageList}
      candidateName={this.state.candidateName}
    />
  )}
 
  </> 
  );
  
}
}
const mapStateToProps = ({ auth, team, candidate,opportunity }) => ({
  topicsByCandidateId: candidate.topicsByCandidateId,
  candidate: candidate.candidate,
  addDrawerRecruiterModal:candidate.addDrawerRecruiterModal,
  candidateRequirement:opportunity.candidateRequirement,
  addCandidateDateModal:opportunity.addCandidateDateModal
  // recruitmentId:opportunity.recruitByOpportunityId.recruitmentId
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LinkStatusRecruit,
      LinkStageRecruit,
      getCandidateById,
      getTopicsByCandidateId,
      handleCandidateDateModal,
      handleRecruiterDrawerModal,
      deleteSubtableData
      //  getCandidateRequirement
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SubTableClickCandidate);