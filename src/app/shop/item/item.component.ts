import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShopService} from '../../services/shop.service';
import {Item} from '../../models/Item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  ItemForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private shopService: ShopService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],

    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.shopService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  addItem() {
    const name = this.ItemForm.get('name').value;
    const newItem = new Item(name);
    newItem.price = this.ItemForm.get('price').value;
    newItem.description = this.ItemForm.get('description').value;
    newItem.quantity = this.ItemForm.get('quantity').value;

    if (this.fileUrl && this.fileUrl !== '') {
      newItem.picture = this.fileUrl;
    }
    this.shopService.createItem(newItem);
    this.router.navigate(['/item', 'new']);
  }

  detectFiles(item) {
    this.onUploadFile(item.target.files[0]);
  }
}
