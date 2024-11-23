import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";

const DiagnosisStart = () => {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            {showWelcome ? (
                // First screen (3-second splash)
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/img/disoStart.png"
                            alt="Green character"
                            className="w-62 h-72 mb-4"
                        />
                        <p className="text-xl">전성원님, 좋은 아침이에요!</p>
                    </div>
                </main>
            ) : (
                // Second screen (main screen)
                <main className="flex-1 flex flex-col items-center justify-between px-4">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src="/img/disoStart2.png"
                                alt="Green character"
                                className="w-62 h-72 mb-4"
                            />
                            <div className="text-center space-y-2">
                                <h2 className="text-lg font-medium">전성원님의</h2>
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