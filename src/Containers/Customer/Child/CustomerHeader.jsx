import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const CustomerActionLeft=lazy(()=> import("./CustomerActionLeft.jsx"));
const CustomerActionRight=lazy(()=> import("./CustomerActionRight.jsx"));

class CustomerHeader extends Component {
  render() {
    const {
      handleCustomerModal,
      viewType,
      setCustomerViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <CustomerActionLeft
            viewType={viewType}
            setCustomerViewType={setCustomerViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <CustomerActionRight
            viewType={viewType}

            handleCustomerModal={handleCustomerModal} />
          }
        />
      </div>
    );
  }
}

export default CustomerHeader;
