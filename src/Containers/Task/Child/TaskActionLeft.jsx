import React from "react";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Button } from "antd";

// function handleRefreshPage() {
//   window.location.reload();
// }
const TaskActionLeft = props => {
  return (
    <FlexContainer alignItems="center">
      {/* <Button type="primary" icon="reload" onClick={() => handleRefreshPage()}>
        Refresh
      </Button> */}
    </FlexContainer>
    // <FlexContainer alignItems='center'>
    //     <ActionIcon
    //         style={{ marginRight: '0.3rem', color: props.viewType === 'grid' && '#1890ff' }}
    //         iconType='appstore-o'
    //         tooltipTitle='GRID VIEW'
    //         handleIconClick={() => props.setTaskViewType('grid')}
    //     />
    //     <ActionIcon
    //         style={{ marginRight: '0.3rem', color: props.viewType === 'table' && '#1890ff'  }}
    //         iconType='table'
    //         tooltipTitle='Table VIEW'
    //         handleIconClick={() => props.setTaskViewType('table')}
    //     />
    // </FlexContainer>
  );
};

export default TaskActionLeft;
