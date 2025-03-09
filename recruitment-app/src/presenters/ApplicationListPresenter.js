import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ApplicationListView from "../views/ApplicationListView";
import { fetchApplications } from "../services/ApplicationListAPI";
import { logout } from "../services/AuthAPI";


function ApplicationListPresenter({ model, userModel, view: ViewComponent = ApplicationListView }) {
  useEffect(() => {
    async function loadApplications() {

      model.setLoading(true);
      try {
        const apps = await fetchApplications();
        model.setApplications(apps);
        model.setError(null);
      } catch (error) {
        // Instead of setting the error in a way that the view would display it,
        // you could set applications to an empty array.
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
