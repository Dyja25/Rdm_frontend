import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeDetailHeader from "./EmployeeDetailHeader.jsx";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getEmployeeById } from "../../../EmployeeAction";
const EmployeeDetailLeft = lazy(() => import("./EmployeeDetailLeft.jsx"));
const EmployeeDetailRight = lazy(() => import("./EmployeeDetailRight.jsx"));

function EmployeeDetails (props) {
     const { employeeId } = useParams();

  useEffect(() => {
      props.getEmployeeById(employeeId);
    }, []);
    const { singleEmployee, fetchingEmployeeById } = props;

    console.log(props.employeeId);
    return (
      <>
        <EmployeeDetailHeader />
        {props.fetchingEmployeeById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <EmployeeDetailLeft  singleEmployee= {singleEmployee}/>
                </div>
                <div style={{ width: "75%" }}>
                  <EmployeeDetailRight singleEmployee= {singleEmployee}/>
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  
}

const mapStateToProps = ({ employee }) => ({
  fetchingEmployeeById: employee.fetchingEmployeeById,
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getEmployeeById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
