import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import {getPatientInfo} from "../../../app/api/common";

const DiagnosisStart = () => {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 환자 데이터 가져오기
        const fetchPatientData = async () => {
            try {
                const data = await getPatientInfo();
                setPatientData(data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError(error.message);
            }
        };

        fetchPatientData();

        // 타이머 효과
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 에러 처리
    if (error) {
        return <div>Error loading patient data: {error}</div>;
    }

    // 로딩 처리
    if (!patientData) {
        return <div>Loading...</div>;
    }

    const patientName = patientData?.name || '최예준'; // fallback value

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            {showWelcome ? (
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/img/disoStart.png"
                            alt="Green character"
                            className="w-62 h-72 mb-4"
                        />
                        <p className="text-xl">{patientName}님, 좋은 아침이에요!</p>
                    </div>
                </main>
            ) : (
                <main className="flex-1 flex flex-col items-center justify-between px-4">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src="/img/disoStart2.png"
                                alt="Green character"
                                className="w-62 h-72 mb-4"
                            />
                            <div className="text-center space-y-2">
                                <h2 className="text-lg font-medium">{patientName}님의</h2>
                                <p className="text-lg">일일 건강 진단을 시작해볼까요?</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pb-20">
                        <button
                            onClick={() => navigate('/diagnosis/input')}
                            className="w-full py-4 bg-[#496E1B] rounded-xl text-white font-medium
                            transition-colors duration-200"
                        >
                            시작하기
                        </button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default DiagnosisStart;