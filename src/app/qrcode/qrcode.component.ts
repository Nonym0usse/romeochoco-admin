import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {qrCode} from '../models/qrCode';
import {QrcodeService} from '../services/qrcode.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  public myAngularxQrCode: string = null;

  ngOnInit() {
  }

  constructor(private qrcodeService: QrcodeService) {
    const myId = uuid.v4();
    this.myAngularxQrCode = 'http://romeochoco.atspace.eu/' + myId;
  }

  save(data: string){
    const QrCode = new qrCode();
    QrCode.url = data;
    this.qrcodeService.createQrCode(QrCode);
    alert('Qr code enregistré');
  }
}
