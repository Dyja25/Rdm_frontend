import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { Tooltip } from "antd";

class CandidateDetailView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { tag_with_company,dateOfBirth, mobileNumber, linkedin,countryDialCode, designation,availableDate,emailId ,idNumber,gender,nationality,linkedin_public_url,idProof},
    } = this.props;
    return (
      <>

<CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email ID"
          />}
          
          value={emailId} 
          />

<CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.mobileNo"
            defaultMessage="Mobile #"
          />}
          value= {`${countryDialCode || ""} ${mobileNumber || ""}`}/>
          {/* value=`{${countryDialCode} ${mobileNumber}}` /> */}

        <CandidateItemRow 
          label={<FormattedMessage
            id="app.linkedin"
            defaultMessage="Linkedin"
          />}
           value={linkedin_public_url ? linkedin_public_url : linkedin ? linkedin :"No Data"} />
     
      <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.availability"
            defaultMessage="Availability"
          />}

          value={this.props.candidate.availableDate === null ? "No Data" :
          <>
          
          {dayjs(availableDate).format("ll")}
          </>
          }
           />
  
        <CandidateItemRow //label="Company" 
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tag_with_company} />
       
            {/* <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} /> */}
           <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} />
           
           <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.identification"
            defaultMessage="Identification"
          />}
         
          value={`${idProof || ""} ${idNumber || ""}`}/>
          
           <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.nationality"
            defaultMessage="Nationality"
          />}
           value={nationality} />

          
           {/* <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.dateOfBirth"
            defaultMessage="Date of Birth"
          />}
           value={dateOfBirth} /> */}
            <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.gender"
            defaultMessage="Gender"
          />}
           value={gender} />
            
            <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.dateOfBirth"
            defaultMessage="Date Of Birth"
          />}
          value={this.props.candidate.dateOfBirth === null ? "No Data" :
          <>
          
          {dayjs(dateOfBirth).format("ll")}
          </>
          }
       
           />
           
           
      </>
    );
  }
}
export default CandidateDetailView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" ,overflow:"hidden",textOverflow:"ellipsis"}}>
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </SubTitle>
    </FlexContainer>
  );
};
