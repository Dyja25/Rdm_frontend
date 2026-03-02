import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import AddCallModal from "./Child/AddCallModal.jsx";
import CallHeader from "./Child/CallHeader.jsx";
import { handleCallModal } from "./CallAction";

const CallTable = lazy(() => import("./Child/CallTable/CallTable.jsx"));
class Call extends Component {
  render() {
    const { addCallModal, handleCallModal } = this.props;
    return (
      <React.Fragment>
        <CallHeader handleCallModal={handleCallModal} />
        <AddCallModal
          addCallModal={addCallModal}
          handleCallModal={handleCallModal}
        />
        <Suspense fallback={<BundleLoader />}>
          <CallTable />
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ call }) => ({
  addCallModal: call.addCallModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Call);
