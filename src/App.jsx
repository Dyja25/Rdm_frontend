import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { BundleLoader } from "./Components/Placeholder";
import PrivateRoute from "./Helpers/Auth/PrivateRoute.jsx"; // You might need to update this for v7
import '@fontsource/poppins/300.css';


const Login = lazy(() => import(/* @vite-prefetch */"./Containers/Auth/Login"));
const EmailValidation = lazy(() => import(/* @vite-prefetch */"./Containers/Auth/EmailValidation.jsx"));
const SetPassword = lazy(() => import(/* @vite-prefetch */"./Containers/Auth/SetPassword"));
const ForgotPassword = lazy(() => import(/* @vite-prefetch */"./Containers/Auth/ForgotPassword"));
const MainApp = lazy(() => import(/* @vite-prefetch */"./Containers/Main/MainApp.jsx"));

class App extends Component {
  render() {
    const { fetchingUserDetails } = this.props;

    const PrivateRouteWrapper = ({ children }) => {
      console.log(children);
      return fetchingUserDetails ? (
        <BundleLoader />
        // <p>Loading..</p>
      ) : (
        <PrivateRoute>{children}</PrivateRoute> // You need to make sure PrivateRoute works properly
      );
    };

    return (
      <div>
        <Suspense fallback={<BundleLoader />}>

          <Routes>
            {/* <Route
              path="/register/:type?"
              element={<Register />}
            /> */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/activationEmail/:employeeId/:token/:emailId/:organizationId"
              element={<EmailValidation />}
            />
            <Route
              path="/setPassword"
              element={<SetPassword />}
            />
           
            <Route
              path="/forgotPassword"
              element={<ForgotPassword />}
            />
           


            <Route
              path="/*"
              element={

                <PrivateRouteWrapper>
                  <MainApp />
                </PrivateRouteWrapper>
              }
            />
          </Routes>
        </Suspense>
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => ({
  fetchingUserDetails: auth.fetchingUserDetails,
});
export default connect(mapStateToProps)(App);


