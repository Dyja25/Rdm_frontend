import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";

import { FlexContainer } from "../../../Components/UI/Layout";
import { Input, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { AudioOutlined, DeleteOutlined, FilterOutlined} from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { Button,Badge } from "antd";

import { inputContactDataSearch,getRecords,getCustomerRecords } from "../ContactAction";
import { BuildOutlined, ShakeOutlined } from "@ant-design/icons";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HandshakeIcon from "@mui/icons-material/Handshake";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactActionLeft = (props) => {

   const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     debugger;

  //     props.getCatagory();
  //   }
  // }, [props.viewType]);
  // useEffect(() => {
  //   props.getRecords(props.userId);
  // }, []);
  useEffect(() => {
    if (props.viewType === "table") {
    props.getRecords(props.userId,"partner");
  } else if (props.viewType === "dashboard") {
    props.getCustomerRecords(props.userId)
  }
    if (transcript) {
      console.log(">>>>>>>", transcript)
      props.setCurrentData(transcript)
    }
}, [props.userId,props.viewType,transcript]);
console.log(props.customerRecordData)

const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}

      // onClick={() => {
      //   // this.handleContactPopoverVisibleChange();
      //   // handleLinkContactModal(true);
      // }}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}


    />
  );
  
  return (
   
    <FlexContainer alignItems="center">
      <Tooltip
        title={<FormattedMessage id="app.customer" defaultMessage="Customer" />}
      >
         <Badge size="small" count={props.customerRecordData.customerDetails} overflowCount={5000}>
        <span
          onClick={() => props.setContactsViewType("dashboard")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "#1890ff",
            fontSize: "1.56em",
            cursor: "pointer",
          }}
        >
          {/* <i class="far fa-building"></i> */}
          {/* <BuildOutlined/> */}
          <ApartmentIcon />
        </span>
        </Badge>
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.vendor" defaultMessage="Vendor" />}
      >
        <Badge size="small" count={props.recordData.record || 0}>
        <span
          onClick={() => props.setContactsViewType("table")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "#1890ff",
            fontSize: "1.56em",
            cursor: "pointer",
          }}
        >
          <i class="far fa-handshake"></i>
          {/* <i class="far fa-handshake"></i> */}
          {/* <HandshakeIcon/> */}
        </span>
        </Badge>
      </Tooltip>  

       <div style={{marginLeft:"26px"}}>
                <Input
                  placeholder="Search by Name & Identity ID"
                  // enterButton="Search"
                  width={"100%"}
                  suffix={suffix}
                  // onSearch={(value) => {
                  //   props.inputCandidateDataSearch(value);
                  //   props.setCurrentData(value);
      
                  // }}
                  onChange={(e) => props.setCurrentData(e)}
                  value={props.currentData}
                />
              </div>
          
            &nbsp;
            
          
             <Button
  type={props.currentData ? "primary" : "danger"}
  onClick={() => {
    if (props.viewType === "dashboard") {
      props.inputContactDataSearch(props.currentData, "Customer",props.viewType);
    } else {
      props.inputContactDataSearch(props.currentData, "Partner",props.viewType);
    }
  }}
>
  Submit
</Button>



           
            &nbsp;   
               <Button
                      type={props.currentData ? "primary" : "danger"}
                      // onClick={props.handleClear}
                      onClick={() => {
                        props.handleClear();
                        // props.getCandidateCountSearch()
                      }}
                    >
                      <FormattedMessage id="app.clear" defaultMessage="Clear" />
                      {/* Clear */}
                    </Button> 
      

     
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth,contact }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  recordData: contact.recordData,
  customerRecordData:contact.customerRecordData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputContactDataSearch,
      getRecords,
      getCustomerRecords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactActionLeft);
