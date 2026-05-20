import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../../Components/UI/Elements";
import SingleCertification from "./SingleCertification";
import {
  getCertification,
  addCertification,
  removeCertification,
  updateCertification,
  searchCertificationName,
} from "./CertificationAction";
import axios from "axios";
import { base_url } from "../../../../../Config/Auth";
import dayjs from "dayjs";

class Certification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedCertification: [],
      isTextInputOpen: false,
      addingCertification: false,
      name :"",
      type:"",
      singleCertification: "",
      userId:"",
      orgId:"",
      editInd:true,
      currentData:"",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getCertification(this.props.organizationId);
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
  handleAddCertification = () => {
    const { addCertification, certifications } = this.props;
    const { editInd,name, addingCertifications, isTextInputOpen } = this.state;
    let certification = {name};
    // let exist =
    // certifications &&
    // certifications.some((element) => element.name == name);

    // if (exist) {
    //   message.error(
    //     "Can't create as another certification type exists with same name!"
    //   );
    // } else {
    //   addCertification(certification, () => console.log("add certifications callback"));
    // }
    addCertification(certification, () => console.log("add certification callback"));

    this.setState({
      name: "",
      singleCertification: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteCertification = (certificationId={certificationId}) => {
    this.props.removeCertification(certificationId);
    this.setState({ name: "", singleCertification: "" });
  };
  handleUpdateCertification = (name,certificationId,editInd, cb) => {
    this.props.updateCertification(name,certificationId,editInd,  cb);
    this.setState({ name: "", singleCertification: "",editInd:true ,liveInd: true,userId: this.props.userId,certificationId:this.props.certificationId, orgId: this.props.organizationId,creationDate:""});
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
    const { getCertification,organizationId,certificationId} = this.props;
    console.log(organizationId);
    getCertification(organizationId);
    // this.props.removeCertification(certificationId);
    // this.props.updateCertification(
    //   {
    //   certificationId:this.props.certificationId,

    //   },
    //   this.props.certificationId,
    //   this.props.userId
    //   );
  }
  render() {
    const {
      fetchingCertifications,
    fetchingCertificationsError,
    certifications,
    addingCertifications,
    updatingCertifications,
    } = this.props;
    const {
      isTextInputOpen,
      name,
      singleCertification,
      linkedCertification,
    } = this.state;
    if (fetchingCertifications) return <p>Loading ...</p>;
    if (fetchingCertificationsError) return <p>Error ...</p>;
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
          <Input
            placeholder="Search by Name"
            width={"100%"}
            // onSearch={(value) => {
            //   props.inputCandidateDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchCertificationName(this.state.currentData);

          }}
        >
          Submit
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
          Clear
        </Button>
        </div>
            <FlexContainer flexDirection="column">
             
              <MainWrapper style={{ height: "30em"}}>
                {certifications.length &&
                  certifications.map((certification, i) => (
                    <SingleCertification
                      key={i}
                      value={singleCertification}
                      data="singleCertification"
                      certification={certification}
                      linkedCertification={linkedCertification}
                      updatingCertifications={updatingCertifications}
                      handleChange={this.handleChange}
                      handleUpdateCertification={this.handleUpdateCertification}
                      handleDeleteCertification={this.handleDeleteCertification}
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
                  placeholder="Add More"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em",color:"black" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingCertifications}
                  onClick={this.handleAddCertification}
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
                    Loading={addingCertifications}
                    onClick={this.toggleInput}
                  >
                    Add Certification
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

const mapStateToProps = ({ certifications,auth }) => ({
  addingCertifications:certifications.addingCertifications,
  addingCertificationsError:certifications.addingCertificationsError,
  certifications:certifications.certifications,
  certificationId:certifications.certificationId,
  userId: auth.userDetails.userId,
   orgId: auth.userDetails.organizationId,
   organizationId: auth.userDetails.organizationId,
   updatingCertifications:certifications.updatingCertifications,
   updatingCertificationsError:certifications.updatingCertificationsError,
   fetchingCertifications:certifications.fetchingCertifications,
   fetchingCertificationsError:certifications.fetchingCertificationsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCertification, 
       addCertification,
       removeCertification,
       updateCertification,
        searchCertificationName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Certification);
