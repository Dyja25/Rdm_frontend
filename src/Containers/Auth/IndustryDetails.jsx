// import React, { useState } from "react";
// import { X, ChevronLeft, Factory, Zap, Landmark, Heart, Leaf, Monitor } from "lucide-react";
// import Logo from "../../assets/Images/Synergy.png";
// import { useNavigate } from "react-router-dom";

// const IndustryDetails = () => {
//     const navigate = useNavigate();
//     const [industry, setIndustry] = useState("Select Industry");
//     const [open, setOpen] = useState(false);

//     const [subCategory, setSubCategory] = useState("Select Sub-Category");
//     const [openSub, setOpenSub] = useState(false);

//     const options = [
//         { label: "Manufacturing", icon: <Factory size={18} /> },
//         { label: "Energy & Utilities", icon: <Zap size={18} /> },
//         { label: "Financial Service", icon: <Landmark size={18} /> },
//         { label: "Healthcare & Pharma", icon: <Heart size={18} /> },
//         { label: "Agriculture & Food", icon: <Leaf size={18} /> },
//         { label: "Technology", icon: <Monitor size={18} /> },
//     ];

//     const subOptions = ["Electronics", "Cement", "Stills", "Garments Products"];

//     return (
//         <div className="min-h-screen flex flex-col bg-white">
          

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col items-center px-4 md:px-20 mt-9">
//                 <div className="max-w-lg w-full">
//                     {/* Title */}
//                     <div className="text-center">
//                         <h1 className="font-inter font-medium text-[24px] leading-[32px] tracking-[0%] text-[#171717] text-center">
//                             Industry Details
//                         </h1>
//                         <p className="text-gray-600 mb-4 font-inter">Please provide your industry details</p>
//                     </div>

//                     {/* separation line */}
//                     <div className="w-[510px] bg-gray-300 pb-[1.5px] mt-1"></div>

//                     {/* Form Fields */}
//                     <form className="grid gap-4 mt-3">
//                         {/* Industry Category with custom dropdown */}
//                         <div>
//                             <label className="block text-sm font-inter font-bold">
//                                 Industry Category<span className="text-red-500">*</span>
//                             </label>

//                             <div className="w-full">
//                                 {/* Dropdown button */}
//                                 <div
//                                     className="border rounded px-3 py-2 flex justify-between items-center cursor-pointer"
//                                     onClick={() => setOpen(!open)}
//                                 >
//                                     <span className="font-inter text-[14px]">{industry}</span>
//                                     <span className="text-gray-500">▼</span>
//                                 </div>

//                                 {/* Dropdown menu */}
//                                 {open && (
//                                     <div className="mt-1 border rounded shadow bg-white">
//                                         <p className="px-3 py-2 text-xs text-gray-400 font-medium">
//                                             SELECT INDUSTRY
//                                         </p>
//                                         <ul>
//                                             {options.map((opt, idx) => (
//                                                 <li
//                                                     key={idx}
//                                                     className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                                                     onClick={() => {
//                                                         setIndustry(opt.label);
//                                                         setOpen(false);
//                                                     }}
//                                                 >
//                                                     {opt.icon}
//                                                     <span>{opt.label}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Sub-Category with custom dropdown */}
//                         <div>
//                             <label className="block text-sm font-inter font-bold">
//                                 Sub-Category<span className="text-red-500">*</span>
//                             </label>

//                             <div className="w-full">
//                                 {/* Dropdown button */}
//                                 <div
//                                     className="border rounded px-3 py-2 flex justify-between items-center cursor-pointer"
//                                     onClick={() => setOpenSub(!openSub)}
//                                 >
//                                     <span className="font-inter text-[14px]">{subCategory}</span>
//                                     <span className="text-gray-500">▼</span>
//                                 </div>

//                                 {/* Dropdown menu */}
//                                 {openSub && (
//                                     <div className="mt-1 border rounded shadow bg-white">
//                                         <p className="px-3 py-2 text-xs text-gray-400 font-medium">
//                                             SELECT SUB-CATEGORY
//                                         </p>
//                                         <ul>
//                                             {subOptions.map((opt, idx) => (
//                                                 <li
//                                                     key={idx}
//                                                     className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                                                     onClick={() => {
//                                                         setSubCategory(opt);
//                                                         setOpenSub(false);
//                                                     }}
//                                                 >
//                                                     {opt}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* ESG License */}
//                         <div>
//                             <label className="block font-inter font-bold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717] mb-1">
//                                 ESG License / D-U-N-S Number (Optional)
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter number"
//                                 className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-inter font-bold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717] mb-1">
//                                 ESG Data Reporting Head
//                             </label>
//                             <label className="block font-inter font-bold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717] mb-1">
//                                 Name
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter name here"
//                                 className="w-full border rounded-md px-3 text-[#A3A3A3] py-2 focus:ring-green-500 focus:border-green-500 fon-inter"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-inter font-bold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717] mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter email address"
//                                 className="w-full border rounded-md px-3 text-[#A3A3A3] py-2 focus:ring-green-500 focus:border-green-500 fon-inter"
//                             />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-between mt-2">
//                             <button
//                                 type="button"
//                                 className="flex items-center px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
//                                 onClick={() => navigate("/company-info")}
//                             >
//                                 <ChevronLeft className="h-5 w-5" />
//                                 <span className="ml-2">Back</span>
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                             >
//                                 Save and Continue
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default IndustryDetails;


import React, { useState } from "react";
import { ChevronLeft, Factory, Zap, Landmark, Heart, Leaf, Monitor } from "lucide-react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addIndustry} from "../Dashboard/DashboardAction"

const IndustryDetails = ({ formData, setFormData, addIndustry,handleNextStep, loading }) => {
  const [industry, setIndustry] = useState(formData.industryInfo?.industry || "Select Industry");
  const [open, setOpen] = useState(false);

  const [subCategory, setSubCategory] = useState(formData.industryInfo?.subCategory || "Select Sub-Category");
  const [openSub, setOpenSub] = useState(false);

  const [esgLicense, setEsgLicense] = useState(formData.industryInfo?.esgLicense || "");
  const [reportingHeadName, setReportingHeadName] = useState(formData.industryInfo?.reportingHeadName || "");
  const [reportingHeadEmail, setReportingHeadEmail] = useState(formData.industryInfo?.reportingHeadEmail || "");

  const options = [
    { label: "Manufacturing", icon: <Factory size={18} /> },
    { label: "Energy & Utilities", icon: <Zap size={18} /> },
    { label: "Financial Service", icon: <Landmark size={18} /> },
    { label: "Healthcare & Pharma", icon: <Heart size={18} /> },
    { label: "Agriculture & Food", icon: <Leaf size={18} /> },
    { label: "Technology", icon: <Monitor size={18} /> },
  ];

  const subOptions = ["Electronics", "Cement", "Stills", "Garments Products"];

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();

    const dataToSave = {
      industry,
      subCategory,
      esgLicense,
      reportingHeadName,
      reportingHeadEmail,
    };

    // Update parent formData
    setFormData({
      ...formData,
      industryInfo: dataToSave,
    });

    try {
      await addIndustry(dataToSave)
      handleNextStep();
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to save industry info. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center px-4 md:px-20 mt-9">
        <div className="max-w-lg w-full text-center">
          <h1 className="font-inter font-medium text-[24px] leading-[32px] text-[#171717]">Industry Details</h1>
          <p className="text-gray-600 mb-4 font-inter">Please provide your industry details</p>

          <form className="grid gap-4 mt-3" onSubmit={handleSaveAndContinue}>
            {/* Industry */}
            <div>
              <label className="block text-sm font-inter font-bold">Industry Category<span className="text-red-500">*</span></label>
              <div className="w-full">
                <div className="border rounded px-3 py-2 flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
                  <span className="font-inter text-[14px]">{industry}</span>
                  <span className="text-gray-500">▼</span>
                </div>
                {open && (
                  <div className="mt-1 border rounded shadow bg-white">
                    <p className="px-3 py-2 text-xs text-gray-400 font-medium">SELECT INDUSTRY</p>
                    <ul>
                      {options.map((opt, idx) => (
                        <li key={idx} className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                            onClick={() => { setIndustry(opt.label); setOpen(false); }}>
                          {opt.icon} <span>{opt.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sub-Category */}
            <div>
              <label className="block text-sm font-inter font-bold">Sub-Category<span className="text-red-500">*</span></label>
              <div className="w-full">
                <div className="border rounded px-3 py-2 flex justify-between items-center cursor-pointer" onClick={() => setOpenSub(!openSub)}>
                  <span className="font-inter text-[14px]">{subCategory}</span>
                  <span className="text-gray-500">▼</span>
                </div>
                {openSub && (
                  <div className="mt-1 border rounded shadow bg-white">
                    <p className="px-3 py-2 text-xs text-gray-400 font-medium">SELECT SUB-CATEGORY</p>
                    <ul>
                      {subOptions.map((opt, idx) => (
                        <li key={idx} className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                            onClick={() => { setSubCategory(opt); setOpenSub(false); }}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* ESG License */}
            <div>
              <label className="block font-inter font-bold text-[14px] mb-1">ESG License / D-U-N-S Number (Optional)</label>
              <input type="text" value={esgLicense} onChange={(e) => setEsgLicense(e.target.value)}
                     placeholder="Enter number"
                     className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"/>
            </div>

            {/* Reporting Head */}
            <div>
              <label className="block font-inter font-bold text-[14px] mb-1">ESG Data Reporting Head</label>
              <label className="block font-inter font-bold text-[14px] mb-1">Name</label>
              <input type="text" value={reportingHeadName} onChange={(e) => setReportingHeadName(e.target.value)}
                     placeholder="Enter name here"
                     className="w-full border rounded-md px-3 py-2 text-[#A3A3A3] focus:ring-green-500 focus:border-green-500"/>
            </div>

            <div>
              <label className="block font-inter font-bold text-[14px] mb-1">Email</label>
              <input type="text" value={reportingHeadEmail} onChange={(e) => setReportingHeadEmail(e.target.value)}
                     placeholder="Enter email address"
                     className="w-full border rounded-md px-3 py-2 text-[#A3A3A3] focus:ring-green-500 focus:border-green-500"/>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-2">
              <button type="button" className="flex items-center px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                      onClick={() => handleNextStep(false)}>
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-2">Back</span>
              </button>
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" disabled={loading}>
                {loading ? "Saving..." : "Save and Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ customer, auth, candidate }) => ({
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    addIndustry
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndustryDetails)



