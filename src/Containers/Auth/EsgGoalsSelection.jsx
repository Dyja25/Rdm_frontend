// import React, { useState } from "react";
// import { X, ChevronLeft, Check } from "lucide-react";
// import Logo from "../../assets/Images/Synergy.png";
// import PodcastsIcon from '@mui/icons-material/Podcasts';
// import { Leaf, Recycle, Droplet, User, ShieldCheck, FileChartColumn } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const EsgGoalsSelection = () => {
//     const navigate = useNavigate();
//     const [selectedGoals, setSelectedGoals] = useState([]); // no default selection

//     const goals = [
//         { title: "Net Zero", desc: "Net zero by 2050", icon: <PodcastsIcon className="h-6 w-6 text-white" /> },
//         { title: "GHG Reduction", desc: "Reduce greenhouse gas emissions across operations", icon: <Leaf className="h-6 w-6 text-white" /> },
//         { title: "Waste Management", desc: "Implement sustainable waste reduction and recycling programs", icon: <Recycle className="h-6 w-6 text-white" /> },
//         { title: "Water Usage / Reuse", desc: "Optimize water consumption and implement water recycling", icon: <Droplet className="h-6 w-6 text-white" /> },
//         { title: "Workforce DEI", desc: "Diversity, Equity & Inclusion initiatives", icon: <User className="h-6 w-6 text-white" /> },
//         { title: "Governance / Anti-Corruption", desc: "Maintain high standards of corporate governance", icon: <ShieldCheck className="h-6 w-6 text-white" /> },
//         { title: "Regulatory Reporting", desc: "BRSR, GRI, TCFD compliance and reporting", icon: <FileChartColumn className="h-6 w-6 text-white" /> },
//     ];

//     const toggleGoal = (goal) => {
//         if (selectedGoals.includes(goal)) {
//             setSelectedGoals(selectedGoals.filter((g) => g !== goal));
//         } else {
//             setSelectedGoals([...selectedGoals, goal]);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-white">
          

//             {/* Main Content - scrollable */}
//             <div className="flex-1 overflow-y-auto flex flex-col px-4 md:px-20 mt-9">
//                 {/* Title + separation line */}
//                 <div className="max-w-3xl mx-auto w-full text-center mb-2">
//                     <h1 className="font-inter font-medium text-[24px] leading-[32px] text-[#171717] text-center">
//                         ESG Goals Selection
//                     </h1>

//                     <p className="font-roboto font-normal text-[16px] leading-[24px] tracking-[-0.011em] text-[#5C5C5C] text-center">
//                         What ESG goals are most important to your organization?
//                     </p>

//                     <div className="w-full bg-gray-300 pb-[1.5px] mt-7"></div>
//                 </div>

//                 {/* Goals Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
//                     {goals.map((goal, idx) => (
//                         <div
//                             key={idx}
//                             className={`relative border rounded-lg p-2 cursor-pointer hover:border-green-500 mt-4 ${selectedGoals.includes(goal.title)
//                                 ? "bg-green-50 border-green-500"
//                                 : "border-[#EBEBEB]"
//                                 }`}
//                             onClick={() => toggleGoal(goal.title)}
//                         >
//                             {/* Checkbox on top-right */}
//                             <div className="absolute top-3 right-3">
//                                 <label
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         toggleGoal(goal.title);
//                                     }}
//                                     className={`w-5 h-5 border rounded-sm cursor-pointer flex items-center justify-center ${selectedGoals.includes(goal.title)
//                                         ? "bg-green-500 border-green-500"
//                                         : "bg-white border-gray-300"
//                                         }`}
//                                 >
//                                     {selectedGoals.includes(goal.title) && (
//                                         <Check className="h-4 w-4 text-white" />
//                                     )}
//                                 </label>
//                             </div>

//                             {/* Icon on top, then text, then description */}
//                             <div className="flex flex-col items-start gap-2">
//                                 <div className="w-10 h-10 flex items-center justify-center bg-[#00C980] rounded-full mb-2">
//                                     {goal.icon}
//                                 </div>
//                                 <h3 className="font-roboto font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717]">
//                                     {goal.title}
//                                 </h3>

//                                 <p className="text-sm text-gray-600">{goal.desc}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Add Custom Goal */}
//                 <div className="mb-4 w-full mt-9">
//                     <label className="block font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717] mb-1">
//                         Add Custom ESG Goal
//                     </label>

//                     <input
//                         type="text"
//                         placeholder="Add here...."
//                         className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                 </div>
//                 <div className="w-full bg-gray-300 pb-[1.5px] mt-4"></div>

//                 {/* Selected Goals */}
//                 <div className="mb-6">
//                     <h3 className="font-roboto font-medium text-[18px] leading-[32px] tracking-normal text-[#171717] mt-3">
//                         Selected Goals
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                         {selectedGoals.map((goal, idx) => (
//                             <span
//                                 key={idx}
//                                 className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
//                             >
//                                 {goal}
//                                 <button onClick={() => toggleGoal(goal)} className="ml-1">
//                                     <X className="h-4 w-4" />
//                                 </button>
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-between mb-8">
//                     <button
//                         type="button"
//                         className="flex items-center px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
//                         onClick={() => navigate("/industry")}
//                     >
//                         <ChevronLeft className="h-5 w-5" />
//                         <span className="ml-2 font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle text-[#5C5C5C]">
//                             Back
//                         </span>
//                     </button>
//                     <button
//                         type="submit"
//                         className="px-6 py-2 bg-[#00C980] text-white font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle rounded-lg hover:bg-green-600"
//                     >
//                         Save and Continue
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EsgGoalsSelection;


import React, { useState } from "react";
import { X, ChevronLeft, Check } from "lucide-react";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { Leaf, Recycle, Droplet, User, ShieldCheck, FileChartColumn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addEsg} from "../Dashboard/DashboardAction"

const EsgGoalsSelection = (props) => {
    const navigate = useNavigate();
    
    // Ensure selectedGoals is always an array
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [customGoal, setCustomGoal] = useState("");

    const goals = [
        { title: "Net Zero", desc: "Net zero by 2050", icon: <PodcastsIcon className="h-6 w-6 text-white" /> },
        { title: "GHG Reduction", desc: "Reduce greenhouse gas emissions across operations", icon: <Leaf className="h-6 w-6 text-white" /> },
        { title: "Waste Management", desc: "Implement sustainable waste reduction and recycling programs", icon: <Recycle className="h-6 w-6 text-white" /> },
        { title: "Water Usage / Reuse", desc: "Optimize water consumption and implement water recycling", icon: <Droplet className="h-6 w-6 text-white" /> },
        { title: "Workforce DEI", desc: "Diversity, Equity & Inclusion initiatives", icon: <User className="h-6 w-6 text-white" /> },
        { title: "Governance / Anti-Corruption", desc: "Maintain high standards of corporate governance", icon: <ShieldCheck className="h-6 w-6 text-white" /> },
        { title: "Regulatory Reporting", desc: "BRSR, GRI, TCFD compliance and reporting", icon: <FileChartColumn className="h-6 w-6 text-white" /> },
    ];

    const toggleGoal = (goalTitle) => {
        setSelectedGoals((prev) => {
            if (prev.includes(goalTitle)) {
                return prev.filter((g) => g !== goalTitle);
            } else {
                return [...prev, goalTitle];
            }
        });
    };

    const handleCustomGoalAdd = () => {
        if (customGoal.trim() && !selectedGoals.includes(customGoal)) {
            setSelectedGoals((prev) => [...prev, customGoal.trim()]);
            setCustomGoal("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Example API call
        const payload = { esgGoals: selectedGoals };
        console.log("Submitting ESG Goals:", payload);
props.addEsg(payload);
        // Call your API here, e.g. axios.post("/api/esg-goals", payload)
        // On success navigate to next step
        navigate("/next-step"); // replace with actual route
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-1 overflow-y-auto flex flex-col px-4 md:px-20 mt-9">
                <div className="max-w-3xl mx-auto w-full text-center mb-2">
                    <h1 className="font-inter font-medium text-[24px] leading-[32px] text-[#171717]">
                        ESG Goals Selection
                    </h1>
                    <p className="font-roboto font-normal text-[16px] leading-[24px] tracking-[-0.011em] text-[#5C5C5C] text-center">
                        What ESG goals are most important to your organization?
                    </p>
                    <div className="w-full bg-gray-300 pb-[1.5px] mt-7"></div>
                </div>

                <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
                    {/* Goals Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                        {goals.map((goal, idx) => (
                            <div
                                key={idx}
                                className={`relative border rounded-lg p-2 cursor-pointer hover:border-green-500 mt-4 ${
                                    selectedGoals.includes(goal.title)
                                        ? "bg-green-50 border-green-500"
                                        : "border-[#EBEBEB]"
                                }`}
                                onClick={() => toggleGoal(goal.title)}
                            >
                                {/* Checkbox */}
                                <div className="absolute top-3 right-3">
                                    <label
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleGoal(goal.title);
                                        }}
                                        className={`w-5 h-5 border rounded-sm cursor-pointer flex items-center justify-center ${
                                            selectedGoals.includes(goal.title)
                                                ? "bg-green-500 border-green-500"
                                                : "bg-white border-gray-300"
                                        }`}
                                    >
                                        {selectedGoals.includes(goal.title) && (
                                            <Check className="h-4 w-4 text-white" />
                                        )}
                                    </label>
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[#00C980] rounded-full mb-2">
                                        {goal.icon}
                                    </div>
                                    <h3 className="font-roboto font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#171717]">
                                        {goal.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{goal.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Custom Goal */}
                    <div className="mb-4 w-full mt-9 flex gap-2">
                        <input
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            placeholder="Add here...."
                            className="flex-1 border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <button
                            type="button"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={handleCustomGoalAdd}
                        >
                            Add
                        </button>
                    </div>

                    <div className="w-full bg-gray-300 pb-[1.5px] mt-4"></div>

                    {/* Selected Goals */}
                    <div className="mb-6">
                        <h3 className="font-roboto font-medium text-[18px] leading-[32px] tracking-normal text-[#171717] mt-3">
                            Selected Goals
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedGoals.map((goal, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {goal}
                                    <button onClick={() => toggleGoal(goal)} className="ml-1">
                                        <X className="h-4 w-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mb-8">
                        <button
                            type="button"
                            className="flex items-center px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                            onClick={() => navigate("/industry")}
                        >
                            <ChevronLeft className="h-5 w-5" />
                            <span className="ml-2 font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle text-[#5C5C5C]">
                                Back
                            </span>
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#00C980] text-white font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle rounded-lg hover:bg-green-600"
                        >
                            Save and Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = ({ customer, auth, candidate }) => ({
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    addEsg
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EsgGoalsSelection)




