import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { handleCallModal } from "../CallAction";
import { FormattedMessage } from "react-intl";

const CallActionRight = (props) => {
  return (
    <FlexContainer alignItems="center">
      <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          onClick={() => props.handleCallModal(true)}
        >
          {/* <Icon type="plus" /> */}
          {/* Add */}
           <FormattedMessage
                                        id="app.add"
                                        defaultMessage="Add"
                                      />
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
