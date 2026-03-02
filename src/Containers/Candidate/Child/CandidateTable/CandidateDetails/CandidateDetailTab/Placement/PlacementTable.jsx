import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import RecruitmentStages from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentStages";
import { bindActionCreators } from "redux";
import PlacementDetails from "./PlacementDetails.jsx"
import {  Menu,Dropdown,
  Progress,Tooltip } from "antd";
import dayjs from "dayjs";

import {
  StyledTable,
} from "../../../../../../../Components/UI/Antd";

import {
   getPlacement,
  // deleteDocument,
} from "../../../../../CandidateAction";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";



class PlacementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stageList: [],
      candidateId:"",
     
    };
  }

  handleIconClick = () => {
    debugger;
    this.setState({ show: true,  });
    // this.props.getCandidateById(candidateId);
    // this.props.getTopicsByCandidateId(candidateId);
    // this.props.getContactDocument(contactId);
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
    
 
  // componentDidMount() {
    
  //   this.props.getPlacement(this.props.candidateId);
  // }
  componentDidMount() {
    // debugger;
    const { getPlacement, candidateId } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getPlacement(candidateId);
    }
  }
  render() {
    console.log(this.props.candidateId);
    const {
      placement,
      candidateId,
      fetchingPlacement,
      fetchingPlacementError,
      //   deleteDocument,
    } = this.props;
    console.log(candidateId);
    const columns = [
      {
        //title: "Date",
        title: <FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />,
        dataIndex: "accountName",
       
      },
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.opportunity"
          defaultMessage="Opportunity"
        />,
        dataIndex: "opprtunityName",
        // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },
     
      // {
      //   title: "Description",
      //   dataIndex: "documentDescription",
      //   onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //   sorter: (a, b) => a.taskType.length - b.taskType.length
      // },
      {
        //title: "Description",
        title: <FormattedMessage
          id="app.requirement"
          defaultMessage="Requirement"
        />,
        dataIndex: "requirementName",
        width: "20%",
        // render: (name, item, i) => {
        //   console.log(item);
        //   return <span>{elipsize(item.documentContentType || "", 15)}</span>;
        // },
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        //title: "Uploaded By",
        title: <FormattedMessage
          id="app.workflow"
          defaultMessage="Workflow"
        />,
        dataIndex: "processName",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },

      {
       
        title: <FormattedMessage
          id="app.callType"
          defaultMessage="Stages"
        />,
        dataIndex: "callType",
        width: "7%",
        render: (name, item, i) => {
          var findProbability = 0;
         
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
                       
                        />{" "}
                      </Menu.Item>
                    </Menu>
                  </div>
                }
                trigger={["click"]}
              >
                <Tooltip
                  // title={item.stageName}
                 >
                  {" "}
                  <Progress
                    type="circle"
                    style={{ cursor: "pointer" }}
                    // percent={findProbability}
                    width={40}
                    strokeColor={"#005075"}
                  />
                </Tooltip>
              </Dropdown>
            </span>
          );
        },
      },
      {
        title: "Result",
        // dataIndex: "avilableDate",
        width: "10%",
        
        },
     
      {
        title: "Start Date",
        dataIndex: "avilableDate",
        width: "10%",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.avilableDate).format("ll")}`}</span>;
        },dayjs

       
            
          
        
      },

      // {
      //   title: "",
      //   // dataIndex: "avilableDate",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     // const close =
      //     //   this.state.show === true 
      //       return(
      //         <Icon
      //         type="eye"
      //         onClick={() =>
      //           this.handleIconClick()
      //         }
      //         style={{
      //           fontSize: "1.125em",
      //           // color:
      //           //   this.state.show === true
                  
      //         }}
      //         size="30"
      //       />

      //       );
      //   },

        
        
      //   },
        {
          title: "",
          dataIndex: "callType",
          width: "2%",
          render: (name, item, i) => {
            const close =
              this.state.show === true 
  
            return (
              <>
                {/* {item.candidateName ? ( */}
                  <>
                    {close ? (
                      <Tooltip //title="Close Details"
                        title={<FormattedMessage
                          id="app.closedetails"
                          defaultMessage="Close Details"
                        />}
                      >
                        <EyeInvisibleOutlined
                          type="eye-invisible"
                          onClick={() => this.handleCloseIconClick()}
                          style={{
                            fontSize: "1.125em",
                            color:
                              this.state.show === true && "#1890ff",
                          }}
                          size="30"
                        />
                      </Tooltip>
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
                              onClick={() =>
                                this.handleIconClick()
                              }
                              style={{
                                fontSize: "1.125em",
                                color:
                                  this.state.show === true &&"#1890ff",
                                 
                                  
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
    ];

    // if (fetchingDocumentsByCandidateIdError) {
    //   return <APIFailed />;
    // }
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: 280 }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="candidateId"
            columns={columns}
            dataSource={placement}
            Loading={
              fetchingPlacement ||
               fetchingPlacementError
             }
            onChange={console.log("task onChangeHere...")}
          />
        
        )}
          {this.state.show && (
            <PlacementDetails
                 candidateId={this.state.candidateId}
            stageList={this.state.stageList}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  placement: candidate.placement,
  fetchingPlacement: candidate.fetchingPlacement,
  fetchingPlacementError:candidate.fetchingPlacementError,
  //   candidate.fetchingDocumentsByCandidateIdError,
  // documentsByCandidateId: candidate.documentsByCandidateId,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getPlacement,
      //   deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacementTable);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
