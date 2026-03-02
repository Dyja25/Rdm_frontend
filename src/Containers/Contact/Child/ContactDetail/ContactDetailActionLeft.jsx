import React from "react";
import { useNavigate } from "react-router-dom";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BackwardOutlined } from "@ant-design/icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ContactDetailActionLeft (props) {
      const navigate = useNavigate();
 
    return (
      <FlexContainer alignItems="center">
        {/* <ActionIcon
          style={{ marginRight: "0.3rem",color: "#1890ff" }}
          iconType="rollback"
         
          tooltiptitle={<FormattedMessage
            id="app.back"
            defaultMessage="Back"
          />}

        
          handleIconClick={() => this.props.history.goBack()}
        /> */}
        <Tooltip title="Back">
          <ArrowBackIcon style={{cursor:"pointer"}}
         onClick={() => {navigate(-1)
        }}
        />
        </Tooltip>
      </FlexContainer>
    );

}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(ContactDetailActionLeft)
);
