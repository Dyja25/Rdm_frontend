import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AppsIcon from "@mui/icons-material/Apps";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import PlannerShareForm from "./PlannerShareForm";

const PlannerActionLeft = (props) => {
  return (
    <FlexContainer alignItems="center">
      <Tooltip
        title={
          <FormattedMessage
            id="app.back"
            defaultMessage="Back"
          />
        }
      >
        <IconButton
          onClick={() => props.setPlannerViewType("table")}
          sx={{
            mr: 0.5,
            color: props.viewType === "table" ? "#1890ff" : "inherit",
          }}
        >
          <AppsIcon />
        </IconButton>
      </Tooltip>

      {props.viewType === "dashboard" && <PlannerShareForm />}
    </FlexContainer>
  );
};

export default PlannerActionLeft;
