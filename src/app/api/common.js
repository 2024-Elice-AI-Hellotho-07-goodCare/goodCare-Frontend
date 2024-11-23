

/**
 * Daily Check Input API
 * @param {string} code - Patient code (required)
 * @param {Object} data - Daily check data
 * @returns {Promise} API response
 */

export const getPatientInfo = async () => {
    try {
        console.log('Requesting to:', `${process.env.REACT_APP_API_URL}/patient/info/get/name?name=최예준`);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/info/get/name?name=최예준`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`API request failed: ${response.status} ${errorData}`);
        }

        const result = await response.json();
        console.log('API response:', result);

        if (!result.success) {
            throw new Error(result.message || 'Failed to get patient info');
        }

        return result.data;

    } catch (error) {
        console.error('Detailed error:', error);
        throw error;
    }
};


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