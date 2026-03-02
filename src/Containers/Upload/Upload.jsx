import React,{useState} from 'react'
//import DocumentUpload from '../../Components/Forms/Formik/DocumentUpload'
//import UploadHeader from "../Upload/UploadHeader"
import DocumentUploadList from "../Upload/DocumentUploadList"

const Upload = () => {
   const [activeIcon, setActiveIcon] = useState("list");
    const handleClick = (type) => {
    setActiveIcon(type === activeIcon ? null : type); // toggle selection
  };
  return (
    <div>
       {/* <UploadHeader
       handleClick={handleClick}
       activeIcon={activeIcon}
     
        /> */}
    
                
    <DocumentUploadList/>
         

    </div>
  )
}

export default Upload
