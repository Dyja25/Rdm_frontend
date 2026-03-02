import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tooltip from "antd/lib/tooltip";

// 👉 import * as MUI icons
import * as MuiIcons from "@mui/icons-material";

const StyledIconWrapper = styled.span`
  font-size: ${(props) => props.size || "1.5625em"};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const ActionIcon = (props) => {
  const { tooltipTitle, iconType, handleIconClick, size, ...rest } = props;

  // convert "edit" → "Edit"
  const iconName =
    iconType.charAt(0).toUpperCase() + iconType.slice(1);

  const IconComponent = MuiIcons[iconName];

  if (!IconComponent) {
    console.warn(`MUI icon "${iconName}" not found`);
    return null;
  }

  return (
    <Tooltip title={tooltipTitle || ""}>
      <StyledIconWrapper onClick={handleIconClick} size={size}>
        <IconComponent fontSize="inherit" {...rest} />
      </StyledIconWrapper>
    </Tooltip>
  );
};

ActionIcon.propTypes = {
  tooltipTitle: PropTypes.string,
  iconType: PropTypes.string, // "edit", "delete", "add"
  handleIconClick: PropTypes.func,
  size: PropTypes.string,
};

export default ActionIcon;
