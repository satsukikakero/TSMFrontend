import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatInputModule, 
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatExpansionModule,
  MatSnackBarModule, 
  MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './registration/register.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './services/auth-service/auth.service'
import { AuthInterceptor } from './services/auth-service/auth.interceptor'
import { LayoutModule } from '@angular/cdk/layout';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { CommentComponent } from './comment/comment.component';

const routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskComponent},
  { path: 'add-task', component: AddTaskComponent},
  { path: 'task-view/:id/:typeid/:statusid/:createdate/:requiredbydate', component: TaskViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent,
    TaskComponent,
    AddTaskComponent,
    TaskViewComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
