import { useNavigate } from "react-router-dom";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "antd";

function EmployeeDetailActionLeft () {

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
  <ArrowBackIcon className="!cursor-pointer"
    onClick={() => {navigate(-1) }}
  />
</Tooltip>
      </FlexContainer>
    );
  }

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailActionLeft)
);
