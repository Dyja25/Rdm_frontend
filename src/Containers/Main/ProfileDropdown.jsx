import React from "react";
import { Menu, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../Config/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem
} from "../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { ApplicationWrapper, MainWrapper } from "../../Components/UI/Layout";
import { logout } from "../Auth/AuthAction";

const ProfileMenu = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <ApplicationWrapper>
      <MainWrapper>
        <StyledMenu>
          <StyledMenuItem key="0">
            <span onClick={() => navigate("/profile")}> <FormattedMessage
              id="app.profile"
              defaultMessage="Profile"
            /></span>
          </StyledMenuItem>

          <StyledMenuItem key="2">
            <span onClick={() => navigate("/Permissions")}>
              {/* Permission */}
               <FormattedMessage
                                  id="app.permission"
                                  defaultMessage="Permission"
                                />
              </span>
          </StyledMenuItem>

          <StyledMenuItem key="3">
            <span onClick={() => navigate("/change-password")}>
              {/* Change Password */}
               <FormattedMessage
                                  id="app.changepassword"
                                  defaultMessage="Change Password"
                                />
            </span>
          </StyledMenuItem>

          <StyledMenuItem key="4">
            <span onClick={onLogout}> <FormattedMessage
                                  id="app.logout"
                                  defaultMessage="Logout"
                                /></span>
          </StyledMenuItem>

          <Menu.Divider />
        </StyledMenu>
      </MainWrapper>
    </ApplicationWrapper>
  );
};


const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails } = useSelector((state) => state.auth);
  const { fullName, imageId } = userDetails || {};

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <StyledDropdown
      overlay={<ProfileMenu onLogout={handleLogout} />}
      trigger={["click"]}
    >
      {imageId ? (
        <img
          src={`${base_url}/image/${imageId}`}
          alt="profile"
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      ) : (
        <Avatar
          size="large"
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {fullName?.charAt(0).toUpperCase()}
        </Avatar>
      )}
    </StyledDropdown>
  );
};

const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown)
);
