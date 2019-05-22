import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Item} from '../../models/Item';
import {ShopService} from '../../services/shop.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ItemSuscription: Subscription;
  items: Item[];
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.ItemSuscription= this.shopService.itemSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
    this.shopService.emitItem();
  }

}
