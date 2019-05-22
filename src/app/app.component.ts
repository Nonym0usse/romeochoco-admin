import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'romeochoco-admin';
  constructor(){
    const config = {
      apiKey: "AIzaSyBreTpNGGLVTGAvMmildlcTdMJ67agfpT4",
      authDomain: "my-project-1529914757181.firebaseapp.com",
      databaseURL: "https://my-project-1529914757181.firebaseio.com",
      projectId: "my-project-1529914757181",
      storageBucket: "my-project-1529914757181.appspot.com",
      messagingSenderId: "345614423497",
      appId: "1:345614423497:web:08ff8298edaac5d8"
    };
    firebase.initializeApp(config);
  }
}
