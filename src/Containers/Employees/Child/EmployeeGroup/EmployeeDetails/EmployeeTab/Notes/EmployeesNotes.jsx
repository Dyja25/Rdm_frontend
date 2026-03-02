import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { getNotesListByEmployeeId } from "../../../../../EmployeeAction";
import EmployeesNoteForm from "./EmployeesNoteForm";
import { SingleNote } from "../../../../../../../Components/Common";

class EmployeesNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByEmployeeId(this.props.employeeId);
  }


  render() {
    console.log(this.props.employeeId);
    const { fetchingNotesListByEmployeeId, notesListByEmployeeId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <EmployeesNoteForm
            type={"employee"}
            employeeId={this.props.employeeId}
            callback={() =>
              this.props.getNotesListByEmployeeId(this.props.employeeId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByEmployeeId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByEmployeeId &&
                    notesListByEmployeeId.map((item, index) => (
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

const mapStateToProps = ({ auth, employee }) => ({
  userId: auth.userDetails.userId,
  notesListByEmployeeId: employee.notesListByEmployeeId,
  fetchingNotesListByEmployeeId: employee.fetchingNotesListByEmployeeId,
  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByEmployeeId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesNotes);
