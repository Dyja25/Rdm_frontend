import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
 import SingleRole from "./SingleRole";
import {
    getRoles,
  addRoles,
  updateRoles,
   removeRoles,
//   updateDepartments,
} from "./RoleAction";
import {
  getDepartments,
} from "../../Department/DepartmentAction";
import axios from "axios";
// import { base_url } from "../../../Config/Auth";
import { Select } from "../../../../Components/UI/Elements";
const { Option } = Select;

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedRoles: [],
      isTextInputOpen: false,
      addingDepartment: false,
      roleType: "",
      singleRole: "",
      userId:"",
      orgId:"",
      departmentId:"",
      departmentName:"",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

    handleDepartment = (value) =>
    this.setState({ departmentId: value });  

    handleAddRole = () => {
    const { addRoles, roles,} = this.props;
    const { roleType,cb, addingRoles, isTextInputOpen,departmentId,editInd} = this.state;
    let role = { roleType,userId: this.props.userId, organizationId: this.props.organizationId,departmentId,editInd };

    let exist =
    roles &&
    roles.some((element) => element.roleType == roleType);

    if (exist) {
      message.error(
        "Can't create as another roleType exists with same name!"
      );
    } else {
      addRoles(role, () => console.log("add role callback"));
    }

    this.setState({
      roleType: "",
      singleRole: "",
      departmentId:"",
      departmentName: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDepartment = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleDeleteRole = (roleTypeId = { roleTypeId }) => {
    this.props.removeRoles(roleTypeId);
    this.setState({ roleType: "", singleRole: "" });
  };
  handleUpdateRole = (roleType ,roleTypeId, departmentId,departmentName,editInd,cb) => {
    this.props.updateRoles( roleType,roleTypeId,departmentId,departmentName,editInd, cb);
    this.setState({ roleType: "", singleRole: "",departmentId:"", departmentName:"",editInd:true});
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
    this.props.getRoles(this.props.organizationId); 
    this.props.getDepartments();
  }
  render() {
    const {
      fetchingRoles,
      fetchingRolesError,
      roles,
      addingRoles,
      updatingRoles,
    } = this.props;
    const {
      isTextInputOpen,
      roleType,
      orgId,
      userId,
      singleRole,
      linkedRoles
      // linkedRole,
    } = this.state;
    if (fetchingRoles) return <p>Loading ...</p>;
    if (fetchingRolesError) return <p>Error ...</p>;
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
                {roles.length &&
                  roles.map((role, i) => (
                    <SingleRole
                      key={i}
                       value={singleRole}
                      name="singleRole"
                       role={role}
                       linkedRoles={linkedRoles}
                       handleDeleteRole={this.handleDeleteRole}
                       updatinRoles={updatingRoles}
                       handleChange={this.handleChange}
                       handleUpdateRole={this.handleUpdateRole}
                       departments={this.props.departments}
                       handleDepartment={this.handleDepartment}
                      // handleDeleteDepartment={this.handleDeleteDepartment}
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
                   name="roleType"
                  value={roleType}
                   onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                <Select 
               style={{width:"30%"}}
               placeholder="Select Sectors"
               onChange={this.handleDepartment}
               >
                            {this.props.departments.map((item) => {
                                return <Option value={item.departmentId}>{item.departmentName} </Option>;
                            })}
               </Select>
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                   Loading={addingRoles}
                  onClick={this.handleAddRole}
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
                     Loading={addingRoles}
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

const mapStateToProps = ({ role ,auth,departments}) => ({
  addingRoles:role.addingRoles,
  addingRolesError: role.addingRolesError,
  roles: role.roles,
  departments: departments.departments,
   updatinRoles: role.updatingRoles,
   userId: auth.userDetails.userId,
     updatingRolesError: role.updatingRolesError,
    fetchingRoles: role.fetchingRoles,
    fetchingRolesError:role.fetchingRolesError,
    organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getRoles,
        addRoles,
        updateRoles,
        removeRoles,
        getDepartments
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Department);
