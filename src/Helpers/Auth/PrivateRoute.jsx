import React, { useEffect } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import axios from "axios";
import {
  setFiscalTimeIntervalReport,
} from "../../Containers/Auth/AuthAction";
const PrivateRoute = ({ token, setFiscalTimeIntervalReport, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      setFiscalTimeIntervalReport(
        JSON.parse(sessionStorage.getItem("userDetails"))
      );
    }
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // sessionStorage.clear();
          // navigate("/login");
          // message.error("Your session has expired. Please re-login.");
        }
        return Promise.reject(error);
      }
    );
    if (!token) {
      sessionStorage.clear();
      navigate("/login");
    }
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token, setFiscalTimeIntervalReport, navigate]);
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const mapStateToProps = ({ auth }) => ({
  token: auth.token || JSON.parse(sessionStorage.getItem("token")),
});
const mapDispatchToProps = {
  setFiscalTimeIntervalReport,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);