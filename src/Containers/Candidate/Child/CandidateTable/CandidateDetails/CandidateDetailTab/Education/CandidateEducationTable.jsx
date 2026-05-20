import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
// import { BundleLoader } from "../../../../../../Components/Placeholder";

// import { handleCandidateEducationModal } from "../../../../../CandidateAction";
// import AddEducationModal from "./AddEducationModal";
import { base_url } from "../../../../../../../Config/Auth";
import {
  getCandidateEducationDetails,
  setEditCandidateEducation,
} from "../../../../../CandidateAction";
import { handleUpdateCandidateEducationModal } from "../../../../../CandidateAction";
// import { ActionIcon } from "../../../../../../Components/Utils";
import dayjs from "dayjs";
import {
  
  deleteCandidateEducationTable,
} from "../../../../../CandidateAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
const UpdateCandidateEducationModal = lazy(()=>import("../Education/UpdateCandidateEducationModal.jsx"));
class CandidateEducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getCandidateEducationDetails, candidateId } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getCandidateEducationDetails(candidateId);
    }
  }

  render() {
    console.log(this.props.candidateId);
    const {
      eduCandidateDetails,
      fetchingCandidateEducationDetails,
      fetchingCandidateEducationDetailsError,
      handleUpdateCandidateEducationModal,
      updateCandidateEducationModal,
      singleCandidate,
      setEditCandidateEducation,
      candidateId,
      deleteCandidateEducationTable,
    } = this.props;
    console.log(candidateId);

    const columns = [
      {
        //title: "Education Type",
        title: (
          <FormattedMessage
            id="app.type"
            defaultMessage="Type"
          />
        ),
        dataIndex: "educationType",
         width: "8%"
      },
      {
        //title: "Course Name",
        title: (
          <FormattedMessage id="app.course" defaultMessage="Course" />
        ),
        dataIndex: "courseName",
        width: "10%"
      },
      // {
      //   title: "Course Type",
      //   dataIndex: "courseType",
      // },
      {
        //title: "Year of Passing",
        title: (
          <FormattedMessage
            id="app.yearofpassing"
            defaultMessage="Year of Passing"
          />
        ),
        dataIndex: "yearOfPassing",
        width: "18%"
        // render: (name, item, i) => {
        //   return <span>{dayjs(item.yearOfPassing).format("LL")}</span>;
        // },
      },
      {
        //title: "University/Institute Name",
        title: (
          <FormattedMessage
            id="app.universityinstitutename"
            defaultMessage="University/Institute"
          />
        ),
        dataIndex: "university",
        width: "20%"
      },
      // {
      //   title: "Specialization",
      //   dataIndex: "specialization",
      // },
      {
        //title: "Marks Secured",
        title: (
          <FormattedMessage
            id="app.markssecured"
            defaultMessage="Marks Secured"
          />
        ),
        dataIndex: "marksSecured",
        width: "15%"
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
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
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <EditOutlined
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                //debugger
                // this.props.setEmail(item);
                setEditCandidateEducation(item);
                handleUpdateCandidateEducationModal(true);
              }}
            />
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
              //title="Do you want to delete?"
              title={<FormattedMessage
                id="app.doyouwanttodelete?"
                defaultMessage="Do you want to delete?"
              />}
              onConfirm={() => deleteCandidateEducationTable(item.id)}
            >
              <DeleteOutlined
              type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingCandidateEducationDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={eduCandidateDetails}
          Loading={
            fetchingCandidateEducationDetails ||
            fetchingCandidateEducationDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        />

        <UpdateCandidateEducationModal
          updateCandidateEducationModal={updateCandidateEducationModal}
          handleUpdateCandidateEducationModal={
            handleUpdateCandidateEducationModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate, employee }) => ({
  eduCandidateDetails: candidate.eduCandidateDetails,
  updateCandidateEducationModal: candidate.updateCandidateEducationModal,
  fetchingCandidateEducationDetails:
    candidate.fetchingCandidateEducationDetails,
  fetchingCandidateEducationDetailsError:
    candidate.fetchingCandidateEducationDetailsError,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEducationDetails,
      handleUpdateCandidateEducationModal,
      setEditCandidateEducation,
      deleteCandidateEducationTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEducationTable);
