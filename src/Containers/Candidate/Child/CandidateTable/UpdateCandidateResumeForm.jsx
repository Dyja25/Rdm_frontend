import React, { Component,PureComponent,useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLibrarys,
 
} from "../../../../Containers/Settings/Library/LibraryAction";

import axios from "axios";
import { FormattedMessage } from "react-intl";
// import AddCandidateModal from "./AddCandidateModal";
// import { handleCandidateModal,handleCandidateResumeModal } from "../CandidateAction";
// import {
//   getLibrarys,
 
// } from "../../../Containers/Settings/Library/LibraryAction";
import { Button } from "antd";

import * as Yup from "yup";
import { base_url } from "../../../../Config/Auth";
import { Spacer } from "../../../../Components/UI/Elements";

 import { 
  handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,

  
  
} 
from "../../CandidateAction";



import { FlexContainer } from "../../../../Components/UI/Layout";



class UpdateCandidateResumeForm extends PureComponent {
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
      .post(`https://develop.tekorero.com:6060/pdf/read`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
         
        }
      })
      .then(res => {
       
        ////debugger;
        console.log(res);
        this.props.handleResponseData(res.data);
      this.props.handleUpdateCandidateModal(true)
         this.props.handleupdateCandidateResumeModal(false)
        
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
      addCandidateModal,
      updateCandidateModal,
      handleUpdateCandidateModal
     
    } = this.props;
    // console.log(customerId);
    return (
    
      <>
      <input type="file" name="file" onChange={this.changeHandler} />
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
            onClick={() => 
                {
                  this.props.handleUpdateCandidateModal(true)
             this.props.handleResponseData(null)
         
          }
           
          }
          >
             {/* Update without resume */}
              <FormattedMessage
                    id="app.updatewithoutresume"
                    defaultMessage="Update without resume"
               />
          </Button>
        </div> 
     
              </FlexContainer>
             
         
      </>
      
      
    );
  
  }
  
//   <UpdateCandidateModal
//   candidateId={this.props.currentCandidateId}
//  updateCandidateModal={updateCandidateModal}
//  handleUpdateCandidateModal={handleUpdateCandidateModal}
//   handleSetCurrentCandidateId={this.props.handleSetCurrentCandidateId}
// /> 


}

const mapStateToProps = ({ auth,librarys,candidate, opportunity, contact, customer }) => ({
//   user: auth.userDetails,
 addingResumeForm:candidate.addingResumeForm,
 addCandidateModal: candidate.addCandidateModal,
 librarys: librarys.librarys,
 organizationId: auth.userDetails.organizationId,
 resumeForm:candidate.resumeForm,
 updateCandidateModal: candidate.updateCandidateModal,

 
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
      handleUpdateCandidateModal,
      handleupdateCandidateResumeModal,
     getLibrarys,

    //   addOpportunity,
    //  addResumeForm,
    //  handleCandidateResumeModal,
    //  handleCandidateModal,
    //  getLibrarys,
   
    //    getRecruiterName,
    //    getAllSalesList
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCandidateResumeForm);
