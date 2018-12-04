import http from "./httpService";

export class KanbanService {
  kanbanHttp;

  constructor() {
    this.kanbanHttp = http.create({
      baseURL: process.env.REACT_APP_API_URL + "/kanban",
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    });
  }

  async createNewKanban(kanbanData) {
    await this.kanbanHttp.post("/new", {
      name: kanbanData.name,
      due: kanbanData.due,
      projectId: kanbanData.projectId
    });
  }

  async getKanbansOfProject(projectId) {
    return await this.kanbanHttp.get(`/${projectId}`);
  }

  async getKanbanById(kanbanId) {
    return await this.kanbanHttp.get(`/kanban_id/${kanbanId}`);
  }
}
