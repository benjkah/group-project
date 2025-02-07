import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ApplicationListView from "../views/ApplicationListView";
import { fetchApplications } from "../services/ApplicationListAPI";


function ApplicationListPresenter({ model, view: ViewComponent = ApplicationListView }) {
  useEffect(() => {
    async function loadApplications() {

      console.log("AppListPres");
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

  return <ViewComponent model={model} />;
}

export default observer(ApplicationListPresenter);
