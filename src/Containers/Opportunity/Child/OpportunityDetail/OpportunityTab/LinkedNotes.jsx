import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getNotesListByOpportunityId } from "../../../OpportunityAction";
import NoteForm from "./NoteForm.jsx";
import { SingleNote } from "../../../../../Components/Common";

class LinkedNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByOpportunityId(this.props.opportunityId);
  }

  render() {
    const { fetchingNotesListByOpportunityId, notesListByOpportunityId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteForm
            type={"opportunity"}
            opportunityId={this.props.opportunityId}
            callback={() =>
              this.props.getNotesListByOpportunityId(this.props.opportunityId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByOpportunityId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByOpportunityId &&
                    notesListByOpportunityId.map((item, index) => (
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

const mapStateToProps = ({ auth, opportunity }) => ({
  userId: auth.userDetails.userId,
  notesListByOpportunityId: opportunity.notesListByOpportunityId,
  fetchingNotesListByOpportunityId: opportunity.fetchingNotesListByOpportunityId,
  opportunityId: opportunity.opportunity.opportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByOpportunityId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedNotes);
