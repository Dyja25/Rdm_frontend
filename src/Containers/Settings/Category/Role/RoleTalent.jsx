import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
 import SingleRole from "./SingleRole";
import {
    getTalentRoles,
    addTalentRoles,
//   updateRoles,
//    removeRoles,
//   updateDepartments,
} from "./RoleAction";

import axios from "axios";
// import { base_url } from "../../../Config/Auth";
import { Select } from "../../../../Components/UI/Elements";
import SingleRoleTalent from "./SingleRoleTalent";
import { FormattedMessage } from "react-intl";
const { Option } = Select;

class RoleTalent extends Component {
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

    handleAddTalentRole = () => {
    const { addTalentRoles, roles,} = this.props;
    const { roleType,cb, addingTalentRoles, isTextInputOpen,editInd} = this.state;
    let role = { roleType,userId: this.props.userId, organizationId: this.props.organizationId,editInd };

    let exist =
    roles &&
    roles.some((element) => element.roleType == roleType);

    if (exist) {
      message.error(
        "Can't create as another roleType exists with same name!"
      );
    } else {
        addTalentRoles(role, () => console.log("add role callback"));
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

  componentDidMount() {
    this.props.getTalentRoles(this.props.orgId); 
    // this.props.getDepartments();
  }
  render() {
    const {
        fetchingTalentRoles,
        fetchingTalentRolesError,
        talentRoles,
      addingTalentRoles,
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
    if (fetchingTalentRoles) return <p>Loading ...</p>;
    if (fetchingTalentRolesError) return <p>Error ...</p>;
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
                {talentRoles.length &&
                  talentRoles.map((talentRole, i) => (
                    <SingleRoleTalent
                      key={i}
                       value={singleRole}
                      name="singleRole"
                       talentRole={talentRole}
                       linkedRoles={linkedRoles}
                       handleDeleteRole={this.handleDeleteRole}
                       updatinRoles={updatingRoles}
                       handleChange={this.handleChange}
                       handleUpdateRole={this.handleUpdateRole}
                      
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
                  placeholder="Add Role"
                   name="roleType"
                  value={roleType}
                   onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
              
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                   loading={addingTalentRoles}
                  onClick={this.handleAddTalentRole}
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
                  loading={addingTalentRoles}
                    onClick={this.toggleInput}
                  >
                     {/* Add Type */}
                    <FormattedMessage
                                          id="app.addtype"
                                          defaultMessage="Add Type"
                                        />
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

const mapStateToProps = ({ role ,auth,departments}) => ({
    addingTalentRoles:role.addingTalentRoles,
    addingTalentRolesError: role.addingTalentRolesError,
    talentRoles: role.talentRoles,
//   departments: departments.departments,
//    updatinRoles: role.updatingRoles,
//    userId: auth.userDetails.userId,
//      updatingRolesError: role.updatingRolesError,
fetchingTalentRoles: role.fetchingTalentRoles,
    fetchingRolesError:role.fetchingRolesError,
    orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTalentRoles,
        addTalentRoles,
        // updateRoles,
        // removeRoles,
       
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoleTalent);
