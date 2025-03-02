import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
import { SignUpComponent } from './pages/login-layout/sign-up/sign-up.component';
import { SignInComponent } from './pages/login-layout/sign-in/sign-in.component';
import { StyleGuidComponent } from './style-guid/style-guid.component';
import { ConditionalFormControlNameDirective } from './shared/atoms/herum-input-field/conditional-form-control-name.directive';
import { RadioButtonComponent } from './shared/atoms/radio-button/radio-button.component';
import { HeaderComponent } from './pages/header/header.component';
import { HeaderMenuComponent } from './pages/header/header-menu/header-menu.component';
import { HeaderControllersComponent } from './pages/header/header-controllers/header-controllers.component';
import { FeedModule } from './feed/feed.module';
import { SharedModule } from './shared/shared.module';
import { NotebookDialogComponent } from './pages/header/notebook-dialog/notebook-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { QuillModule } from 'ngx-quill';
import { HomepageModule } from './homepage/homepage.module';
import { LoginPageAnimatedContainerComponent } from './pages/login-layout/login-page-animated-container/login-page-animated-container.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    SignUpComponent,
    SignInComponent,
    StyleGuidComponent,
    ConditionalFormControlNameDirective,
    RadioButtonComponent,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderControllersComponent,
    NotebookDialogComponent,
    LoginPageAnimatedContainerComponent,
  ],
  imports: [
    MatDialogModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    
    QuillModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FeedModule,
    SharedModule,
    HomepageModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }



