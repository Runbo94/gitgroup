import http from "./httpService";

export function login(email, password) {
  // return http.post(api, {
  //   email: email,
  //   password: password
  // });
}

export class Auth {
  authApi;

  constructor() {
    this.authApi = http.create({
      baseURL: process.env.REACT_APP_API_URL
    });
  }

  async githubAuth() {
    const auth = await this.authApi.get("/user/auth");
    window.location = auth.data;
  }
}
