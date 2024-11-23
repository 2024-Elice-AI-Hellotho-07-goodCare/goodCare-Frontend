import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDiagnosis} from "../../../context/DiagnosisContext";

const DiagnosisChecklist = () => {
    const { updateDiagnosisData } = useDiagnosis();

    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);

    const [consciousnessLevel, setConsciousnessLevel] = useState({
        clear: false,
        drowsy: false,
        confused: false,
        semicoma: false
    });

    const [behaviorChanges, setBehaviorChanges] = useState({
        normal: false,
        anxiety: false,
        depression: false,
        excited: false
    });

    // 의식 수준 매핑
    const consciousnessMapping = {
        clear: 'CLEAR',
        drowsy: 'DROWSY',
        confused: 'CONFUSED',
        semicoma: 'SEMICOMA'
    };

    // 행동 변화 매핑
    const behaviorMapping = {
        normal: 'SAME_AS_USUAL',
        anxiety: 'ANXIETY',
        depression: 'DEPRESSION',
        excited: 'EXCITED'
    };


    useEffect(() => {
        const hasConsciousnessSelected = Object.values(consciousnessLevel).some(value => value);
        const hasBehaviorSelected = Object.values(behaviorChanges).some(value => value);

        if (hasConsciousnessSelected && hasBehaviorSelected) {
            // Context 업데이트
            let selectedConsciousness = '';
            let selectedBehavior = '';

            // 선택된 의식 수준 찾기
            Object.entries(consciousnessLevel).forEach(([key, value]) => {
                if (value) selectedConsciousness = consciousnessMapping[key];
            });

            // 선택된 행동 변화 찾기
            Object.entries(behaviorChanges).forEach(([key, value]) => {
                if (value) selectedBehavior = behaviorMapping[key];
            });

            updateDiagnosisData('consciousnessDTO', {
                consciousnessLevel: selectedConsciousness,
                moodBehaviour: selectedBehavior
            });
        }

        setIsValid(hasConsciousnessSelected && hasBehaviorSelected);
    }, [consciousnessLevel, behaviorChanges, updateDiagnosisData]);

    const CheckItem = ({ label, checked, onChange }) => (
        <button
            onClick={onChange}
            className={`
                w-full p-4 rounded-lg flex justify-between items-center mb-3
                ${checked ? 'bg-[#E4EFE0]' : 'bg-[#E4EFE0]'}
            `}
        >
            <span>{label}</span>
            {checked && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <span className="text-[#496E1B]">✓</span>
                </div>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
                <div className="h-14 flex items-center justify-between px-4 border-b">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                        ←
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 font-medium">
                        일일 진단하기
                    </span>
                </div>
            </div>

            <main className="flex-1 px-4 pt-20 pb-24">
                <h2 className="text-xl font-bold mb-8">
                    성원님의 의식과 정신 상태를 체크해주세요.
                </h2>

                {/* 의식 수준 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3">의식 수준</h3>
                    <CheckItem
                        label="명료해요"
                        checked={consciousnessLevel.clear}
                        onChange={() => {
                            const newValue = !consciousnessLevel.clear;
                            setConsciousnessLevel({
                                clear: newValue,
                                drowsy: false,
                                confused: false,
                                semicoma: false
                            });
                        }}
                    />
                    <CheckItem
                        label="기면"
                        checked={consciousnessLevel.drowsy}
                        onChange={() => {
                            const newValue = !consciousnessLevel.drowsy;
                            setConsciousnessLevel({
                                clear: false,
                                drowsy: newValue,
                                confused: false,
                                semicoma: false
                            });
                        }}
                    />
                    <CheckItem
                        label="혼미"
                        checked={consciousnessLevel.confused}
                        onChange={() => {
                            const newValue = !consciousnessLevel.confused;
                            setConsciousnessLevel({
                                clear: false,
                                drowsy: false,
                                confused: newValue,
                                semicoma: false
                            });
                        }}
                    />
                    <CheckItem
                        label="반혼수 / 혼수"
                        checked={consciousnessLevel.semicoma}
                        onChange={() => {
                            const newValue = !consciousnessLevel.semicoma;
                            setConsciousnessLevel({
                                clear: false,
                                drowsy: false,
                                confused: false,
                                semicoma: newValue
                            });
                        }}
                    />
                </div>

                {/* 기타 및 행동 변화 섹션 */}
                <div>
                    <h3 className="text-gray-600 mb-3">기타 및 행동 변화</h3>
                    <CheckItem
                        label="평소와 동일함"
                        checked={behaviorChanges.normal}
                        onChange={() => {
                            const newValue = !behaviorChanges.normal;
                            setBehaviorChanges({
                                normal: newValue,
                                anxiety: false,
                                depression: false,
                                excited: false
                            });
                        }}
                    />
                    <CheckItem
                        label="불안"
                        checked={behaviorChanges.anxiety}
                        onChange={() => {
                            const newValue = !behaviorChanges.anxiety;
                            setBehaviorChanges({
                                normal: false,
                                anxiety: newValue,
                                depression: false,
                                excited: false
                            });
                        }}
                    />
                    <CheckItem
                        label="우울"
                        checked={behaviorChanges.depression}
                        onChange={() => {
                            const newValue = !behaviorChanges.depression;
                            setBehaviorChanges({
                                normal: false,
                                anxiety: false,
                                depression: newValue,
                                excited: false
                            });
                        }}
                    />
                    <CheckItem
                        label="흥분 / 과민"
                        checked={behaviorChanges.excited}
                        onChange={() => {
                            const newValue = !behaviorChanges.excited;
                            setBehaviorChanges({
                                normal: false,
                                anxiety: false,
                                depression: false,
                                excited: newValue
                            });
                        }}
                    />
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#E9EEEA]">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 rounded-xl text-[#496E1B] font-medium bg-[#E4EFE0]"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => isValid && navigate('/diagnosis/physical')}
                        className={`flex-1 py-4 rounded-xl font-medium 
                            ${isValid
                            ? 'bg-[#496E1B] text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisChecklist;