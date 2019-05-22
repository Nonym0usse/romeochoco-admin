import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Item} from '../../models/Item';
import {Post} from '../../models/post';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postSuscription: Subscription;
  posts: Post[];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.postSuscription = this.blogService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.blogService.emitPost();
  }

}
