import React from "react";
import { X, Check } from "lucide-react";
import Logo from "../../assets/Images/Synergy.png";
import { UserRoundPlus } from 'lucide-react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

// Dummy data for graphs
const scope1Data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 220 },
  { name: "Mar", value: 210 },
  { name: "Apr", value: 240 },
  { name: "May", value: 230 },
];

const scope2Data = [
  { name: "Jan", value: 180 },
  { name: "Feb", value: 190 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 185 },
  { name: "May", value: 195 },
];

const Final = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
   

      {/* 🔹 Main Content - scrollable */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* -------- Left Section -------- */}
        <div className="bg-white rounded-none shadow-none px-6 py-6 h-full">
          {/* ESG Performance Overview */}
          <div>
            <h2 className="font-inter font-medium text-[24px] leading-[32px] text-[#171717] mb-4">
              ESG Performance Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scope 1 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-inter font-normal text-[14px] leading-[20px] text-[#5C5C5C] tracking-[-0.6%]">
                  Scope 1 Emissions
                </h3>
                <p className="font-inter-display font-medium text-[32px] leading-[40px] tracking-[-0.5%] text-[#171717] mt-2">
                  234.9k <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.6%] text-[#5C5C5C]">
                    tCO2e
                  </span>
                </p>

                <div className="h-28 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scope1Data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={false} />
                      <Tooltip cursor={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Scope 2 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-inter font-normal text-[14px] leading-[20px] text-[#5C5C5C] tracking-[-0.6%]">
                  Scope 2 Emissions
                </h3>
                <p className="font-inter-display font-medium text-[32px] leading-[40px] tracking-[-0.5%] text-[#171717] mt-2">
                  189.4k <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.6%] text-[#5C5C5C]">
                    tCO2e
                  </span>
                </p>
                <div className="h-28 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scope2Data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={3} dot={false} />
                      <Tooltip cursor={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Status */}
          <div className="mt-6">
            <h2 className="font-inter font-medium text-[24px] leading-[32px] tracking-[0%] text-[#171717] mb-4">
              Submission Status
            </h2>

            <div className="space-y-4">
              {[{ label: "Q1 2024 Report", progress: 75 },
              { label: "BRSR Compliance", progress: 75 },
              { label: "Water Usage Report", progress: 75 },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border rounded-lg shadow-sm p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[-0.6%] text-[#5C5C5C]">
                      {item.label}
                    </span>
                    <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[-0.6%] text-[#5C5C5C] text-right">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -------- Right Section with gray background -------- */}
        <div className="bg-gray-100 flex items-center justify-center px-2 py-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm px-6 py-6 flex flex-col items-center text-center w-[532px] min-h-[532px]">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={Logo} alt="Logo" className="w-[75px] h-[75px]" />
            </div>

            {/* Company Info */}
            <h2 className="font-inter font-semibold text-[24px] leading-[32px] tracking-[0%] text-[#171717] text-center">
              Tata Chemicals Ltd.
            </h2>
            <p className="font-roboto font-normal text-[16px] leading-[24px] tracking-[-1.1%] text-[#5C5C5C] text-center mb-4">
              Global chemical manufacturing company
            </p>

            <hr className="w-full my-4" />

            {/* Selected Goals */}
            <div className="w-full mb-4 text-center">
              <h3 className="text-[16px] leading-[24px] text-center mb-2">
                <span className="font-roboto font-medium text-[#5C5C5C] tracking-[0%]">
                  Selected Goals :{" "}
                </span>
                <span className="font-roboto font-semibold text-[#171717] tracking-[0%]">
                  ESG Manager
                </span>
              </h3>
              <p className="font-roboto font-normal text-[14px] leading-[24px] tracking-[-1.1%] text-[#5C5C5C] text-center">
                Full access to ESG reporting and management
              </p>
            </div>

            <hr className="w-full my-4" />

            {/* Agreement */}
            <div className="flex items-center gap-2 mb-4 text-left w-full">
              <input type="checkbox" id="terms" className="h-4 w-4 border border-gray-300 rounded-sm shadow-[0_2px_2px_0_#1B1C1D1F]" />
              <label htmlFor="terms" className="font-roboto text-[14px] leading-[20px] tracking-[-0.6%] text-[#171717]">
                I agree to the terms & conditions of ESG data handling
              </label>
            </div>

            {/* Buttons */}
            <button className="w-full py-2 bg-[#00C980] text-white font-inter font-medium text-[14px] leading-[20px] tracking-[-0.6%] align-middle rounded-lg hover:bg-green-600 mb-3">
              Start ESG Reporting
            </button>
            <button className="w-full py-2 border border-gray-300 rounded-lg text-[#5C5C5C] font-inter font-medium text-[14px] leading-[20px] tracking-[-0.6%] align-middle hover:bg-gray-100 flex items-center justify-center gap-2">
              <UserRoundPlus className="w-[20px] h-[20px]" />
              Invite Team Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
