import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const PublishActionLeft=lazy(()=> import("./PublishActionLeft.jsx"));
//const CustomerActionRight=lazy(()=> import("./PublishActionRight"));

class PublishHeader extends Component {
  render() {
    const {
    //   handlePublishModal,
    //   viewType,
    //   setPublishViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PublishActionLeft
            // viewType={viewType}
            // setPublishViewType={setPublishViewType}
            //   currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
        //   rightComponent={
        //     <PublishActionRight
        //     viewType={viewType}

        //     handlePublishModal={handlePublishModal} />
        //   }
        />
      </div>
    );
  }
}

export default PublishHeader;