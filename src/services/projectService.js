import http from "./httpService";
import { backendApi } from "../config.json";
import { Project } from "../models/projectModel";

export class ProjectService {
  projectHttp;

  constructor() {
    this.projectHttp = http.create({
      baseURL: backendApi + "/project",
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
