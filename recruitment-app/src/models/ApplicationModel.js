import { makeAutoObservable } from "mobx";

class ApplicationModel {
  applications = []; // each application has { application_id, person_id, handled_id }
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  setApplications(apps) {
    this.applications = apps;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }
}

const applicationModel = new ApplicationModel();
export default applicationModel;
