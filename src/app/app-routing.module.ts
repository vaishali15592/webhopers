import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:'', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'changepassword', component: ChangePasswordComponent},
  {path: 'welcome', component: WelcomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
