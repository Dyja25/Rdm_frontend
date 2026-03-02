import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MileageHeader from "./Child/MileageHeader.jsx";
import AddMileageModal from "./Child/AddMilegeModal.jsx";
import { handleMileageModal } from "./MileageAction";
const MileageTable = lazy(() => import("./Child/MileageTable.jsx"));

class Mileage extends Component {
  render() {
    return (
      <React.Fragment>
        <MileageHeader />
        <AddMileageModal
          handleMileageModal={this.props.handleMileageModal}
          addMileageModal={this.props.addMileageModal}
        />
        <MileageTable />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ mileage }) => ({
  addMileageModal: mileage.addMileageModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleMileageModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Mileage);
