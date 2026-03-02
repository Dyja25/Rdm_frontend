import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
// import { BundleLoader } from "../../../../../../../Components/Placeholder";

import {
  getCandidateTrainingDetails,
  setCandidateEditingTraining,
  handleUpdateCandidateTrainingModal,
  
  deleteCandidateTrainingTable,
} from "../../../../../CandidateAction";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

const UpdateCandidateTrainingModal = lazy(()=>import("./UpdateCandidateTrainingModal.jsx"));

class CandidateTrainingTable extends Component {
  componentDidMount() {
    const { getCandidateTrainingDetails, candidateId } = this.props;
    getCandidateTrainingDetails(this.props.candidateId);
  }
  render() {
    // console.log(this.props.training);
    const {
      training,
      fetchingCandidateTrainingDetails,
      fetchingCandidateTrainingDetailsError,
      handleUpdateCandidateTrainingModal,
      updateCandidateTrainingModal,
      setCandidateEditingTraining,
      deleteCandidateTrainingTable,
    } = this.props;

    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        //title: " Course Name",
        title: (
          <FormattedMessage id="app.courseName" defaultMessage=" Course Name" />
        ),
        dataIndex: "courseName",
         width: "15%"
      },
      {
        //title: "Start Date",
        title: (
          <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
        ),
        dataIndex: "startDate",
        width: "15%",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
        dataIndex: "endDate",
        width: "15%"
      //   render: (name, item, i) => {
      //     return <span>{dayjs(item.endDate).format("LL")}</span>;
      //   },
       },
      {
        // title: "Organization/Institution",
        title: (
          <FormattedMessage
            id="app.organization"
            defaultMessage="Organization/Institution"
          />
        ),
        dataIndex: "organization",
        width: "15%"
      },
      {
        //title: "Grade",
        title: <FormattedMessage id="app.grade" defaultMessage="Grade" />,
        dataIndex: "grade",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "9%",
        render: (name, item, i) => {
          return (
            <>
              {/* {item.documentId ? ( */}
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <DownloadOutlined
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  />
                </a>
              {/* ) : null} */}
            </>
          );
        },
      },
      {
        // title:"DocumentType",
        dataIndex:"documentType",

      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <EditOutlined
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCandidateEditingTraining(item);
                handleUpdateCandidateTrainingModal(true);
              }}
            />
          );
        },
      },
      
      // {
      //   title: "",
      //   dataIndex: "id",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <StyledPopconfirm
      //         title="Do you want to delete?"
      //         onConfirm={() => deleteCandidateTrainingTable(item.id)}
      //       >
      //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //         {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //       </StyledPopconfirm>
      //     );
      //   },
      // },
    ];

    
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={training}
          Loading={
            fetchingCandidateTrainingDetails ||
            fetchingCandidateTrainingDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        />
        <UpdateCandidateTrainingModal
          updateCandidateTrainingModal={updateCandidateTrainingModal}
          handleUpdateCandidateTrainingModal={
            handleUpdateCandidateTrainingModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  training: candidate.candidateTrainingDetails,
  fetchingCandidateTrainingDetails: candidate.fetchingCandidateTrainingDetails,
  fetchingCandidateTrainingDetailsError:
    candidate.fetchingCandidateTrainingDetailsError,
  candidateId: candidate.candidate.candidateId,
  updateCandidateTrainingModal: candidate.updateCandidateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateTrainingDetails,
      handleUpdateCandidateTrainingModal,
      deleteCandidateTrainingTable,
      setCandidateEditingTraining,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateTrainingTable);
