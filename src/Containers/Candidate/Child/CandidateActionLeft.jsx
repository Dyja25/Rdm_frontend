import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FormattedMessage } from "react-intl";
import {
  getLibrarys,
} from "../../Settings/Library/LibraryAction";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { FlexContainer } from "../../../Components/UI/Layout";
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Input, Menu, Dropdown, Button, Tooltip, Radio, Space, Badge } from "antd";
import {
  inputCandidateDataSearch,
  inputCandidateSkillDataSearch,
  getRecords,
  getCandidateCategoryRecords,
  getCandidateCountSearch,
  getRecordsDelete,
  getRecordsBlack,
  // handleCandidateFilterModal
  //  getAllRecords,
} from "../CandidateAction";
import { StyledSelect } from "../../../Components/UI/Antd";
import { AudioOutlined, DeleteOutlined, FilterOutlined} from '@ant-design/icons';

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;

const CandidateActionLeft = (props) => {
  const[currentUser,setCurrentUser]=useState("");
  useEffect(() => {
    props.getLibrarys(props.orgId);
  }, []);

 const  handleDropChange = (value) => {
    setCurrentUser({ currentUser: value });
    props.getLibrarys(value);
    console.log("state", currentUser);
  };
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
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  console.log(transcript)




  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getCandidateCategoryRecords("White")
    } else if (props.viewType === "dashboard") {
      props.getCandidateCategoryRecords("blue")
    }
   else if (props.viewType === "black") {
    props.getRecordsBlack(props.userId)
  }
 else if (props.viewType === "map") {
  props.getRecordsDelete(props.userId)
}
    if (transcript) {
      console.log(">>>>>>>", transcript)
      props.setCurrentData(transcript)
    }

    //  props.getAllRecords(props.userId);
    // if (props.type === "All") {
    //   props.getAllRecords()
    // } else {
    //   props.getRecords(props.userId)
    // }
  }, [props.viewType, props.userId, transcript]);
  console.log(props.currentData, props.text)
  console.log(props.recordData.candidateDetails || 0)

  const { user } = props;

  const menu = (
    <Menu>
      <Menu.Item>
        <Radio.Group

        >

          {/* <Space direction="vertical"> */}
          <Radio value={'Role'}>Role</Radio>
          <Radio value={'Cost'}>Cost</Radio>
          {/* </Space> */}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  )

  const libraryData = props.librarys.map((item) => {
    return {
      label: `${item.name}`,
      value: item.definatinId,
    };
  });

  return (
    <FlexContainer alignItems="center" style={{ width: "128%" }}>
      {user.userType !== "USER" && user.department == "Vendor" && (
        <div style={{ width: "45%" }}>
          <Search
            placeholder="Search By Job ID"
            // onSearch={(value) => {
            //   props.inputCandidateSkillDataSearch(value);
            //   props.setCurrentSkillData(value);
            // }}
            allowClear={false}
            enterButton
          />
        </div>
      )}      
      {user.userType !== "USER" && user.department == "Vendor" && (
        <Button
          type={props.currentSkillData ? "primary" : "default"}
        // onClick={props.handleSkillClear}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
        </Button>
      )}


      <Tooltip
        title={<FormattedMessage id="app.all" defaultMessage="All" />}
      >
        <Badge size="small" count={props.viewType === "table" && props.recordData.candidateDetails || 0 } overflowCount={5000}>
          <span
            onClick={() => props.setCandidateViewType("table")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "table" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            <GroupsIcon/>
          </span>
        </Badge>
      </Tooltip>


      <Tooltip
        title={<FormattedMessage id="app.white" defaultMessage="White" />}
      >
        <Badge size="small" count={props.viewType === "list" && props.recordCandidateCategoryData.candidateDetails || 0 } overflowCount={5000}>
          <span
            onClick={() => props.setCandidateViewType("list")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "list" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
         <PermIdentityIcon/>         
          </span>
        </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.blue" defaultMessage="Blue" />}
      >
        <Badge size="small" count={props.viewType === "dashboard" && props.recordCandidateCategoryDataBlue.candidateDetails || 0 } overflowCount={5000}>
          <span
            onClick={() => props.setCandidateViewType("dashboard")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "dashboard" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
          
           <ManageAccountsIcon/>
          </span>
        </Badge>
      </Tooltip>

      <Tooltip title="Black">
      <Badge size="small" count={props.viewType === "black" && props.recordDataBlack.blocklist
      || 0} overflowCount={999}>   
          <span
            onClick={() => props.setCandidateViewType("black")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "black" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
           <Brightness1Icon/>
            </span>
            </Badge>   
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.deletedCandidate" defaultMessage="Deleted Candidate" />}
      > 
       <Badge size="small" count={props.viewType === "map" && props.recordDataDelete.deletedlist
      || 0} overflowCount={999}>    
        <span
          onClick={() => props.setCandidateViewType("map")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "map" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
          {/* <FontAwesomeIcon icon={solid("trash")} /> */}
          <DeleteOutlined/>
        </span>
        </Badge>
      </Tooltip>
  
      {user.userType !== "USER" && user.department !== "Vendor" && (
        <div>
          <Input
            placeholder="Search by Name & Identity ID"
            // enterButton="Search"
            width={"100%"}
            suffix={suffix}
            // onSearch={(value) => {
            //   props.inputCandidateDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
      )}
      &nbsp;
      
      {user.userType !== "USER" && user.department !== "Vendor" && props.currentData  && (
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputCandidateDataSearch(props.currentData);
            props.getCandidateCountSearch(props.currentData)
          }}
        >
          Submit
        </Button>
      )}
      &nbsp;
      
          

        <Button
        onClick={() => props.handleCandidateFilterModal(true)}
     
      >
        {/* <FontAwesomeIcon icon={solid("filter")} /> */}
        <FilterOutlined/>
      </Button>
      &nbsp;
      {user.userType !== "USER" && user.department !== "Vendor" && (
        <Button
          type={props.currentData ? "primary" : "danger"}
          // onClick={props.handleClear}
          onClick={() => {
            props.handleClear();
            props.getCandidateCountSearch()
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
      )}
      &nbsp; &nbsp;
   
      {/* {user.userType !== "USER" && user.department !== "Vendor" && ( 
      <div style={{ marginLeft: "20px" }}>
        <Search
          placeholder="Search By Skill"
          onSearch={(value) => {
            props.inputCandidateSkillDataSearch(value);
            props.setCurrentSkillData(value);
          }}
          allowClear={false}
          enterButton
        />
      </div>
      )} */}
       &nbsp; &nbsp; 
      {/* {user.userType !== "USER" && user.department !== "Vendor" && ( 
      <Button
        type={props.currentSkillData ? "primary" : "default"}
        onClick={props.handleSkillClear}
      >
        <FormattedMessage id="app.clear" defaultMessage="Clear" />
      </Button>
      )} */}
      
       {/* {props.inputCandidateDataSearch&& */}
       {props.candidateCountSearch.count ?<div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          #Search Items - {props.candidateCountSearch.count || 0}{" "}
        </div>:
        null}
        
        
        <div alignItems="centre">
                  <StyledSelect
                    placeholder="Select Skills"
                    //  defaultValue={partners}
                    onChange={(e) => handleDropChange(e)}
                  >
                    {props.librarys.map((item) => {
                      return (
                        <Option value={item.definationId}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </StyledSelect>
                </div>


 {/* }  */}
 {/* {props.fetchingCandidateCountSearchData? (
                 <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
                 # Result of your search - {props.candidateCountSearch.count || 0}{" "}
               </div>
              ) : (
              "Loading..."
                )} */}
      
     

    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, candidate,librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  recordData: candidate.recordData,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordAllData: candidate.recordAllData,
  fetchingCandidateInputSearchData:candidate.fetchingCandidateInputSearchData,
  recordCandidateCategoryData: candidate.recordCandidateCategoryData,
  recordCandidateCategoryDataBlue: candidate.recordCandidateCategoryDataBlue,
  type: candidate.type,
  fetchingCandidateCountSearchData:candidate.fetchingCandidateCountSearchData,
  candidateCountSearch:candidate.candidateCountSearch,
  recordDataBlack:candidate.recordDataBlack,
  recordDataDelete:candidate.recordDataDelete,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCandidateDataSearch,
      getCandidateCountSearch,
      inputCandidateSkillDataSearch,
      getRecords,
      getLibrarys,
      getCandidateCategoryRecords,
      getRecordsDelete,
      getRecordsBlack,
      // handleCandidateFilterModal

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateActionLeft);
