import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleMileageModal } from "../MileageAction";
// import { setAccountFilterText, setAccountFilterUser } from "../AccountAction";
// import { getUsers } from "../../Team/TeamAction";

const Option = StyledSelect.Option;

class MileageActionRight extends React.Component {
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
    return (
      <FlexContainer alignItems="center">
        <Button
          type={this.state.isClicked === "import" ? "primary" : ""}
          onClick={() => this.handleClicked("import")}
          // onClick={() => this.props.history.push("/import/product")}
        >
          Import
        </Button>
        &nbsp;
        <Spacer />
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
        >
          Export
        </Button>
        &nbsp;
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleMileageModal(true)}
          >
            {/* <Icon type="plus" /> */}

            Add
          </Button>
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ handleMileageModal }, dispatch);
export default (
  connect(mapStateToProps, mapDispatchToProps)(MileageActionRight)
);
