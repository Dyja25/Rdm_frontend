import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { handleEventModal } from "../EventAction";

class EventActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleEventModal } = this.props;
    return (
      <FlexContainer alignItems="center">
        <Tooltip placement="left" title="Create">
          <Button type="primary"
           ghost onClick={() => handleEventModal(true)}>
            Add
          </Button>
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ event }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEventModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EventActionRight);
