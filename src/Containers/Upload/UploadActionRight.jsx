import React, {lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

//const CustomerShareForm=lazy(()=> import("./CustomerShareForm"));



class UploadActionRight extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }




  render() {
   
    return (
      <div class=" flex  items-center">
     
    
        
        <div className="max-sm:hidden">
             <Button
            type="primary"
            // onClick={() => handleCustomerModal(true)}
          >
                        
                        ADD
          
          </Button>
          <Button type="primary"  
        // onClick={() => this.props.handleCustomerImportModal(true)}
        >
          <UploadIcon className=" !text-icon"/>
          
            Import
          </Button>
        
        
         
          
     </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UploadActionRight)

