import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";

const DiagnosisInput = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        temperature: '',
        pressureHigh: '',
        pressureLow: '',
        pulse: '',
        oxygen: '',
        breathing: ''
    });

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const { temperature, pressureHigh, pressureLow, pulse, oxygen, breathing } = formData;
        const isFormValid =
            temperature !== '' &&
            pressureHigh !== '' &&
            pressureLow !== '' &&
            pulse !== '' &&
            oxygen !== '' &&
            breathing !== '';
        setIsValid(isFormValid);
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20">
                <p className="text-xl font-bold mb-20">기본 생체 신호를 체크해주세요.</p>
                <div className="space-y-10">
                    {/* 혈압 */}
                    <div>
                        <label className="text-base mb-3 block">혈압</label>
                        <div className="flex gap-4 relative">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={formData.pressureHigh}
                                    onChange={(e) => handleInputChange('pressureHigh', e.target.value)}
                                    className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                    placeholder="정상 범위: 90-120"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={formData.pressureLow}
                                    onChange={(e) => handleInputChange('pressureLow', e.target.value)}
                                    className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                    placeholder="60-80 mmHg"
                                />
                            </div>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">mmHg</span>
                        </div>
                    </div>

                    {/* 맥박 */}
                    <div>
                        <label className="text-base mb-3 block">맥박</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.pulse}
                                onChange={(e) => handleInputChange('pulse', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                placeholder="정상 범위: 60-100회/분"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">회/분</span>
                        </div>
                    </div>

                    {/* 산소포화도 */}
                    <div>
                        <label className="text-base mb-3 block">산소포화도</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.oxygen}
                                onChange={(e) => handleInputChange('oxygen', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                placeholder="정상 범위: 95-100%"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                    </div>

                    {/* 체온 */}
                    <div>
                        <label className="text-base mb-3 block">체온</label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                value={formData.temperature}
                                onChange={(e) => handleInputChange('temperature', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                placeholder="정상 범위: 36.5-37.5°C"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">°C</span>
                        </div>
                    </div>

                    {/* 호흡수 */}
                    <div>
                        <label className="text-base mb-3 block">호흡수</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.breathing}
                                onChange={(e) => handleInputChange('breathing', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-[#F6FFF3] focus:outline-none"
                                placeholder="정상 범위: 12-20회/분"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">회/분</span>
                        </div>
                    </div>
                </div>
            </main>

            <div className="px-4 py-20">
                <button
                    onClick={() => isValid && navigate('/diagnosis/checklist')}
                    className={`w-full py-4 rounded-xl text-white font-medium transition-colors duration-200
                        ${isValid ? 'bg-[#496E1B]' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default DiagnosisInput;