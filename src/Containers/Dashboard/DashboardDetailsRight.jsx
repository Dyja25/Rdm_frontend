import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardDetailsTab from "./DashboardDetailsTab.jsx";


function DashboardDetailsRight(props) {
  return (
    <>
       <DashboardDetailsTab/>
    </>
  );
}

const mapStateToProps = ({ permissions, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsRight);