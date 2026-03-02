import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
  StyledModal,
} from "../../../../../../../Components/UI/Antd";
import {
  getEducationDetails,
  handleUpdateEducationModal,
  setEditEducation,
} from "../../../../../../Profile/ProfileAction";

import { BundleLoader } from "../../../../../../../Components/Placeholder";

import UpdateEducationModal from "./UpdateEducationModal";
import { deleteDocument } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import { deleteEducationTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
class EducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getEducationDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getEducationDetails(employeeId);
    }
  }

  render() {
    console.log(this.props.employeeId);
    const {
      eduDetails,
      fetchingEducationDetails,
      fetchingEducationDetailsError,
      handleUpdateEducationModal,
      updateEducationModal,
      singleEmployee,
      setEditEducation,
      employeeId,
      deleteEducationTable,
    } = this.props;
    console.log(employeeId);

    const columns = [
      {
        //title: "Education Type",
        title: <FormattedMessage
          id="app.type"
          defaultMessage="Type"
        />,
        dataIndex: "educationType",
        // width: "35%"
      },
      {
        //title: "Course Name",
        title: <FormattedMessage
          id="app.courseName"
          defaultMessage="Course Name"
        />,
        dataIndex: "courseName",
      },
      // {
      //   title: "Course Type",
      //   dataIndex: "courseType",
      // },
      {
        //title: "Year of Passing",
        title: <FormattedMessage
          id="app.yearOfPassing"
          defaultMessage="Year of Passing"
        />,
        dataIndex: "yearOfPassing",
        // render: (name, item, i) => {
        //   return <span>{dayjs(item.yearOfPassing).format("LL")}</span>;
        // },
      },
      {
        //title: "University/Institute Name",
        title: <FormattedMessage
          id="app.college"
          defaultMessage="College"
        />,
        dataIndex: "university",
      },
      // {
      //   title: "Specialization",
      //   dataIndex: "specialization",
      // },
      {
        //title: "Marks Secured",
        title: <FormattedMessage
          id="app.marksSecured"
          defaultMessage="Marks Secured"
        />,
        dataIndex: "marksSecured",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "3%",
        render: (name, item, i) => {
          return (
            <>
              {item.documentId ? (
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  {/* <Icon
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  /> */}
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
            // <Icon
            //   type="edit"
            //   style={{ cursor: "pointer" }}
            //   onClick={() => {
            //     //debugger
            //     // this.props.setEmail(item);
            //     setEditEducation(item);
            //     handleUpdateEducationModal(true);
            //   }}
            // />
            <></>
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteEducationTable(item.id)}
            >
              {/* <Icon type="delete" style={{ cursor: "pointer", color: "red" }} /> */}
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingEducationDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={eduDetails}
          Loading={fetchingEducationDetails || fetchingEducationDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        />

        <UpdateEducationModal
          updateEducationModal={updateEducationModal}
          handleUpdateEducationModal={handleUpdateEducationModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  eduDetails: profile.eduDetails,
  updateEducationModal: profile.updateEducationModal,
  fetchingEducationDetails: profile.fetchingEducationDetails,
  fetchingEducationDetailsError: profile.fetchingEducationDetailsError,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducationDetails,
      handleUpdateEducationModal,
      setEditEducation,
      deleteEducationTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
