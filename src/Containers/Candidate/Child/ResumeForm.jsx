import React, { Component,PureComponent,useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "axios";

import { handleCandidateModal,handleCandidateResumeModal } from "../CandidateAction";
import {
  getLibrarys,
 
} from "../../../Containers/Settings/Library/LibraryAction";
import { Button } from "antd";


import { Spacer } from "../../../Components/UI/Elements";

 import { 
  addResumeForm,

  
  
} 
from "../CandidateAction";
import { FlexContainer } from "../../../Components/UI/Layout";

import dayjs from "dayjs";
import { anyalytic_url, base_url } from "../../../Config/Auth";
import { FormattedMessage } from "react-intl";


/**
 * yup validation scheme for creating a opportunity
 */

// const OpportunitySchema = Yup.object().shape({
//   opportunityName: Yup.string().required("Please provide Opportunity name"),
//   currency: Yup.string().required("Currency needed!"),
//   // startDate:Yup.string().required("Input needed!"),
//   // endDate:Yup.string().required("Input needed!"),
// });
class ResumeForm extends PureComponent {
  state={
    fileData:null,
    selectedFile:null,
    responseData:null,
  }
  handleSetFileData=(file)=>{
    this.setState({fileData:file})
  }
  handleReset = (resetForm) => {
    resetForm();
  };

  handleResumeUpload = () => {
    

    
    let formData = new FormData();
   formData.append("file", this.state.selectedFile);
   console.log(this.props.resumeForm.length&&this.props.resumeForm)
  
   
    

   this.props.addResumeForm(formData)
  }

  
 


	 changeHandler = (event) => {
    this.setState({
      selectedFile:(event.target.files[0])
      
    });
		// setSelectedFile(event.target.files[0]);
		// setIsSelected(true);
	};

	 handleSubmission = () => {
     console.log(this.state.selectedFile)
     console.log(this.props.librarys)
      // const skill=["Html","Css","Java"]
      // const skill=[this.props.librarys]
      //  const convertedString=this.props.librarys.reduce();
      const convertedArray = this.props.librarys.map((item)=> item.name)
      const convertedString = convertedArray.toString()
        // const convertedString=skill.toString();
     console.log(convertedString)
                 let formData = new FormData();
         formData.append("file", this.state.selectedFile);
     formData.append('skills',convertedString)
     console.log(formData)
    axios
      .post(`${anyalytic_url}/pdf/read`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
         
        }
      })
      .then(res => {
       
        ////debugger;
        console.log(res);
        this.props.handleResponseData(res.data);
      this.props.handleCandidateModal(true)
         this.props.handleCandidateResumeModal(false)
        
      })
      .catch(err => {
      
        console.log(err);
      
      });
  
	};

 

  componentDidMount() {
    const { getLibrarys,organizationId } = this.props;
    console.log();
    getLibrarys(organizationId);
  }
 



  render() {
    console.log("FormRender",this.state.fileData)
  
    


 
 
 
  
    const {
      // user:{userId},
      addingResumeForm,
      handleCandidateModal,
      addCandidateModal
     
    } = this.props;
    // console.log(customerId);
    return (
    
      <>
      <div>
      <input type="file" 
        accept=".pdf,.doc,.docx"
      name="file" onChange={this.changeHandler} />
        <div style={{ fontSize: "12px", color: "#888" }}>
    {/* Only PDF, DOC, DOCX files are allowed */}
    <FormattedMessage
         id="app.filesareallowed"
         defaultMessage="Upload Selected File"
                            />
  </div>
  </div>
      {/* <div>
				<button onClick={this.handleSubmission}>Submit</button>
        </div> */}
			

        <Spacer />
              <FlexContainer justifyContent="flex-end">
                  <div>
				<button onClick={()=>{
           this.handleSubmission();
          this.handleResumeUpload();

        }

        }
         style={{backgroundColor:"tomato",color:"white"}}
          
          >
            {/* Upload Selected File */}
             <FormattedMessage
                              id="app.uploadSelectedFile"
                              defaultMessage="Upload Selected File"
                            />
            </button>
        </div> 
             
        <div style={{marginLeft:"5px"}}>
				{/* <button 
        // onClick={this.handleSubmission}
        >
         Don't have resume handy
          </button> */}
             <Button
            type="primary"
           
            ghost
            onClick={() => {handleCandidateModal(true)
            this.props.handleResponseData(null)
         
          }
           
          }
          >
             {/* Don't have resume handy */}
              <FormattedMessage
                              id="app.donthaveresumehandy"
                              defaultMessage="Don't have resume handy"
                            />
          </Button>
        </div> 
     
              </FlexContainer>
             
       
      </>
      
    );
  
  }

}

const mapStateToProps = ({ auth,librarys,candidate, opportunity, contact, customer }) => ({
//   user: auth.userDetails,
 addingResumeForm:candidate.addingResumeForm,
 addCandidateModal: candidate.addCandidateModal,
 librarys: librarys.librarys,
 organizationId: auth.userDetails.organizationId,
 resumeForm:candidate.resumeForm

 
//   userId: auth.userDetails.userId,
//   organizationId: auth.userDetails.organizationId,
//   contactId: contact.contactByUserId.contactId,
//   customerId: customer.customer.customerId,
//   addingOpportunity: opportunity.addingOpportunity,
//   addingOpportunityError: opportunity.addingOpportunityError,
//   recruiterName:opportunity.recruiterName,
//   // salesUserIds:auth.userDetails.userId,
//   sales:opportunity.sales,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addOpportunity,
     addResumeForm,
     handleCandidateResumeModal,
     handleCandidateModal,
     getLibrarys,
   
    //    getRecruiterName,
    //    getAllSalesList
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);
