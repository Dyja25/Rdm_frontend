import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { handleCallModal } from "../CallAction";

const CallActionRight = (props) => {
  return (
    <FlexContainer alignItems="center">
      <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          onClick={() => props.handleCallModal(true)}
        >
          {/* <Icon type="plus" /> */}
          Add
        </Button>
      </Tooltip>
    </FlexContainer>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallActionRight);
