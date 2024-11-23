import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DiagnosisProvider } from './context/DiagnosisContext';
import Home from './pages/caregiver/Home';
import DiagnosisStart from "./pages/caregiver/dailyDiagnosis /DiagnosisStart";
import DiagnosisInput from "./pages/caregiver/dailyDiagnosis /DiagnosisInput";
import DiagnosisChecklist from "./pages/caregiver/dailyDiagnosis /DiagnosisChecklist";
import PhysicalChecklist from "./pages/caregiver/dailyDiagnosis /PhysicalChecklist";
import FinalChecklist from "./pages/caregiver/dailyDiagnosis /FinalChecklist";
import DiagnosisResult from "./pages/caregiver/dailyDiagnosis /DiagnosisResult";
import DiagnosisDetail from "./pages/caregiver/dailyDiagnosis /DiagnosisDetail";
import AlertDemo from "./pages/alert/AlertDemo";
import SituationCheck from "./pages/alert/SituationCheck";
import SituationDetails from "./pages/alert/SituationDetails";
import RoutineConfirmation from "./pages/alert/RoutineConfirmation";
import RoutineCancelConfirm from "./pages/alert/RoutineCancelConfirm";
import RoutineMain from "./pages/caregiver/routine/RoutineMain";
import RoutineAdd from "./pages/caregiver/routine/RoutineAdd";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Diagnosis routes wrapped with DiagnosisProvider */}
                <Route path="/diagnosis/*" element={
                    <DiagnosisProvider>
                        <Routes>
                            <Route path="start" element={<DiagnosisStart />} />
                            <Route path="input" element={<DiagnosisInput />} />
                            <Route path="checklist" element={<DiagnosisChecklist />} />
                            <Route path="physical" element={<PhysicalChecklist />} />
                            <Route path="final" element={<FinalChecklist />} />
                            <Route path="result" element={<DiagnosisResult />} />
                            <Route path="detail" element={<DiagnosisDetail />} />
                        </Routes>
                    </DiagnosisProvider>
                } />

                <Route path="/alert" element={<AlertDemo />} />
                <Route path="/alert/situation" element={<SituationCheck />} />
                <Route path="/alert/details" element={<SituationDetails />} />
                <Route path="/alert/routine" element={<RoutineConfirmation />} />
                <Route path="/alert/cancel-confirm" element={<RoutineCancelConfirm />} />
                <Route path="/routine/routine-main" element={<RoutineMain />} />
                <Route path="/routine/add" element={<RoutineAdd/>} />
            </Routes>
        </Router>
    );
};

export default App;