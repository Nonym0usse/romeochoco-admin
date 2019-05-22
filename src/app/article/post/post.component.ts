/**
 * Created by CYRIL VELLA
 */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  ItemForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ItemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.blogService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  addItem() {
    const title = this.ItemForm.get('title').value;
    const newPost = new Post(title);
    newPost.description = this.ItemForm.get('description').value;
    newPost.publication = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    if (this.fileUrl && this.fileUrl !== '') {
      newPost.picture = this.fileUrl;
    }
    this.blogService.createPost(newPost);
    this.router.navigate(['/post', 'new']);
  }

  detectFiles(item) {
    this.onUploadFile(item.target.files[0]);
  }
}
