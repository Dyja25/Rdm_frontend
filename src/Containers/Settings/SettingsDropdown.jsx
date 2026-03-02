import React from "react";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useNavigate, useLocation } from "react-router-dom";

import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem,
} from "../../Components/UI/Antd";

import {
  ApplicationWrapper,
  MainWrapper,
  FlexContainer,
} from "../../Components/UI/Layout";

/* ===========================
   SETTINGS MENU
=========================== */

const SettingsMenu = ({ pathName }) => {
  const navigate = useNavigate();

  return (
    <ApplicationWrapper>
      <MainWrapper>
        <StyledMenu>
          {/* Organization */}
          <StyledMenuItem key="organization">
            <a
              href="#"
              style={{
                color:
                  pathName === "/organization"
                    ? "#1890ff"
                    : "rgba(0, 0, 0, 0.65)",
              }}
              onClick={() => navigate("/organization")}
            >
              <FormattedMessage
                id="app.organization"
                defaultMessage="Organization"
              />
            </a>
          </StyledMenuItem>

          {/* Rules Engine */}
          <StyledMenuItem key="rules">
            <a
              href="#"
              style={{
                color:
                  pathName === "/rules"
                    ? "#1890ff"
                    : "rgba(0, 0, 0, 0.65)",
              }}
              onClick={() => navigate("/rules")}
            >
              <FormattedMessage
                id="app.rulesengine"
                defaultMessage="Rules Engine"
              />
            </a>
          </StyledMenuItem>

          {/* Category */}
          <StyledMenuItem key="category">
            <a
              href="#"
              style={{
                color:
                  pathName === "/categoryTab"
                    ? "#1890ff"
                    : "rgba(0, 0, 0, 0.65)",
              }}
              onClick={() => navigate("/categoryTab")}
            >
              <FormattedMessage
                id="app.category"
                defaultMessage="Category"
              />
            </a>
          </StyledMenuItem>

          {/* RecruitPro */}
          <StyledMenuItem key="recruit">
            <a
              href="#"
              style={{
                color:
                  pathName === "/recruite"
                    ? "#1890ff"
                    : "rgba(0, 0, 0, 0.65)",
              }}
              onClick={() => navigate("/recruite")}
            >
              <FormattedMessage
                id="app.recruitpro"
                defaultMessage="RecruitPro"
              />
            </a>
          </StyledMenuItem>

          <Menu.Divider />
        </StyledMenu>
      </MainWrapper>
    </ApplicationWrapper>
  );
};

/* ===========================
   SETTINGS DROPDOWN
=========================== */

const SettingsDropdown = ({ recriutmentInd }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const isActive =
    pathName === "/organization" ||
    pathName === "/rules" ||
    pathName === "/categoryTab" ||
    pathName === "/recruite";

  return (
    <StyledDropdown overlay={<SettingsMenu pathName={pathName} />}>
      <a href="#" style={{ height: 45, marginRight: 20 }}>
        <FlexContainer alignItems="center" style={{ height: "100%" }}>
          <SettingOutlined
            style={{
              fontSize: isActive ? "1.75em" : "1.375em",
              color: "#1890ff",
            }}
          />
        </FlexContainer>
      </a>
    </StyledDropdown>
  );
};

export default SettingsDropdown;
