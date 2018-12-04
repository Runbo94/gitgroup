import http from "./httpService";

export class IssueService {
  issueHttp;

  constructor() {
    this.issueHttp = http.create({
      baseURL: process.env.REACT_APP_API_URL + "/issues",
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    });
  }

  async getAllIssues(username, projectId) {
    return await this.issueHttp.get(
      "/project_issues/" + username + "/" + projectId
    );
  }
}
