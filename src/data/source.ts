import { GetGroupsResponse } from "../types";
import json_groups from "./groups.json";

interface JsonGroupsSourceInterface {
  getJsonGroups(): Promise<GetGroupsResponse>;
}

export class JsonGroupsMockSource implements JsonGroupsSourceInterface {
  getJsonGroups(): Promise<GetGroupsResponse> {
    return new Promise((resolve, reject) =>

    // Симуляция ответа с backend с задержкой 1с
      setTimeout(() => {

        // Симуляция ошибок с backend
        const randomValue = Math.floor(Math.random() * 20);

        if (randomValue <= 16) {
          resolve({
            result: 1,
            data: json_groups,
          });
        } else if (randomValue === 17) {
          resolve({
            result: 0,
          });
        } else if (randomValue === 18) {
          resolve({
            result: 1,
          });
        } else {
          reject("Сервер не доступен");
        }
      }, 1000),
    );
  }
}
