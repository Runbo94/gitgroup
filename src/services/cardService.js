import http from "./httpService";
import { backendApi } from "../config.json";

export class CardService {
  cardHttp;
  constructor() {
    this.cardHttp = http.create({
      baseURL: backendApi + "/cards",
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    });
  }

  /**
   * create a new card to the kanban column
   * @param {*} kanbanId
   * @param {*} columnId
   * @param {*} cardData - format: {issueId, title, body, owner, repos, state, note}
   */
  async createNewCard(kanbanId, columnId, cardData) {
    return await this.cardHttp.post(
      `/add_new_card/${kanbanId}/${columnId}`,
      cardData
    );
  }

  async deleteTheCard(kanbanId, columnId, cardId) {
    return await this.cardHttp.delete(`/${kanbanId}/${columnId}/${cardId}`);
  }
}
