import { Injectable } from '@angular/core';
import {Post} from '../models/Post';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  post: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor() {
    this.getPost();
  }

  emitPost() {
    this.postSubject.next(this.post);
  }

  savePost() {
    firebase.database().ref('/post').set(this.post);
  }

  getPost() {
    firebase.database().ref('/post').on('value', (data: DataSnapshot) => {
      this.post = data.val() ? data.val() : [];
      this.emitPost();
    });
  }

  createPost(newPost: Post) {
    this.post.push(newPost);
    this.savePost();
    this.emitPost();
  }

  removeItem(post: Post){
    const EventIndexToMove = this.post.findIndex(
      (EventEl) => {
        if(EventEl === post) {
          return true;
        }
      }
    );
    this.post.splice(EventIndexToMove, 1);
    this.savePost();
    this.emitPost();
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

