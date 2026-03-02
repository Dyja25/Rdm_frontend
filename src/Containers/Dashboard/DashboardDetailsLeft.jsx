import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WordCloud from "../../Components/WordCloud/WordCloud.jsx";
import {  MainWrapper } from "../../Components/UI/Layout";
// import { getPermissions, addingPermissions } from "./PermissionsAction";
// import { StyledLabel,Spacer } from "../../Components/UI/Elements";
// import PermissionForm from "./PermissionForm";

function DashboardDetailsLeft(props) {
  return (
    <MainWrapper >
         <WordCloud/>
    </MainWrapper>
  );
}
const mapStateToProps = ({ permissions, auth }) => ({
//   permissionsData: permissions.permissionsData,
//   userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getPermissions,
    //   addingPermissions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsLeft);