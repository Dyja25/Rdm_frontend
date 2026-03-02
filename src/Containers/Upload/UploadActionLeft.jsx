import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TocIcon from '@mui/icons-material/Toc';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Input, Tooltip, Badge, Avatar } from "antd";



import MicIcon from '@mui/icons-material/Mic';


import BackpackIcon from '@mui/icons-material/Backpack';

import dayjs from "dayjs";
import PeopleIcon from '@mui/icons-material/People';


const { Search } = Input;

const UploadActionLeft = (props) => {


  return (
    <div class=" flex items-center max-sm:overflow-y-auto max-sm:w-64 ml-1" style={{scrollbarWidth:"thin"}}>
  
      

   

 <PeopleIcon 
 onClick={() => props.handleClick("list")}
  style={{
            // width: "120px",
            // height: "120px",
            backgroundColor: props.activeIcon === "list" ? "red" : "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
 className="text-white !text-icon cursor-pointer" />
  <TocIcon 
   onClick={() => props.handleClick("table")}
  style={{
            // width: "120px",
            // height: "120px",
            backgroundColor: props.activeIcon === "table" ? "red" : "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
  className="text-white !text-icon cursor-pointer" />
    
 
    

       
     

   


   

     
   
   
  

    </div>
  );
};

const mapStateToProps = ({ auth, shipper }) => ({
  user: auth.userDetails,
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadActionLeft);
