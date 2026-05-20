import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";

import { handleCandidateUpdateEmploymentModal } from "../../../../../CandidateAction";

import {
  getCandidateEmploymentDetails,
  setCandidateEditEmployment,
  deleteDocument,
  deleteCandidateEmploymentTable,
} from "../../../../../CandidateAction";
// import EditEmailForm from "../../../../../Settings/Email/Child/EditEmailForm"
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";

import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
const UpdateCandidateEmploymentModal = lazy(()=>import("../Employment/UpdateCandidateEmploymentModal.jsx"));
class CandidateEmploymentTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });

  componentDidMount() {
    const { getCandidateEmploymentDetails, candidateId } = this.props;
    getCandidateEmploymentDetails(this.props.candidateId);
  }

  render() {
    const {
      handleCandidateUpdateEmploymentModal,
      fetchingCandidateEmploymentDetails,
      fetchingCandidateEmploymentDetailsError,
      candidateEmploymentDetails,
      updateCandidateEmploymentModal,
      setCandidateEditEmployment,
      deleteCandidateEmploymentTable,
    } = this.props;

    // const { emailCredential, fetchingEmailCredential } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Company Name",
        title: (
          <FormattedMessage
            id="app.companyname"
            defaultMessage="Company Name"
          />
        ),
        dataIndex: "companyName",
         width: "15%"
      },
      {
        //title: "Designation",
        title: (
          <FormattedMessage id="app.designation" defaultMessage="Designation" />
        ),
        dataIndex: "designationType",
        width: "12%"
      },
      {
        //title: "Start Date",
        title: (
          <FormattedMessage id="app.start" defaultMessage="Start" />
        ),
        dataIndex: "startDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage id="app.end" defaultMessage="End" />,
        dataIndex: "endDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("LL")}</span>;
        },
      },
      //combine and show salary +curr+type
      {
        // title: "Salary",
         title: <FormattedMessage id="app.salary" defaultMessage="Salary" />,
         width:"12%",
        render: (name, item, i) => {
          return (
            <span>{`${item.salary} ${item.currency} ${item.salaryType}`}</span>
          );
        },
      },

      // {
      //   //title: "Description",
      //   title: (
      //     <FormattedMessage id="app.description" defaultMessage="Description" />
      //   ),
      //   width:"10%",
      //   dataIndex: "description",
      // },
      // {
      //   title: "",
      //   dataIndex: "documentId",
      //   // width: "9%",
      //   render: (name, item, i) => {
      //     return (
      //       <>
      //         {item.documentId ? (
      //           <a
      //             href={`${base_url}/document/${item.documentId}`}
      //             target="_blank"
      //           >
      //             <Icon
      //               type="download"
      //               // onClick={() => startDownload()}
      //               style={{ cursor: "pointer" }}
      //             />
      //           </a>
      //         ) : null}
      //       </>
      //     );
      //   },
      // },
     
      {
        // title:"Document",
        title: <FormattedMessage id="app.documents" defaultMessage="Document" />,
        dataIndex:"documentType",
        width:"12%",

      },
      // {
      //   title: "",
      //   dataIndex: "id",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <StyledPopconfirm
      //         //title="Do you want to delete?"
      //         title={<FormattedMessage
      //           id="app.doyouwanttodelete?"
      //           defaultMessage="Do you want to delete?"
      //         />}
      //         onConfirm={() => deleteCandidateEmploymentTable(item.id)}
      //       >
      //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //         {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //       </StyledPopconfirm>
      //     );
      //   },
      // },
      {
        title: "",
        dataIndex: "documentTypeId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadOutlined
                type="download"
                // onClick={() => startDownload()}
                style={{ cursor: "pointer" }}
              />
            </a>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <EditOutlined
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCandidateEditEmployment(item);
                handleCandidateUpdateEmploymentModal(true);
              }}
            />
          );
        },
      },
    ];

   
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={candidateEmploymentDetails}
          Loading={
            fetchingCandidateEmploymentDetails ||
            fetchingCandidateEmploymentDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        />

        <UpdateCandidateEmploymentModal
          updateCandidateEmploymentModal={updateCandidateEmploymentModal}
          handleCandidateUpdateEmploymentModal={
            handleCandidateUpdateEmploymentModal
          }
        />
        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  candidateEmploymentDetails: candidate.candidateEmploymentDetails,
  fetchingCandidateEmploymentDetails:
    candidate.fetchingCandidateEmploymentDetails,
  fetchingCandidateEmploymentDetailsError:
    candidate.fetchingCandidateEmploymentDetailsError,
  updateCandidateEmploymentModal: candidate.updateCandidateEmploymentModal,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEmploymentDetails,
      setCandidateEditEmployment,
      handleCandidateUpdateEmploymentModal,
      deleteCandidateEmploymentTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEmploymentTable);
