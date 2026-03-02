import React, { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import Logo from "../../assets/Images/Synergy.png";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addCompany} from "../Dashboard/DashboardAction"
import axios from "axios";

const CompanyInformation = ({ formData, setFormData, addCompany,handleNextStep, loading }) => {
    const navigate = useNavigate();
    const [sectorOpen, setSectorOpen] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);

    const [sizeOpen, setSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const sectorOptions = [
        "ESG Policies",
        "Risk Management",
        "Performance Measurement",
        "Stakeholder Engagement",
    ];

    const sizeOptions = ["SME", "Mid-Camp", "Large", "Enterprise"];

     const [localData, setLocalData] = useState({
    companyName: formData.companyInfo?.companyName || "",
    cin: formData.companyInfo?.cin || "",
    sector: formData.companyInfo?.sector || "",
    size: formData.companyInfo?.size || "",
    reportingPeriod: formData.companyInfo?.reportingPeriod || "",
    listed: formData.companyInfo?.listed || false,
    esgLicense: formData.companyInfo?.esgLicense || "",
  });


   const handleSaveAndContinue = async (e) => {
    e.preventDefault();

    // Update parent formData
    setFormData({
      ...formData,
      companyInfo: { ...localData },
    });

    // Call API for this step
    try {
       await addCompany(localData);
      // Move to next step after successful API
      handleNextStep();
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to save company info. Please try again.");
    }
  };

    return (
         <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-4 md:px-20 mt-9">
        <div className="max-w-lg w-full text-center">
          <h1 className="font-inter font-bold text-[24px] text-gray-900">
            Company Information
          </h1>
          <p className="text-gray-600 mb-4 font-inter">
            Please provide your company details
          </p>

          <form className="grid gap-4 mt-7" onSubmit={handleSaveAndContinue}>
            {/* Company Name */}
            <div>
              <label className="block text-sm font-inter font-bold mb-1">
                Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={localData.companyName}
                onChange={(e) =>
                  setLocalData({ ...localData, companyName: e.target.value })
                }
                placeholder="Start typing company name"
                className="w-full border rounded-md px-3 py-2 text-[#A3A3A3] focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* CIN */}
            <div>
              <label className="block text-sm font-inter font-bold">
                Company Identification Number (CIN)<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={localData.cin}
                onChange={(e) =>
                  setLocalData({ ...localData, cin: e.target.value })
                }
                placeholder="Enter 21-digit CIN"
                className="w-full border rounded-md px-3 py-2 text-[#A3A3A3] focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Sector */}
            <div className="relative">
              <label className="block text-sm font-inter font-bold mb-1">
                Sector / Sub-sector<span className="text-red-500">*</span>
              </label>
              <div
                className="w-full border rounded-md px-3 py-2 text-[#171717] font-inter cursor-pointer flex items-center justify-between"
                onClick={() => setSectorOpen(!sectorOpen)}
              >
                {localData.sector || "Select sector"}
                <span className="text-gray-400">&#9662;</span>
              </div>
              {sectorOpen && (
                <div className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10">
                  {sectorOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setLocalData({ ...localData, sector: option });
                        setSectorOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Company Size */}
            <div className="relative">
              <label className="block text-sm font-inter mb-1 font-bold">
                Company Size<span className="text-red-500">*</span>
              </label>
              <div
                className="w-full border rounded-md px-3 py-2 text-[#171717] font-inter cursor-pointer flex items-center justify-between"
                onClick={() => setSizeOpen(!sizeOpen)}
              >
                {localData.size || "Select company size"}
                <span className="text-gray-400">&#9662;</span>
              </div>
              {sizeOpen && (
                <div className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10">
                  {sizeOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setLocalData({ ...localData, size: option });
                        setSizeOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reporting Period */}
            <div>
              <label className="block text-[14px] font-bold mb-1">
                Reporting Period<span className="text-red-500">*</span>
              </label>
              <select
                value={localData.reportingPeriod}
                onChange={(e) =>
                  setLocalData({ ...localData, reportingPeriod: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select</option>
                <option value="2024-Q1">2024 Q1</option>
                <option value="2024-Q2">2024 Q2</option>
              </select>
            </div>

            {/* Listed */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={localData.listed}
                onChange={(e) =>
                  setLocalData({ ...localData, listed: e.target.checked })
                }
                className="h-4 w-4 text-green-500 focus:ring-green-500"
              />
              <span className="font-inter text-[14px]">Company is publicly listed</span>
            </div>

            {/* ESG License */}
            <div>
              <label className="block font-inter font-medium text-[14px] mb-1">
                ESG License / D-U-N-S Number (Optional)
              </label>
              <input
                type="text"
                value={localData.esgLicense}
                onChange={(e) =>
                  setLocalData({ ...localData, esgLicense: e.target.value })
                }
                placeholder="Enter number"
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-2">
              <button
                type="button"
                className="flex items-center px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                onClick={() => handleNextStep(false)} // just go back
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-2">Back</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={loading}
              >
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
    addCompany
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformation)


