import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getNotesListByCustomerId } from "../../../../CustomerAction";
import { SingleNote } from "../../../../../../Components/Common";
const NoteForm =lazy(()=> import("./NoteForm"));

class LinkedNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByCustomerId(this.props.customerId);
  }

  render() {
    const { fetchingNotesListByCustomerId, notesListByCustomerId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteForm
            type={"customer"}
            customerId={this.props.customerId}
            callback={() =>
              this.props.getNotesListByCustomerId(this.props.customerId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByCustomerId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByCustomerId &&
                    notesListByCustomerId.map((item, index) => (
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

const mapStateToProps = ({ auth, customer }) => ({
  userId: auth.userDetails.userId,
  notesListByCustomerId: customer.notesListByCustomerId,
  fetchingNotesListByCustomerId: customer.fetchingNotesListByCustomerId,
  customerId: customer.customer.customerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByCustomerId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedNotes);
