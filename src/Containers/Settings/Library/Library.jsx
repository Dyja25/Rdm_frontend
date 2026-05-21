import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleLibrary from "./SingleLibrary";
import {
  getLibrarys,
  addLibrarys,
  getSkillsRecords,
  // removeLibrarys,
  updateLibrarys,
  searchLibraryName,
} from "./LibraryAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { FormattedMessage } from "react-intl";
const { Search } = Input;
class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedLibrarys: [],
      isTextInputOpen: false,
      addingLibrary: false,
      name: "",
      singleLibrary: "",
      userId:"",
      orgId:"",
      editInd:true,
      currentData:"",
    };
  }
  handleClear = () => {
    this.setState({ currentData: undefined });
    this.props.getLibrarys(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddLibrary = () => {
    const { addLibrarys, librarys } = this.props;
    const { name,editInd, addingLibrarys, isTextInputOpen } = this.state;
    let library = { name,editInd,userId: this.props.userId, orgId: this.props.organizationId};

    let exist =
    librarys &&
    librarys.some((element) => element.name == name);

    // if (exist) {
    //   message.error(
    //     "Can't create as another library type exists with same name!"
    //   );
    // } else {
    //   addLibrarys(library, () => console.log("add library callback"));
    // }
    addLibrarys(library, () => console.log("add library callback"));

    this.setState({
      name: "",
      singleLibrary: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteLibrary = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateLibrary = (name,definationId, cb) => {
    this.props.updateLibrarys(name,definationId,  cb);
    this.setState({ name: "", singleLibrary: "" });
   // let library = { name,userId: this.props.userId, orgId: this.props.organizationId};
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
    const { getLibrarys,organizationId,getSkillsRecords,orgId } = this.props;
    console.log();
    getLibrarys(organizationId);
    getSkillsRecords(orgId)
  }
  render() {
    const {
      fetchingLibrarys,
      fetchingLibrarysError,
      librarys,
      addingLibrarys,
      updatingLibrarys,
    } = this.props;
    const {
      isTextInputOpen,
      name,
      singleLibrary,
      linkedLibrarys,
    } = this.state;
    if (fetchingLibrarys) return <p>Loading ...</p>;
    if (fetchingLibrarysError) return <p>Error ...</p>;
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

             <div style={ {width: "18vw",display:"flex"}} >
          <Search
            placeholder="Search by Name"
            // width={"100%"}
            // onSearch={(value) => {
            //   props.inputCandidateDataSearch(value);
            //   props.setCurrentData(value);

            // }}
             onChange={(e) => this.handleSearchChange(e)}
            // onSearch={value => console.log(value)}
             value={this.state.currentData}
            enterButton
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchLibraryName(this.state.currentData);

          }}
        >
          {/* Submit */}
          <FormattedMessage
                                        id="app.submit"
                                        defaultMessage="Submit"
                                      />
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
          {/* Clear */}
           <FormattedMessage
                                        id="app.clear"
                                        defaultMessage="Clear"
                                      />
        </Button>
        </div>
            <FlexContainer flexDirection="column">
             
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {librarys.length &&
                  librarys.map((library, i) => (
                    <SingleLibrary
                      key={i}
                      value={singleLibrary}
             s         data="singleLibrary"
                      library={library}
                      linkedLibrarys={linkedLibrarys}
                      updatingLibrarys={updatingLibrarys}
                      handleChange={this.handleChange}
                      handleUpdateLibrary={this.handleUpdateLibrary}
                      // handleDeleteDocument={this.handleDeleteDocument}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
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
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em", color:"black" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingLibrarys}
                  onClick={this.handleAddLibrary}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                    <FormattedMessage
                                                          id="app.save"
                                                          defaultMessage="Save"
                                                        />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage
                                                          id="app.cancel"
                                                          defaultMessage="Cancel"
                                                        />
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
                    Loading={addingLibrarys}
                    onClick={this.toggleInput}
                  >
                    {/* Add Skill */}
                    <FormattedMessage
                                    id="app.addSkill"
                                      defaultMessage=" Add Skill"
                                                          />
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>
          <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "86%",
                padding: "1.6rem",
                marginRight: 70,
                overflowX:"hidden"
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
          </MainWrapper>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ librarys,auth }) => ({
  addingLibrarys: librarys.addingLibrarys,
  addingLibrarysError: librarys.addingLibrarysError,
  librarys: librarys.librarys,
  // removingLibrarys: librarys.removingLibrarys,
  // removingLibrarysError: librarys.removingLibrarysError,
     updatingLibrarys: librarys.updatingLibrarys,
     skillsRecordData:librarys.skillsRecordData,
     updatingLibrarysError: librarys.updatingLibrarysError,
  fetchingLibrarys: librarys.fetchingLibrarys,
  fetchingLibrarysError: librarys.fetchingLibrarysError,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys, 
      getSkillsRecords,
      addLibrarys,
      // removeLibrarys,
       updateLibrarys,
       searchLibraryName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Library);
