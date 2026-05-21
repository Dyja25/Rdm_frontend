import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput, Title } from "../../../Components/UI/Elements";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import SingleDepartment from "./SingleDepartment";
import {
  getDepartments,
  addDepartments,
  // removeDepartments,
  updateDepartments,
} from "./DepartmentAction";
import {
  getSectors,
 
} from "../Sectors/SectorsAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { Select } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

const { Option } = Select;

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDepartments: [],
      isTextInputOpen: false,
      addingDepartment: false,
      departmentName: "",
      singleDepartment: "",
      sectorId:"",
      editInd:true,

    };
  }
  
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  
  handleSectorId = (value) =>
    this.setState({ sectorId: value });

  handleAddDepartment = () => {
    const { addDepartments, departments } = this.props;
    const { departmentName, addingDepartments, isTextInputOpen,sectorId,editInd } = this.state;
    let department = { departmentName,sectorId,editInd};

    let exist =
    departments &&
    departments.some((element) => element.departmentName == departmentName);

    if (exist) {
      message.error(
        "Can't create as another departmentName exists with same name!"
      );
    } else {
      addDepartments(department, () => console.log("add department callback"));
    }

    this.setState({
        departmentName: "",
      singleDepartment: "",
      sectorId:"",
      sectorName:"",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDepartment = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateDepartment = (departmentId, departmentName, sectorId,sectorName, editInd,cb) => {
    this.props.updateDepartments(departmentId, departmentName, sectorId,sectorName,editInd,cb);
    this.setState({ departmentName: "", singleDepartment: "" ,sectorId:"",sectorName:"",editInd:true});
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
    const { getDepartments,getSectors } = this.props;
    console.log();
    getDepartments(getDepartments);
    getSectors();
  }
  render() {
    const {
      fetchingDepartments,
      fetchingDepartmentsError,
      departments,
      addingDepartments,
      updatingDepartments,
      values,
      
    } = this.props;
    const {
      isTextInputOpen,
      departmentName,
      singleDepartment,
      linkedDepartments,
      sectorId
    } = this.state;
    if (fetchingDepartments) return <p>Loading ...</p>;
    if (fetchingDepartmentsError) return <p>Error ...</p>;

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
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
                {departments.length &&
                  departments.map((department, i) => (
                    <SingleDepartment
                      key={i}
                      value={singleDepartment}
                      name="singleDepartment"
                      department={department}
                      linkedDepartments={linkedDepartments}
                      updatinDepartments={updatingDepartments}
                      handleChange={this.handleChange}
                      handleSectorId={this.handleSectorId}
                      handleUpdateDepartment={this.handleUpdateDepartment}
                      sectors={this.props.sectors}
                      // handleDeleteDepartment={this.handleDeleteDepartment}
                    />
                  ))}
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer justifyContent="space-between">
              <div style={{width:"35%"}}>
              <TextInput
                  placeholder="Add Type"
                  name="departmentName"
                  value={departmentName}
                  onChange={this.handleChange}
                  width={"100%"}   
                />   
              </div> 
              <div style={{width:"35%"}}>
              <Select    
                 style={{ width:"100%"}}          
               placeholder="Select Sectors"
               onChange={this.handleSectorId}
               >
                            {this.props.sectors.map((item) => {
                                return <Option value={item.sectorId}>{item.sectorName} </Option>;
                            })}
               </Select>   
              </div> 
              <div style={{width:"20%"}}>
              <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!departmentName}
                  Loading={addingDepartments}
                  onClick={this.handleAddDepartment}
                  // style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage
                                        id="app.save"
                                        defaultMessage="Save"
                                      />
                </Button>
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                                      <FormattedMessage
                                        id="app.cancel"
                                        defaultMessage="Cancel"
                                      />
                </Button>              
              </div> 
              </FlexContainer>
            ) : (
              <>                
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingDepartments}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addtype"
                      defaultMessage="Add Type"
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

const mapStateToProps = ({ departments,sector }) => ({
  addingDepartments: departments.addingDepartments,
  addingDepartmentsError: departments.addingDepartmentsError,
  departments: departments.departments,

  // removingDepartments: departments.removingDepartments,
  // removingDepartmentsError: departments.removingDepartmentsError,
    updatinDepartments: departments.updatingDepartments,
    updatingDepartmentsError: departments.updatingDepartmentsError,
  fetchingDepartments: departments.fetchingDepartments,
  fetchingDepartmentsError:departments.fetchingDepartmentsError,
  sectors:sector.sectors,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addDepartments,
      // removeDepartments,
      updateDepartments,
      getSectors,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Department);