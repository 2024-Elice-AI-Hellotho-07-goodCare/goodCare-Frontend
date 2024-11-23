import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDiagnosis} from "../../../context/DiagnosisContext";

const PhysicalChecklist = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);

    const { updateDiagnosisData } = useDiagnosis();

    const [skinConditions, setSkinConditions] = useState({
        normal: false,
        rash: false,
        swelling: false,
        bedsore: false
    });

    const [painStatus, setPainStatus] = useState({
        none: false,
        mild: false,
        moderate: false,
        severe: false
    });

    const [movementStatus, setMovementStatus] = useState({
        normal: false,
        limited: false,
        needHelp: false
    });

    // 상태 매핑
    const skinMapping = {
        normal: 'NORMAL',
        rash: 'RASH',
        swelling: 'SWELLING',
        bedsore: 'BEDSORE'
    };

    const painMapping = {
        none: 'NONE',
        mild: 'MILD',
        moderate: 'MODERATE',
        severe: 'SEVERE'
    };

    const mobilityMapping = {
        normal: 'NORMAL',
        limited: 'LIMITED',
        needHelp: 'NEED_HELP'
    };

    useEffect(() => {
        const hasSkinSelected = Object.values(skinConditions).some(value => value);
        const hasPainSelected = Object.values(painStatus).some(value => value);
        const hasMovementSelected = Object.values(movementStatus).some(value => value);

        if (hasSkinSelected && hasPainSelected && hasMovementSelected) {
            // Context 업데이트
            let selectedSkin = '';
            let selectedPain = '';
            let selectedMobility = '';

            // 선택된 값 찾기
            Object.entries(skinConditions).forEach(([key, value]) => {
                if (value) selectedSkin = skinMapping[key];
            });

            Object.entries(painStatus).forEach(([key, value]) => {
                if (value) selectedPain = painMapping[key];
            });

            Object.entries(movementStatus).forEach(([key, value]) => {
                if (value) selectedMobility = mobilityMapping[key];
            });

            updateDiagnosisData('physicalStatusDTO', {
                skinCondition: selectedSkin,
                painLevel: selectedPain,
                painLocation: '', // 필요한 경우 별도의 입력 필드 추가
                mobility: selectedMobility
            });
        }

        setIsValid(hasSkinSelected && hasPainSelected && hasMovementSelected);
    }, [skinConditions, painStatus, movementStatus, updateDiagnosisData]);

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
                    성원님의 신체 상태를 체크해주세요.
                </h2>

                {/* 피부 상태 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3">피부 상태</h3>
                    <CheckItem
                        label="정상"
                        checked={skinConditions.normal}
                        onChange={() => setSkinConditions({
                            normal: !skinConditions.normal,
                            rash: false,
                            swelling: false,
                            bedsore: false
                        })}
                    />
                    <CheckItem
                        label="발적"
                        checked={skinConditions.rash}
                        onChange={() => setSkinConditions({
                            normal: false,
                            rash: !skinConditions.rash,
                            swelling: false,
                            bedsore: false
                        })}
                    />
                    <CheckItem
                        label="부종"
                        checked={skinConditions.swelling}
                        onChange={() => setSkinConditions({
                            normal: false,
                            rash: false,
                            swelling: !skinConditions.swelling,
                            bedsore: false
                        })}
                    />
                    <CheckItem
                        label="욕창 발생"
                        checked={skinConditions.bedsore}
                        onChange={() => setSkinConditions({
                            normal: false,
                            rash: false,
                            swelling: false,
                            bedsore: !skinConditions.bedsore
                        })}
                    />
                </div>

                {/* 통증 여부 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3">통증 여부</h3>
                    <CheckItem
                        label="없음"
                        checked={painStatus.none}
                        onChange={() => setPainStatus({
                            none: !painStatus.none,
                            mild: false,
                            moderate: false,
                            severe: false
                        })}
                    />
                    <CheckItem
                        label="경미한 통증"
                        checked={painStatus.mild}
                        onChange={() => setPainStatus({
                            none: false,
                            mild: !painStatus.mild,
                            moderate: false,
                            severe: false
                        })}
                    />
                    <CheckItem
                        label="중증"
                        checked={painStatus.moderate}
                        onChange={() => setPainStatus({
                            none: false,
                            mild: false,
                            moderate: !painStatus.moderate,
                            severe: false
                        })}
                    />
                    <CheckItem
                        label="심각한 통증"
                        checked={painStatus.severe}
                        onChange={() => setPainStatus({
                            none: false,
                            mild: false,
                            moderate: false,
                            severe: !painStatus.severe
                        })}
                    />
                </div>

                {/* 운동 및 자세 변화 섹션 */}
                <div>
                    <h3 className="text-gray-600 mb-3">운동 및 자세 변화 여부</h3>
                    <CheckItem
                        label="정상"
                        checked={movementStatus.normal}
                        onChange={() => setMovementStatus({
                            normal: !movementStatus.normal,
                            limited: false,
                            needHelp: false
                        })}
                    />
                    <CheckItem
                        label="제한적인 움직임"
                        checked={movementStatus.limited}
                        onChange={() => setMovementStatus({
                            normal: false,
                            limited: !movementStatus.limited,
                            needHelp: false
                        })}
                    />
                    <CheckItem
                        label="부축 및 추가 대응 필요"
                        checked={movementStatus.needHelp}
                        onChange={() => setMovementStatus({
                            normal: false,
                            limited: false,
                            needHelp: !movementStatus.needHelp
                        })}
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
                        onClick={() => isValid && navigate('/diagnosis/final')}
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

export default PhysicalChecklist;