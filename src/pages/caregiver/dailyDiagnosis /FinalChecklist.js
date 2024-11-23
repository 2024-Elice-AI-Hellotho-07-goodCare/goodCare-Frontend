import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../../common/component/Loading";
import DiagnosisHeader from "./DiagnosisHeader";

const FinalChecklist = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [note, setNote] = useState('');
    const [medication, setMedication] = useState(null);
    const [sideEffects, setSideEffects] = useState(null);

    useEffect(() => {
        // 모든 필수 항목이 선택되었는지 확인
        setIsValid(medication !== null && sideEffects !== null);
    }, [medication, sideEffects]);

    const handleSubmit = () => {
        if (!isValid) return;
        setIsLoading(true);
        setTimeout(() => {
            navigate('/diagnosis/result');
        }, 2000);
    };

    if (isLoading) {
        return (
            <Loading
                spinnerSize="w-32 h-32"
                message={
                    <>
                        진단 결과를<br />
                        분석하고 있어요
                    </>
                }
                showHeader={true}
                headerTitle="일일 진단하기"
            />
        );
    }

    // 가로 배치 라디오 버튼
    const HorizontalRadioGroup = ({ options, value, onChange }) => (
        <div className="flex gap-3">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`
                        flex-1 p-4 rounded-lg flex justify-center items-center
                        bg-[#F6FFF3] transition-colors duration-200
                        ${value === option.value ? 'text-[#496E1B]' : 'text-gray-500'}
                    `}
                >
                    <span>{option.label}</span>
                    {value === option.value && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center ml-2">
                            <span className="text-[#496E1B]">✓</span>
                        </div>
                    )}
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <h2 className="text-xl font-bold mb-8">
                    성원님의 기타 확인 사항을 체크해주세요.
                </h2>

                {/* 아침 약 복용 여부 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3 ">아침 약 복용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            {label: '미완료', value: 'incomplete'},
                            {label: '완료', value: 'complete'}
                        ]}
                        value={medication}
                        onChange={setMedication}
                    />
                </div>

                {/* 복용하는 약 부작용 여부 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3 ">복용하는 약 부작용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            {label: '있음', value: 'yes'},
                            {label: '없음', value: 'no'}
                        ]}
                        value={sideEffects}
                        onChange={setSideEffects}

                    />
                </div>

                {/* 특이사항 메모 */}
                <div>
                    <h3 className="text-gray-600 mb-3">특이사항 및 간호기록</h3>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="추가로 기록할 사항을 적어주세요."
                        className="w-full h-32 p-4 rounded-lg bg-[#F6FFF3] resize-none
                        focus:outline-none placeholder-gray-500"
                    />
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="left-0 right-0 pb-20 bg-[#E9EEEA]">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 rounded-xl text-[#496E1B] font-medium bg-[#E4EFE0]"
                    >
                        이전
                    </button>
                    <button
                        onClick={handleSubmit}
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

export default FinalChecklist;