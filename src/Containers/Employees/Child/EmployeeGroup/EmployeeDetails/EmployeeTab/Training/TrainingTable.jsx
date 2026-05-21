import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getTrainingDetails,
  setEditTraining,
  handleUpdateTrainingModal,
  deleteDocument,
} from "../../../../../../Profile/ProfileAction";
import { deleteTrainingTable } from "../../../../../../Profile/ProfileAction";
import UpdateTrainingModal from "./UpdateTrainingModal";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";

class TrainingTable extends Component {
  componentDidMount() {
    const { getTrainingDetails, employeeId } = this.props;
    getTrainingDetails(employeeId);
  }
  render() {
    console.log(this.props.training);
    const {
      training,
      fetchingTrainingDetails,
      fetchingTrainingDetailsError,
      handleUpdateTrainingModal,
      updateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    } = this.props;

    const columns = [
      {
        //title: " Course Name",
        title: <FormattedMessage
          id="app.coursename"
          defaultMessage=" Course Name"
        />,
        dataIndex: "courseName",
        // width: "35%"
      },
      {
        //title: "Start Date",
        title: <FormattedMessage
          id="app.startdate"
          defaultMessage="Start Date"
        />,
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage
          id="app.enddate"
          defaultMessage="End Date"
        />,
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("LL")}</span>;
        },
      },
      {
        // title: "Organization/Institution",
        title: <FormattedMessage
          id="app.organization"
          defaultMessage="Organization/Institution"
        />,
        dataIndex: "organization",
      },
      {
        //title: "Grade",
        title: <FormattedMessage
          id="app.grade"
          defaultMessage="Grade"
        />,
        dataIndex: "grade",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "9%",
        render: (name, item, i) => {
          return (
            <>
              {item.documentId ? (
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <FileDownloadIcon
                   
                    style={{ cursor: "pointer" }}
                  />
                </a>
              ) : null}
            </>
          );
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              //type="edit"
              style={{ cursor: "pointer" }}
              // onClick={() => handleUpdateTrainingModal(true)}
              onClick={() => {
                setEditTraining(item);
                handleUpdateTrainingModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "4%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteTrainingTable(item.id)}
            >
              <DeleteIcon  style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingTrainingDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={training}
          Loading={fetchingTrainingDetails || fetchingTrainingDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />
        <UpdateTrainingModal
          updateTrainingModal={updateTrainingModal}
          handleUpdateTrainingModal={handleUpdateTrainingModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  training: profile.trainingDetails,
  fetchingTrainingDetails: profile.fetchingTrainingDetails,
  fetchingTrainingDetailsError: profile.fetchingTrainingDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateTrainingModal: profile.updateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTrainingDetails,
      handleUpdateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTable);
