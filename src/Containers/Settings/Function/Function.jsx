import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
// import SingleFunction from "./SingleFunction";
// import * as Yup from "yup";
import {
  getFunctions,
  addFunctions,
  //   removeSectors,
  updateFunctions,
} from "./FunctionAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import SingleFunctions from "./SingleFunction";

// const SectorsSchema = Yup.object().shape({
//   sectorName: Yup.string().required("Input needed !"),
// });

class Function extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedFunctions: [],
      isTextInputOpen: false,
      addingFunction: false,
      functionType: "",
      type: "",
      singleFunction: "",
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddFunctions = () => {
    const { addFunctions, functions } = this.props;
    const { functionType, addingFunctions, isTextInputOpen } = this.state;
    let Function = { functionType };

    let exist =
      functions &&
      functions.some((element) => element.functionType == functionType);

    if (exist) {
      message.error(
        "Can't create as another functionType exists with same name!"
      );
    } else {
      addFunctions(Function, () => console.log("add function callback"));
    }

    this.setState({
      functionType: "",
      singleFunction: "",
      isTextInputOpen: false,
    });
  };
  // handleDeleteSector = (id) => {
  //   this.props.removeSectors(id);
  //   this.setState({ sectorName: "", singleSector: "" });
  // };
  handleUpdateFunction = (functionType, functionTypeId, cb) => {
    this.props.updateFunctions(functionType, functionTypeId, cb);
    this.setState({ functionType: "", singleFunction: "" });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getFunctions } = this.props;
    console.log();
    getFunctions();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingFunctions,
      fetchingFunctionsError,
      functions,
      addingFunctions,
      updatingFunctions,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      functionType,
      singleFunction,
      linkedFunctions,
    } = this.state;
    if (fetchingFunctions) return <p>Loading ...</p>;
    if (fetchingFunctionsError) return <p>We are unable to load data</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <FlexContainer flexDirection="column">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {functions.length &&
                  functions.map((Function, i) => (
                    <SingleFunctions
                      key={i}
                      value={singleFunction}
                      name="singleFunction"
                      Function={Function}
                      linkedFunctions={linkedFunctions}
                      updatingFunctions={updatingFunctions}
                      handleChange={this.handleChange}
                      handleUpdateFunction={this.handleUpdateFunction}
                      //   handleDeleteSector={this.handleDeleteSector}
                    />
                  ))}
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Type"
                  name="functionType"
                  value={functionType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!functionType}
                  Loading={addingFunctions}
                  onClick={this.handleAddFunctions}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingFunctions}
                    onClick={this.toggleInput}
                  >
                    {/* Add Type */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ functions }) => ({
  addingFunctions: functions.addingFunctions,
  addingFunctionsError: functions.addingFunctionsError,
  functions: functions.functions,

//   removingEducations: education.removingEducations,
//   removingEducationsError: education.removingEducationsError,
  fetchingFunctions: functions.fetchingFunctions,
  fetchingFunctionsError: functions.fetchingFunctionsError,

  updatingFunctions: functions.updatingFunctions,
  updatingFunctionsError: functions.updatingFunctionsError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFunctions,
      addFunctions,
      //   removeSectors,
      updateFunctions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Function);
