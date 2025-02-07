// src/presenters/JobApplicationsPresenter.js
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import applicationModel from "../models/ApplicationModel";
import ApplicationListView from "../views/ApplicationListView";
import { fetchApplications } from "../services/ApplicationListAPI";

function ApplicationListPresenter({ model = applicationModel, view: ViewComponent = ApplicationListView }) {
  useEffect(() => {
    async function loadApplications() {
      model.setLoading(true);
      try {
        const apps = await fetchApplications();
        model.setApplications(apps);
        model.setError(null);
      } catch (error) {
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
