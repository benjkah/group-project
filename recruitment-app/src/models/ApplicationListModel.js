import { makeAutoObservable } from "mobx";

class ApplicationListModel {
  applications = []; // raw data from API, expected to include { application_id, person_id, handled_id, name, surname, status }
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

  get sortedApplications() {
    const apps = this.applications.slice();
    apps.sort((a, b) => {
      // Determine if each application is unhandled
      const aIsUnhandled = a.status.toLowerCase() === "unhandled" ? 0 : 1;
      const bIsUnhandled = b.status.toLowerCase() === "unhandled" ? 0 : 1;
      
      // If one is unhandled and the other isn't, unhandled comes first.
      if (aIsUnhandled !== bIsUnhandled) {
        return aIsUnhandled - bIsUnhandled;
      }
      // If both have the same status with respect to "unhandled", sort by application_id.
      return a.application_id - b.application_id;
    });
    return apps;
  }
}

const applicationListModel = new ApplicationListModel(); //Benjamin changed to solve ESLint error.

export default applicationListModel;

