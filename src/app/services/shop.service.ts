import { Injectable } from '@angular/core';
import {Item} from '../models/Item';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  item: Item[] = [];
  itemSubject = new Subject<Item[]>();

  constructor() {
    this.getItem();
  }

  emitItem() {
    this.itemSubject.next(this.item);
  }

  saveItem() {
    firebase.database().ref('/item').set(this.item);
  }

  getItem() {
    firebase.database().ref('/item').on('value', (data: DataSnapshot) => {
      this.item = data.val() ? data.val() : [];
      this.emitItem();
    });
  }

  createItem(newItem: Item) {
    this.item.push(newItem);
    this.saveItem();
    this.emitItem();
  }

  removeItem(item: Item){
    const EventIndexToMove = this.item.findIndex(
      (EventEl) => {
        if(EventEl === item) {
          return true;
        }
      }
    );
    this.item.splice(EventIndexToMove, 1);
    this.saveItem();
    this.emitItem();
  }

  uploadFile(file: File) {
    console.log(file);
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file)
          .then(snapshot => {
            return snapshot.ref.getDownloadURL();
          })
          .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            resolve(downloadURL);
          })
          .catch(error => {
            console.log(`Failed to upload file and get link - ${error}`);
            reject();
          });
      }
    );
  }﻿
}

