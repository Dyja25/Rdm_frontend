import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { getNotesListByCandidateId } from "../../../../../CandidateAction";
import NoteForm from "./NoteForm.jsx";
import { SingleNote } from "../../../../../../../Components/Common";

class LinkedNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByCandidateId(this.props.candidateId);
  }

  render() {
    const { fetchingNotesListByCandidateId, notesListByCandidateId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteForm
            type={"candidate"}
            candidateId={this.props.candidateId}
            callback={() =>
              this.props.getNotesListByCandidateId(this.props.candidateId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByCandidateId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByCandidateId &&
                    notesListByCandidateId.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNote {...item} userId={this.props.userId} />
                      </Timeline.Item>
                    ))}
                </Timeline>
              )}
          </div>
        </BorderBox>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  notesListByCandidateId: candidate.notesListByCandidateId,
  fetchingNotesListByCandidateId: candidate.fetchingNotesListByCandidateId,
  candidateId: candidate.candidate.candidateId,
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByCandidateId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedNotes);
