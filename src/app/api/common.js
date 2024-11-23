/**
 * Daily Check Input API
 * @param {string} code - Patient code (required)
 * @param {Object} data - Daily check data
 * @returns {Promise} API response
 */
export const postDailyCheckInput = async (code, data) => {
    try {
        const response = await fetch(`/patient/daily-check/input?code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dailyCheckListDTO: {
                    createdAt: data.createdAt || new Date().toISOString().split('T')[0],
                },
                vitalSignsDTO: {
                    temperature: data.temperature || 0,
                    bloodPressureSys: data.bloodPressureSys || 0,
                    bloodPressureDia: data.bloodPressureDia || 0,
                    pulse: data.pulse || 0,
                    oxygen: data.oxygen || 0,
                    respirationRate: data.respirationRate || 0,
                },
                consciousnessDTO: {
                    consciousnessLevel: data.consciousnessLevel || 'CLEAR',
                    moodBehaviour: data.moodBehaviour || 'SAME_AS_USUAL',
                },
                physicalStatusDTO: {
                    skinCondition: data.skinCondition || 'NORMAL',
                    painLevel: data.painLevel || 'NONE',
                    painLocation: data.painLocation || '',
                    mobility: data.mobility || 'NORMAL',
                },
                medicationsDTO: {
                    medicationTaken: data.medicationTaken ?? true,
                    sideEffects: data.sideEffects || '',
                },
                specialNotesDTO: {
                    specialNotes: data.specialNotes || '',
                    caregiverNotes: data.caregiverNotes || '',
                },
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Daily check input failed:', error);
        throw error;
    }
};