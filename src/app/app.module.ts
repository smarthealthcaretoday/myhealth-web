import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {LoginService} from "./login.service";
import { RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginFormComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
