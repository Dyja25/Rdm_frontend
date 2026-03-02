import React from 'react';
import SideImg1 from "../../assets/Images/Login Image [HR Management] [1.1] (1).png";
import LogoImg from "../../assets/Images/Custom Icon.png";

const Verification = () => {
    return (
        <div className="flex min-h-screen overflow-hidden">

            {/* Left side */}
            <div className="hidden md:flex w-1/2 h-screen justify-center items-center p-4">
                <div className="w-full h-full rounded-[16px] overflow-hidden">
                    <img
                        src={SideImg1}
                        alt="Sustainability"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex w-full md:w-1/2 justify-center items-center bg-white p-4 md:p-10">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={LogoImg} alt="Verification Logo" className="w-20 h-20" />
                    </div>

                    {/* Title */}
                    <h2 className="font-inter font-medium text-[24px] leading-8 text-center text-[#171717] px-4 py-2 rounded">
                        Enter Verification Code
                    </h2>


                    {/* Subtitle */}
                    <p className="font-inter font-normal text-[16px] leading-6 tracking-tight text-center text-[#5C5C5C] px-4 py-2 rounded mb-6">
                        We’ve sent a code to <span className="font-inter font-medium text-[16px] leading-6 tracking-tight text-center text-[#171717]">
                            james@alignui.com
                        </span>

                    </p>


                    {/* Separator line */}
                    <div className="w-[430px] h-[1px] mx-auto my-[0.375rem] bg-[#EBEBEB] opacity-100"></div>

                    <div className="flex flex-col items-center mb-6">
                        {/* OTP input boxes */}
                        <div className="flex justify-center gap-2 mb-4 flex-wrap">
                            {[...Array(4)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    className="w-[70px] sm:w-[100px] h-[64px] text-center border border-[#EBEBEB] rounded-[10px] px-2 py-4 text-lg focus:ring-2 focus:ring-green-400 text-[#171717] font-inter font-medium"
                                />
                            ))}
                        </div>

                        {/* Verify button */}
                        <button className="w-full sm:w-[430px] h-[40px] px-2.5 bg-[#00C980] font-semibold rounded-[10px] shadow-[0_0_0_1px_#0E8C6E,0_1px_2px_0px_#0E121B3D] hover:bg-[#00b870] transition font-inter text-[#FFFFFF]">
                            Verify
                        </button>

                    </div>

                    {/* Resend code */}
                    <p className="mt-4 text-center text-[14px] leading-5 tracking-[-0.6%] font-inter font-normal text-[#5C5C5C]">
                        Experiencing issues receiving the code?
                    </p>


                    <button className="font-inter font-medium text-[14px] leading-5 tracking-[-0.6%] text-[#171717] underline underline-solid block mx-auto mt-1">
                        Resend code
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Verification;

