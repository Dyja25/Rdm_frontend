import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleEducations from "./SingleEducation";
// import * as Yup from "yup";
import {
  getEducations,
  addEducations,
  //   removeSectors,
  updateEducations,
} from "./EducationAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

// const SectorsSchema = Yup.object().shape({
//   sectorName: Yup.string().required("Input needed !"),
// });

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedEducations: [],
      isTextInputOpen: false,
      addingEducation: false,
      educationType: "",
      type: "",
      singleEducation: "",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddEducations = () => {
    const { addEducations, educations } = this.props;
    const { educationType, addingEducations, isTextInputOpen,editInd} = this.state;
    let education = { educationType,editInd};

    let exist =
      educations &&
      educations.some((element) => element.educationType == educationType);

    if (exist) {
      message.error(
        "Can't create as another education type exists with same name!"
      );
    } else {
      addEducations(education, () => console.log("add education callback"));
    }

    this.setState({
      educationType: "",
      singleEducation: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteSector = (id) => {
  //   this.props.removeSectors(id);
  //   this.setState({ sectorName: "", singleSector: "" });
  // };
  handleUpdateEducation = (educationType, educationTypeId, cb) => {
    this.props.updateEducations(educationType, educationTypeId, cb);
    this.setState({ educationType: "", singleEducation: "",editInd:true });
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
    const { getEducations } = this.props;
    console.log();
    getEducations();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingEducations,
      fetchingEducationsError,
      educations,
      addingEducations,
      updatingEducations,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      educationType,
      singleEducation,
      linkedEducations,
    } = this.state;
    if (fetchingEducations) return <p>Loading ...</p>;
    if (fetchingEducationsError) return <p>We are unable to load data</p>;
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
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
                {educations.length &&
                  educations.map((education, i) => (
                    <SingleEducations
                      key={i}
                      value={singleEducation}
                      name="singleEducation"
                      education={education}
                      linkedEducations={linkedEducations}
                      updatingEducations={updatingEducations}
                      handleChange={this.handleChange}
                      handleUpdateEducation={this.handleUpdateEducation}
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
                  name="educationType"
                  value={educationType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!educationType}
                  Loading={addingEducations}
                  onClick={this.handleAddEducations}
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
                    Loading={addingEducations}
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

const mapStateToProps = ({ education }) => ({
  addingEducations: education.addingEducations,
  addingEducationsError: education.addingEducationsError,
  educations: education.educations,

  removingEducations: education.removingEducations,
  removingEducationsError: education.removingEducationsError,
  fetchingEducations: education.fetchingEducations,
  fetchingEducationsError: education.fetchingEducationsError,

  updatingEducations: education.updatingEducations,
  updatingEducationsError: education.updatingEducationsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducations,
      addEducations,
      //   removeSectors,
      updateEducations,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Education);
