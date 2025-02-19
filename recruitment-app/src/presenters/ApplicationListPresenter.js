import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ApplicationListView from "../views/ApplicationListView";
import { fetchApplicationList } from "../services/ApplicationListAPI";

function ApplicationListPresenter({ model, view: ViewComponent = ApplicationListView }) {
  useEffect(() => {
    async function loadApplications() {
      console.log("AppListPres");
      model.setLoading(true);
      try {
        const apps = await fetchApplicationList();
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

  return <ViewComponent model={model} />;
}

export default observer(ApplicationListPresenter);
