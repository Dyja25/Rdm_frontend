import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import HolidayHeader from "./Child/HolidayHeader";
import { handleHolidayModal } from "./HolidayAction";
// import HolidayTable from "./Child/HolidayTable";
import HolidayForm from "./Child/HolidayForm";
// import HolidayDetailLeft from "./Child/HolidayDetailLeft";
// import LeaveHeader from "./Child/LeaveHeader";
// const LeaveDetailLeft = lazy(() => import("./Child/LeaveDetailLeft"));
// const LeaveDetailRight = lazy(() => import("./Child/LeaveDetailRight"));
const HolidayPage = lazy(() => import("./Child/HolidayPage.jsx"));
const HolidayTable = lazy(() => import("./Child/HolidayTable.jsx"));
const  AddHolidayModal= lazy(() =>import("./Child/AddHolidayModal.jsx"));

class Holiday extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    const { addHolidayModal, handleHolidayModal } = this.props;
    console.log(addHolidayModal);
    return (
      <>
        {/* <React.Fragment> */}
        {/* <HolidayHeader handleHolidayModal={handleHolidayModal} /> */}
        <AddHolidayModal
          addHolidayModal={addHolidayModal}
          handleHolidayModal={handleHolidayModal}
        />
        {/* <HolidayTable /> */}
        <HolidayPage />
      </>
    );
  }
}

const mapStateToProps = ({ auth, holiday }) => ({
  user: auth.userDetails,
  addHolidayModal: holiday.addHolidayModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleHolidayModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
