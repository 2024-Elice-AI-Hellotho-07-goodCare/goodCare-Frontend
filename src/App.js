import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosisStart from "./pages/caregiver/dailyDiagnosis /DiagnosisStart";
import DiagnosisInput from "./pages/caregiver/dailyDiagnosis /DiagnosisInput";
import DiagnosisChecklist from "./pages/caregiver/dailyDiagnosis /DiagnosisChecklist";
import PhysicalChecklist from "./pages/caregiver/dailyDiagnosis /PhysicalChecklist";
import FinalChecklist from "./pages/caregiver/dailyDiagnosis /FinalChecklist";
import AlertDemo from "./pages/alert/AlertDemo";
import SituationCheck from "./pages/alert/SituationCheck";
import SituationDetails from "./pages/alert/SituationDetails";
import RoutineConfirmation from "./pages/alert/RoutineConfirmation";
import RoutineCancelConfirm from "./pages/alert/RoutineCancelConfirm";
import RoutineMain from "./pages/caregiver/routine/RoutineMain";
import RoutineAdd from "./pages/caregiver/routine/RoutineAdd";
import DiagnosisResult from "./pages/caregiver/dailyDiagnosis /DiagnosisResult";
import DiagnosisDetail from "./pages/caregiver/dailyDiagnosis /DiagnosisDetail";
import Login from "./auth/login";
import {DiagnosisProvider} from "./context/DiagnosisContext";
import Loading from "./common/component/Loading";
import Home from "./pages/caregiver/Home";
import DashBoard from "./pages/caregiver/DashBoard";
import Register from "./auth/join";

const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>}/>
                // App.js
                <Route path="/register" element={<Register />} />


                {/* 진단 관련 라우트 */}
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
                            <Route path="loading" element={<Loading/>}/>
                        </Routes>
                    </DiagnosisProvider>
                } />


                <Route path="/alert" element={<AlertDemo />} /> {/* 임시로 알럿창 확인을 위한 라우트 */}
                <Route path="/alert/situation" element={<SituationCheck />} />
                <Route path="/alert/details" element={<SituationDetails />} />
                <Route path="/alert/routine" element={<RoutineConfirmation />} />
                <Route path="/alert/cancel-confirm" element={<RoutineCancelConfirm />} />
                <Route path="/routine/routine-main" element={<RoutineMain />} />
                <Route path="/routine/add" element={<RoutineAdd/>} />

                <Route path="/dashboard/health" element={<DashBoard/>}/>








                {/* 추가 라우트는 여기에 설정 */}
            </Routes>
        </Router>
    );
};

export default App;