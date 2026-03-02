import React from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, IntlProvider } from "react-intl";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { bindActionCreators } from "redux";

function CustomerDetailActionLeft () {


       const navigate = useNavigate();
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
  <ArrowBackIcon
    onClick={() => {navigate(-1) }}
  />
</Tooltip>

      </FlexContainer>
    );
  }

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(CustomerDetailActionLeft)
);
