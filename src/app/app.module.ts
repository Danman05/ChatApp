import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';

import { provideAnimations } from '@angular/platform-browser/animations';

import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchComponent } from './home-page/search/search.component';
import { MessageContentComponent } from './home-page/message-content/message-content.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserResultComponent } from './home-page/search/user-result/user-result.component';
import { PostFormComponent } from './home-page/message-content/post-form/post-form.component';
import { EditProfileDialogComponent } from './profile-page/edit-profile-dialog/edit-profile-dialog.component';
import { MessagesComponent } from './home-page/message-content/messages/messages.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
    SearchComponent,
    MessageContentComponent,
    HeaderComponent,
    LoginPageComponent,
    SignupPageComponent,
    UserResultComponent,
    PostFormComponent,
    EditProfileDialogComponent,
    MessagesComponent,
    AdminComponent,
    AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
