import React from "react";

import { useNavigate } from "react-router-dom";

import { FlexContainer } from "../../../../Components/UI/Layout";
import { Button,Tooltip  } from "antd";
import { connect } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import { bindActionCreators } from "redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PartnerDetailActionLeft () {
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
  connect(mapStateToProps, mapDispatchToProps)(PartnerDetailActionLeft)
);
