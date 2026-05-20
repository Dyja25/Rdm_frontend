import { useNavigate } from "react-router-dom";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "antd";
import { ActionIcon } from "../../../../../Components/Utils";

function EmployeeDetailActionLeft () {

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

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailActionLeft)
);
