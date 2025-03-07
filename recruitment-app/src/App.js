import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import AuthPresenter from './presenters/AuthPresenter';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ApplicationListPresenter from "./presenters/ApplicationListPresenter";
import ApplicationListView from "./views/ApplicationListView";
import ReqruiterApplicantView from './views/ReqruiterApplicantView';
import ReqruiterApplicantPresenter from './presenters/ReqruiterApplicantPresenter';
import The404Presenter from "./presenters/The404Presenter";

function App({ userModel, recruitmentModel, applicationListModel }) {
    return (
        <Router>
            <div>
                <h1>Recruitment Portal</h1>
                <Routes>
                    <Route path="/" element={<AuthPresenter userModel={userModel} view={LoginView} />} />
                    <Route path="/profile" element={<ApplicantProfilePresenter model={recruitmentModel} userModel={userModel} view={ApplicantProfileView} />} />
                    <Route path="/register" element={<AuthPresenter userModel={userModel} view={RegistrationView} />} />
                    <Route path="/applications" element={<ApplicationListPresenter model={applicationListModel} view={ApplicationListView} />} />
                    <Route path="/applications/:id" element={<ReqruiterApplicantPresenter model={recruitmentModel} view={ReqruiterApplicantView} />} />
                    <Route path="/*" element={<The404Presenter />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
