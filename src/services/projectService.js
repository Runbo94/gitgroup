import http from "./httpService";

export class ProjectService {
  projectHttp;

  constructor() {
    this.projectHttp = http.create({
      baseURL: process.env.REACT_APP_API_URL + "/project",
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    });
  }

  async createNewProject(projectData) {
    await this.projectHttp.post("/new", {
      name: projectData.name,
      description: projectData.description,
      repositories: projectData.repositories
    });
  }

  async getProjectOverview(projectId) {
    const overview = (await this.projectHttp.get("/overview/" + projectId))
      .data;
    return overview;
  }
}
