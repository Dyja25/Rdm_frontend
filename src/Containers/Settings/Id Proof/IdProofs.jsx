import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleIdProof from "./SingleIdProof";
import {
  getIdProofs,
  addIdProofs,
  // removeDesignations,
  updateIdProofs,
} from "./IdProofAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

class IdProofs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedIdProofs: [],
      isTextInputOpen: false,
      addingIdProof: false,
      IdProofType: "",
      // type:"",
      singleIdProof: "",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddIdProofs = () => {
    const { addIdProofs, idProofs } = this.props;
    const { IdProofType, addingIdProofs, isTextInputOpen,editInd } = this.state;
    let idProof = { IdProofType,editInd };

    let exist =
    idProofs &&
    idProofs.some((element) => element.IdProofType == IdProofType);

    if (exist) {
      message.error(
        "Can't create as another idProof type exists with same name!"
      );
    } else {
      addIdProofs(idProof, () => console.log("add idProof callback"));
    }

    this.setState({
      IdProofType: "",
      singleIdProof: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  // handleDeleteDesignation = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateIdProof = (IdProofType,IdProofTypeId,editInd, cb) => {
    this.props.updateIdProofs(IdProofType,IdProofTypeId,editInd,  cb);
    this.setState({ IdProofType: "", singleIdProof: "",editInd:true });
  }; 
  componentDidMount() {
    const { getIdProofs } = this.props;
    console.log();
    getIdProofs(getIdProofs);
  }
  render() {
    const {
      fetchingIdProofs,
      fetchingIdProofsError,
      idProofs,
      addingIdProofs,
      updatingIdProofs,
    } = this.props;
    const {
      IdProofType,
      isTextInputOpen,      
      idProofTypeName,
      singleIdProof,
      linkedIdProofs,
    } = this.state;
    // if (fetchingIdProofs) return <p>Loading ...</p>;
    // if (fetchingIdProofsError) return <p>We are unable to load data</p>;
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
                {idProofs.length &&
                  idProofs.map((idProof, i) => (
                    <SingleIdProof
                      key={i}
                      value={singleIdProof}
                      name="singleIdProof"
                      idProof={idProof}
                      linkedIdProofs={linkedIdProofs}
                      updatingIdProofs={updatingIdProofs}
                      handleChange={this.handleChange}
                      handleUpdateIdProof={this.handleUpdateIdProof}
                      // handleDeleteDocument={this.handleDeleteDocument}
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
                 name="IdProofType"
                  value={IdProofType}
                  onChange={this.handleChange}
                  width="61%"                  
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!IdProofType}
                  Loading={addingIdProofs}
                  onClick={this.handleAddIdProofs}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
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
                    Loading={addingIdProofs}
                    onClick={this.toggleInput}
                  >
                    Add Type
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>         
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ idProof }) => ({
  addingIdProofs: idProof.addingIdProofs,
  addingIdProofsError: idProof.addingIdProofsError,
  idProofs: idProof.idProofs,    
  fetchingIdProofs: idProof.fetchingIdProofs,
  fetchingIdProofsError: idProof.fetchingIdProofsError,
  updatingIdProofs: idProof.updatingIdProofs,
  updatingIdProofsError: idProof.updatingIdProofsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIdProofs,
      addIdProofs ,
      updateIdProofs,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(IdProofs);
