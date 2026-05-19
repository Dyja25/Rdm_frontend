import React from "react";
import { useNavigate } from "react-router-dom";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BackwardOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { ActionIcon } from "../../../../Components/Utils";

function ContactDetailActionLeft (props) {
      const navigate = useNavigate();
 
    return (
      <FlexContainer alignItems="center">
       <ActionIcon
        style={{ marginRight: "0.3rem", color: "#1890ff" }}
        iconType="arrowBack"
        tooltipTitle={
          <FormattedMessage
            id="app.back"
            defaultMessage="Back"
          />
        }
        handleIconClick={() => navigate(-1)}
      />
      </FlexContainer>
    );

}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(ContactDetailActionLeft)
);
