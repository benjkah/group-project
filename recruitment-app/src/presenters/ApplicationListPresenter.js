import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ApplicationListView from "../views/ApplicationListView";
import { fetchApplications } from "../services/ApplicationListAPI";
import { logout } from "../services/AuthAPI";


function ApplicationListPresenter({ model, userModel, recruitmentModel, view: ViewComponent = ApplicationListView }) {
  useEffect(() => {

    /**
     * Loads applicant profile data, including personal details, competences, and availability.
     * Fetches data from the API and updates the model state accordingly.
     */
    async function loadApplications() {

      model.setLoading(true);
      try {
        const apps = await fetchApplications();
        model.setApplications(apps);
        model.setError(null);
      } catch (error) {
        model.setApplications([]);
        model.setError(error.message);
      } finally {
        model.setLoading(false);
      }
    }
    loadApplications();
  }, [model]);

    async function handleLogout() {
      try {
        await logout();
        recruitmentModel.reset();
        userModel.reset();
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    }
  

  return <ViewComponent 
    model={model}
    logout={handleLogout} 
    />;
}

export default observer(ApplicationListPresenter);
