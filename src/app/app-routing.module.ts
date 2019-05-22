import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListComponent} from './article/list/list.component';
import {PostComponent} from './article/post/post.component';
import {QrcodeComponent} from './qrcode/qrcode.component';
import {LoginComponent} from './login/login.component';
import {ItemComponent} from './shop/item/item.component';
import {MainComponent} from './shop/main/main.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'article/posts', component: ListComponent},
  {path: 'article/add', component: PostComponent},
  {path: 'qrcode', component: QrcodeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shop/item', component: ItemComponent},
  {path: 'shop/list', component: MainComponent},
  { path: 'shop/new', component: ItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
