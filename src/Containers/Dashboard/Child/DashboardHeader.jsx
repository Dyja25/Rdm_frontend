import { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
  import DashboardActionLeft from "./DashboardActionLeft.jsx";
 import DashboardActionRight from "./DashboardActionRight.jsx";
class DashboardHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
           leftComponent={<DashboardActionLeft />}
          rightComponent={<DashboardActionRight />}
        />
      </div>
    );
  }
}

export default DashboardHeader;
