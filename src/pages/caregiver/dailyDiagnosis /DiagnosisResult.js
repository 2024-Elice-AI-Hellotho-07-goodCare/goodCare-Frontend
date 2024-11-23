import React from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";

const DiagnosisResult = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            {/* Header */}
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                {/* Character Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/img/marimo/Poor-yellow.png"
                        alt="Character"
                        className="w-32 h-32"
                    />
                </div>

                {/* Status Message Card */}
                <div className="bg-white rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>2024. 11. 18 (금)</span>
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">AI</span>
                    </div>
                    <p className="text-base">
                        전성원님의 상태는 보통이에요<br />
                        평소보다 혈압이 높고 맥박과 체온이 떨어졌어요
                    </p>
                </div>

                {/* Vital Signs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Blood Pressure */}
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>혈압</span>
                            <span className="text-red-500">↑ 1.2%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            140<span className="text-base font-normal text-gray-500">/80 mmHg</span>
                        </div>
                    </div>

                    {/* Pulse */}
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>맥박</span>
                            <span className="text-blue-500">↓ 0.8%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            65<span className="text-base font-normal text-gray-500"> 회</span>
                        </div>
                    </div>

                    {/* Oxygen Saturation */}
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>산소포화도</span>
                            <span className="text-gray-500">0.0%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            95<span className="text-base font-normal text-gray-500"> %</span>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>체온</span>
                            <span className="text-blue-500">↓ 0.1%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            36.1<span className="text-base font-normal text-gray-500"> °C</span>
                        </div>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="bg-[#F6FFF3] p-4 rounded-2xl mb-6">
                    <h3 className="font-medium mb-3">환자 분석</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 이 환자는 정체성 고혈압과 낮은 산소포화도로 상황관계 위험 이 우려되며, 수분 섭취 부족과 빈맥 가능성이 관찰됩니다.</li>
                        <li>• 무릎 통증과 비골관절 수가적인 산재 기능 저하를 시사하므로 활동량 조정과 관리가 필요합니다.</li>
                        <li>• 전반적으로 안정적이지만, 만성질환 관리를 위해 지속적인 결과 설명 솔루제션이 중요합니다.</li>
                    </ul>
                </div>

                {/* Additional Action Buttons */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => navigate('/diagnosis/detail')}
                        className="flex-1 py-2.5 px-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] text-sm"
                    >
                        전체 답변 확인하기
                    </button>
                    <button
                        onClick={() => navigate('/diagnosis/share')}
                        className="flex-1 py-2.5 px-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] text-sm"
                    >
                        병원에 보내기
                    </button>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 py-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] font-medium"
                    >
                        대시보드
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="flex-1 py-4 bg-[#496E1B] rounded-xl text-white font-medium"
                    >
                        홈
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DiagnosisResult;