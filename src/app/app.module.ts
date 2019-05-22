import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

/** COMPONENT **/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { PostComponent } from './article/post/post.component';
import { ListComponent } from './article/list/list.component';
import { ItemComponent } from './shop/item/item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './shop/main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrcodeComponent,
    PostComponent,
    ListComponent,
    ItemComponent,
    DashboardComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
