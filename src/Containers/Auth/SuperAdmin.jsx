import React from "react";
import ProfileImage from "../assets/Rectangle.png"; // <-- your rectangular photo
import LogoIcon from "../assets/Synergy (1).png";   // <-- small circular icon/logo

const SuperAdmin = () => {
    return (

        <div className="max-w-7xl mx-auto overflow-hidden  md:p-10">

            {/* Unified Grid: 3 columns for both rows */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COLUMN 1: Profile Image + Profile Info (stacked vertically) */}
                <div className="space-y-6">
                    {/* Profile Image */}
                    <div className="relative rounded-2xl shadow-sm overflow-visible">
                        <div className="relative w-full h-[550px] md:h-[500px] rounded-2xl overflow-hidden border-4 border-[#00A38C]">
                            {/* Logo */}
                            <div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-20 shadow-sm">
                                <img src={LogoIcon} alt="logo" className="w-8 h-8 object-contain" />
                            </div>

                            {/* Profile Image */}
                            <img src={ProfileImage} alt="Micle Jhon" className="object-cover w-full h-full" />

                            {/* Gradient overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-28 md:h-32 bg-gradient-to-t from-[#007C72] via-[#008F7E]/80 to-transparent opacity-95 z-10" />

                            {/* Name and Role */}
                            <div className="absolute bottom-6 left-6 z-30">
                                <h2 className="font-inter font-extrabold text-[60px] leading-[1] tracking-[-0.006em] text-white drop-shadow-lg w-[316px] h-[73px]">
                                    Micle Jhon
                                </h2>
                                <p className="font-inter font-medium text-[18px] leading-[30px] tracking-[-0.006em] text-white text-center w-[316px] h-[30px] opacity-100 mt-1">
                                    Admin / Super Admin
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="bg-gray-50 border rounded-2xl p-5 h-[300px]">
                        <h3 className="font-inter font-medium text-[20px] leading-[1] tracking-[-0.6%] text-black mb-3">
                            Profile Info
                        </h3>
                        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-[#089271]">
                            <li><strong>Name:</strong> Micle Jhon</li>
                            <li><strong>Age:</strong> 48</li>
                            <li><strong>Role:</strong> System administrator and platform overseer</li>
                            <li><strong>Experience Level:</strong> Technical expertise with ESG domain knowledge</li>
                            <li><strong>Primary Goal:</strong> Ensure platform security, manage user access, and maintain system integrity</li>
                        </ul>
                    </div>
                </div>

                {/* COLUMN 2-3: Bio + Responsibilities + Pain Points */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    <div className="bg-gray-50 border rounded-2xl p-2 md:p-8">
                        <h3 className="text-xl font-semibold mb-4">Bio</h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                            Micle Jhon serves as the Admin/Super Admin for the ESG Sustainability
                            Management Platform, responsible for managing user roles, data access,
                            and platform settings. With a strong focus on compliance and data
                            integrity, he ensures that ESG metrics are accurately tracked, securely
                            stored, and effectively reported to support the organization’s
                            sustainability goals.
                        </p>
                    </div>

                    {/* Row: Responsibility + Platform Access */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Responsibility */}
                        <div className="bg-gray-50 border rounded-2xl p-5">
                            <h3 className="text-lg font-semibold mb-3">Responsibility</h3>
                            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-[#089271]">
                                <li>Configure role-based access controls and permissions</li>
                                <li>Manage user accounts, MFA settings, and security protocols</li>
                                <li>Oversee data quality and audit trails across all modules</li>
                                <li>Set up and maintain integrations (ERP, IoT devices)</li>
                                <li>Monitor platform performance and compliance</li>
                            </ul>
                        </div>

                        {/* Platform Access */}
                        <div className="bg-gray-50 border rounded-2xl p-5">
                            <h3 className="text-lg font-semibold mb-3">Platform Access</h3>
                            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-[#089271]">
                                <li>All modules and features</li>
                                <li>Admin Console for security & governance settings</li>
                                <li>Role creation and permission matrix management</li>
                                <li>Privacy compliance log and blockchain ledger viewer</li>
                                <li>User activity monitoring and forced logout capabilities</li>
                                <li>MFA enforcement and backup code generation</li>
                            </ul>
                        </div>
                    </div>

                    {/* Row: Pain Points + Success Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Pain Points */}
                        <div className="bg-gray-50 border rounded-2xl p-5">
                            <h3 className="text-lg font-semibold mb-3">Pain Points</h3>
                            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-[#089271]">
                                <li>Balancing security with user accessibility</li>
                                <li>Managing complex permission structures across business units</li>
                                <li>Ensuring compliance with multiple regulatory frameworks</li>
                                <li>Coordinating with various stakeholders for system updates</li>
                            </ul>
                        </div>

                        {/* Goal / Success Metrics */}
                        <div className="bg-gray-50 border rounded-2xl p-5">
                            <h3 className="text-lg font-semibold mb-3">Goal / Success Metrics</h3>
                            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-[#089271]">
                                <li>Platform uptime and security incidents</li>
                                <li>User adoption rates and satisfaction scores</li>
                                <li>Compliance audit success rates</li>
                                <li>Data quality and completeness metrics</li>
                            </ul>
                        </div>
                        {/* </div> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SuperAdmin;
