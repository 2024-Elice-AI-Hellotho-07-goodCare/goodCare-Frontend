// src/context/DiagnosisContext.js
import React, { createContext, useContext, useState } from 'react';

const DiagnosisContext = createContext();

export const DiagnosisProvider = ({ children }) => {
    const [diagnosisData, setDiagnosisData] = useState({
        dailyCheckListDTO: {
            createdAt: new Date().toISOString().split('T')[0]
        },
        vitalSignsDTO: {
            temperature: 0,
            bloodPressureSys: 0,
            bloodPressureDia: 0,
            pulse: 0,
            oxygen: 0,
            respirationRate: 0
        },
        consciousnessDTO: {
            consciousnessLevel: '',
            moodBehaviour: ''
        },
        physicalStatusDTO: {
            skinCondition: '',
            painLevel: '',
            painLocation: '',
            mobility: ''
        },
        medicationsDTO: {
            medicationTaken: false,
            sideEffects: ''
        },
        specialNotesDTO: {
            specialNotes: '',
            caregiverNotes: ''
        }
    });

    const updateDiagnosisData = (section, data) => {
        setDiagnosisData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...data
            }
        }));
    };

    return (
        <DiagnosisContext.Provider value={{ diagnosisData, updateDiagnosisData }}>
            {children}
        </DiagnosisContext.Provider>
    );
};

export const useDiagnosis = () => {
    const context = useContext(DiagnosisContext);
    if (context === undefined) {
        throw new Error('useDiagnosis must be used within a DiagnosisProvider');
    }
    return context;
};