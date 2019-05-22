/**
 * Created by CYRIL VELLA
 */

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {qrCode} from '../models/qrCode';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  qrcode: qrCode[] = [];
  qrCodeSubject = new Subject<qrCode[]>();

  constructor() {
  }

  emitQrCode() {
    this.qrCodeSubject.next(this.qrcode);
  }

  saveQrCode() {
    firebase.database().ref('/qrcode').set(this.qrcode);
  }

  createQrCode(newQrCode: qrCode) {
    this.qrcode.push(newQrCode);
    this.saveQrCode();
    this.emitQrCode();
  }
}
