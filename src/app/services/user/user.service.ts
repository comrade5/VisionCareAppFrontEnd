import { Injectable } from '@angular/core';
import {StorageService} from "../../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStore: StorageService) { }

  saveUserId(userId: string) {
    this.localStore.saveData('id', userId);
  }

  getUserId() {
    this.localStore.getData('id');
  }
}
