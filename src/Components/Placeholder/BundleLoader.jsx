import React from 'react'
import FWLogo1 from "../../assets/Images/stw-logo_page_1.png";

const BundleLoader = () => {
  return (
    <>
    <div className="flex justify-center items-center h-[83vh] w-full max-md:h-[80vh] max-xs:h-[34vh] max-sm:h-[70vh]">
      <div className="relative w-16 h-16">       
        <div style={{ borderStyle: 'inset' }} className="absolute w-full h-full border-4 border-t-4 border-blue-300  rounded-full animate-spin"></div>     
         <img 
          src={FWLogo1} // Use your image URL
          alt="Loading"
            loading="lazy"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 -mt-[0.1rem]"
        />
      </div>
    </div>
    </>

  )
}

export default BundleLoader





