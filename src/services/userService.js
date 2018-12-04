import http from "./httpService";
import { backendApi } from "../config.json";
import { User } from "./../models/userModel";

export class UserService {
  userHttp;
  name;
  id;

  constructor() {
    this.userHttp = http.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    });
  }

  async getUser() {
    const response = await this.userHttp.get("/user");
    const data = response.data;
    const user = new User(data.id, data.name, data.projects, data.repositories);
    return user;
  }
}

// export function register(user) {
//   return http.post(api, {
//     email: user.email,
//     name: user.name,
//     password: user.password
//   });
// }
