// src/context/DiagnosisContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const DiagnosisContext = createContext();

export const DiagnosisProvider = ({ children }) => {
    const [patientInfo, setPatientInfo] = useState(null);
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

    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/info/get/name`);
                const result = await response.json();

                if (result.success) {
                    setPatientInfo(result.data[0].patient);
                }
            } catch (error) {
                console.error('Failed to fetch patient info:', error);
            }
        };

        fetchPatientInfo();
    }, []);

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
        <DiagnosisContext.Provider value={{
            diagnosisData,
            updateDiagnosisData,
            patientInfo
        }}>
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