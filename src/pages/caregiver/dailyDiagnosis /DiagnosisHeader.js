import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDiagnosis} from "../../../context/DiagnosisContext";

const DiagnosisHeader = ({ title = '일일 진단하기' }) => {
    const navigate = useNavigate();
    const { patientInfo } = useDiagnosis();


    return (
        <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
            <div className="h-16 flex items-center justify-between px-4 border-b ">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                    <img
                        src="/img/back.png"
                        alt="back"
                        className="w-6 h-6"
                    />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 font-medium text-xl">
                    {patientInfo ? `${patientInfo.name}님의 ${title}` : title}
               </span>
            </div>
        </div>
    );
};

export default DiagnosisHeader;