import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleDocuments from "./Child/SingleDocuments";
import {
  getDocuments,
  addDocuments,
  removeDocuments,
  updateDocuments,
} from "./DocumentsAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDocuments: [],
      isTextInputOpen: false,
      addingDocument: false,
      documentTypeName: "",
      singleDocument: "",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddDocument = () => {
    const { addDocuments, documents } = this.props;
    const { documentTypeName, addingDocuments, isTextInputOpen,editInd} = this.state;
    let document = { documentTypeName,editInd };

    let exist =
      documents &&
      documents.some((element) => element.documentTypeName == documentTypeName);

    if (exist) {
      message.error(
        "Can't create as another documentTypeName exists with same name!"
      );
    } else {
      addDocuments(document, () => console.log("add document callback"));
    }

    this.setState({
      documentTypeName: "",
      singleDocument: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDocument = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateDocument = (documentTypeName,documentTypeId,editInd, cb) => {
    this.props.updateDocuments(documentTypeName, documentTypeId,editInd,cb);
    this.setState({ documentTypeName: "", singleDocument: "",editInd:true,});
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
    const { getDocuments } = this.props;
    console.log();
    getDocuments(getDocuments);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingDocuments,
      fetchingDocumentsError,
      documents,
      addingDocuments,
      updatingDocuments,
    } = this.props;
    const {
      isTextInputOpen,
      documentTypeName,
      singleDocument,
      linkedDocuments,
    } = this.state;
    if (fetchingDocuments) return <p>Loading ...</p>;
    if (fetchingDocumentsError) return <p>Error ...</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "43.12em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <FlexContainer flexDirection="column">
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.62em" }}>
                {documents.length &&
                  documents.map((document, i) => (
                    <SingleDocuments
                      key={i}
                      value={singleDocument}
                      name="singleDocument"
                      document={document}
                      linkedDocuments={linkedDocuments}
                      updatingDocuments={updatingDocuments}
                      handleChange={this.handleChange}
                      handleUpdateDocument={this.handleUpdateDocument}
                      handleDeleteDocument={this.handleDeleteDocument}
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
                  name="documentTypeName"
                  value={documentTypeName}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  disabled={!documentTypeName}
                  htmlType="submit"
                  Loading={addingDocuments}
                  onClick={this.handleAddDocument}
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
                    Loading={addingDocuments}
                    onClick={this.toggleInput}
                  >
                    Add Type
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

const mapStateToProps = ({ document }) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  documents: document.documents,

  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
  fetchingDocuments: document.fetchingDocuments,
  fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocuments,
      addDocuments,
      removeDocuments,
      updateDocuments,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
