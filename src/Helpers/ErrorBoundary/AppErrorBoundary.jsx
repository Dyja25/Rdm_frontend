import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import error from "../../Assets/Images/i.png";
import { Button } from "antd";
import { Spacer } from "../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  handleRefreshPage() {
    window.location.reload();
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "4.6875em 1.25em"
            }}
          >
            <div
              style={{
                width: "25em",
                height: "25em",
                padding: "0.3125em 1.25em",
                /* border-radius: "50%"; */
                boxShadow: " 0 0.8125em 1.6875em -0.3125em rgba(50, 50, 93, 0.25)",
                backgroundColor: " #f5f5f5",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
                // margin-bottom: 0.625em;
                // margin-top: 0.625em;
              }}
            >
              <img
                src={error}
                style={{ height: "3.125em", width: "3.125em", borderRadius: "50%" }}
              ></img>
              <div>
                <h1
                  style={{
                    fontSize: "2.5em",
                    fontWeight: "37.5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  OOPS !
                </h1>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  &nbsp; &nbsp; It is a problem with us.
                  <br />
                  Please refresh your browser
                </h1>
              </div>
              <Spacer />
              <Button
                type="primary"
                icon="reload"
                onClick={() => this.handleRefreshPage()}
              >
                <FormattedMessage
                  id="app.retry"
                  defaultMessage="Retry"
                />
                {/* Retry */}
              </Button>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
