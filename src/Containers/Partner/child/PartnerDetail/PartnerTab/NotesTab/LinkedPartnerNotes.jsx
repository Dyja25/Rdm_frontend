import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getNotesListByPartnerId } from "../../../../PartnerAction";
import NoteForm from "./NoteForm.jsx";
import { SingleNote } from "../../../../../../Components/Common";

class LinkedPartnerNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByPartnerId(this.props.partnerId);
  }

  render() {
    const { fetchingNotesListByPartnerId, notesListByPartnerId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "230px" }}>
          <NoteForm
            type={"partner"}
            partnerId={this.props.partnerId}
            callback={() =>
              this.props.getNotesListByPartnerId(this.props.partnerId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByPartnerId ? (
              <BundleLoader />
            ) : (
              <Timeline>
                {notesListByPartnerId &&
                  notesListByPartnerId.map((item, index) => (
                    <Timeline.Item
                      key={index}
                      style={{ paddingBottom: "10px" }}
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

const mapStateToProps = ({ auth, partner }) => ({
  userId: auth.userDetails.userId,
  notesListByPartnerId: partner.notesListByPartnerId,
  fetchingNotesListByPartnerId: partner.fetchingNotesListByPartnerId,
  partnerId: partner.partner.partnerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByPartnerId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedPartnerNotes);
