import  { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm, Tooltip, Input } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url } from "../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import dayjs from "dayjs";
import {
  getRoles,
  getRoleCount,
  addRoles,
  updateRoles,
  searchRoleName,
  removeRole,
  ClearReducerDataOfRole
} from "../Settings/Category/Role/RoleAction";
import { BundleLoader } from "../../Components/Placeholder";
import * as Yup from "yup";
import { MainWrapper } from "../../Components/UI/Layout";
import { getDepartments } from "../Settings/Department/DepartmentAction";
import { Select } from "../../Components/UI/Elements";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Number is too short").max(10, "Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5, "Number is too short").max(10, "Number is too long"),
  departmentName: Yup.string().required("Input needed!"),
});

const RolePopUpScreen = (props) => {
  const [selectedDept, setSelectedDept] = useState("");
  const [error, setError] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [roles, setRoleData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newRoleName, setRoleName] = useState('');
  console.log(props.departmentId)

  useEffect(() => {
    props.getRoles(props.organizationId);
    props.getDepartments();
    props.getRoleCount(props.orgId);
  }, [])

  const editRegion = (roleTypeId, name, department) => {
    setEditingId(roleTypeId);
    setRoleName(name);
    setSelectedDept(department);
  };

  const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDept(selectedDept);
  };

  const handleAddRole = () => {
    setAddingRegion(true);
    setRoleName("")
  };

  const handleUpdateRole = (region) => {
    let data = {
      roleTypeId: region.roleTypeId,
      organizationId: props.organizationId,
      userId: props.userId,
      roleType: newRoleName,
      departmentId: props.departmentId,
    }
    props.updateRoles(data, region.roleTypeId);
    setEditingId(null);
  }

  const handleRole = () => {
    // Check if the role name and department are both filled
    if (!newRoleName.trim()) {
      setError("Role is required.");
      return; // Prevent saving if role name is empty
    }

    

    // If both fields are valid, proceed with the save
    setError(""); // Clear previous errors
    let data = {
      roleType: newRoleName,
      organizationId: props.organizationId,
      userId: props.userId,
      department: props.departmentId,
    }

    props.addRoles(data, props.orgId);
    setAddingRegion(false); // Hide the add role form
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getRoles(props.organizationId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchRoleName(currentData,props.orgId);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setRoleName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.roles.length > 0) {
      setRoleData(props.roles);
    }
  }, [props.roles]);

  if (props.fetchingRoles) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-[95%]">
        <div className="flex flex-row">
        <div className="flex w-[18vw]">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 mr-2">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleType"}`}>
            <div className="circle-icon !text-base cursor-pointer text-[green]">
              <Tooltip placement="top" title="Download XL">
                <DownloadIcon />
              </Tooltip>
            </div>
          </a>
        </div>
        </div>
        <div>
          {addingRegion ? (
            <div className="flex items-center space-x-3 mt-2">
  {/* Add Role Input */}
  <input
    placeholder="Add Role"
    className="border border-gray-300 rounded-md h-[28px] w-[35%] p-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    value={newRoleName}
    onChange={(e) => setRoleName(e.target.value)}
  />




  {/* Error Message */}
  {error && <p className="text-red-500 text-xs">{error}</p>}

  {/* Save Button */}
  <button
    className="bg-green-500 text-white px-4 h-[28px] rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
    onClick={handleRole}
  >
    Save
  </button>

  {/* Cancel Button */}
  <button
    className="bg-red-500 text-white px-4 h-[28px] rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
    onClick={handleCancelAdd}
  >
    Cancel
  </button>
</div>

          ) : (
            <button
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleAddRole}
            >
              <DataSaverOnIcon className="!text-icon" /> Add  
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
       <MainWrapper className="h-[69vh] !mt-2">
  {props.departments.length === 0 ? (
    <div className="text-red-500 font-semibold text-sm ml-4 mt-2">
      Please add a department to create roles.
    </div>
  ) : !props.fetchingRoles && roles.length === 0 ? (
    <NodataFoundPage />
  ) : (
    roles
      .slice()
      .sort((a, b) => a.roleType.localeCompare(b.roleType))
      .map((region) => (
        <div
          className="flex rounded ml-1 font-bold border-[#0000001f] border bg-white p-2 justify-between items-center h-8 mt-1 shadow"
          key={region.roleTypeId}
        >
          <div className="flex flex-row items-center">
            {editingId === region.roleTypeId ? (
              <>
                <input
                  placeholder="Update Role"
                  className="border border-gray mr-1 ml-1 h-6"
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
                <select
                  className="customize-select h-6 items-center"
                  onChange={handleDeptChange}
                >
                  <option value="">Select Department</option>
                  {props.departments.map((item) => (
                    <option key={item.departmentId} value={item.departmentId}>
                      {item.departmentName}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <div style={{ width: "10rem" }}>{region.roleType}</div>
                <div className="w-[12rem] ml-1">
                  {region.department}
                  {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                    dayjs().format("DD/MM/YYYY") && (
                    <span className="text-xs ml-2 text-[tomato] font-bold">
                      New
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row items-center">
            {editingId === region.roleTypeId ? (
              <div>
                <button
                  className="bg-green-500 text-white p-2.5 rounded-md ml-1 mr-1"
                  onClick={() => handleUpdateRole(region)}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white p-2.5 rounded-md mr-1"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                {region.editInd && (
                  <BorderColorIcon
                    className="!text-icon text-red-600 cursor-pointer"
                    onClick={() =>
                      editRegion(
                        region.roleTypeId,
                        region.roleType,
                        region.department
                      )
                    }
                  />
                )}
              </>
            )}
            <Popconfirm
              title="Do you want to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                props.removeRole(region.roleTypeId, props.orgId)
              }
            >
              <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
            </Popconfirm>
          </div>
        </div>
      ))
  )}
</MainWrapper>

      </div>

      <div className="font-bold">
        Updated on {dayjs(props.roles && props.roles.length && props.roles[0].updationDate).format('YYYY-MM-DD')} by {props.roles && props.roles.length && props.roles[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ role, auth, departments }) => ({
  addingRoles: role.addingRoles,
  addingRolesError: role.addingRolesError,
  roles: role.roles,
  departments: departments.departments,
  updatinRoles: role.updatingRoles,
  userId: auth.userDetails.userId,
  updatingRolesError: role.updatingRolesError,
  fetchingRoles: role.fetchingRoles,
  fetchingRolesError: role.fetchingRolesError,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoles,
      getRoleCount,
      addRoles,
      updateRoles,
      getDepartments,
      searchRoleName,
      removeRole,
      ClearReducerDataOfRole
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RolePopUpScreen);
