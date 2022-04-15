import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { 
    path: '',  
    canActivate: [LoginGuard],
    component: LoginComponent,
    // resolve: {
    //   ratedata:UserResolver
    // }
  },
  { 
    path: 'register',  

    component: RegisterComponent,
    // resolve: {
    //   ratedata:UserResolver
    // }
  },
  { 
    path: 'login', 
    canActivate: [LoginGuard], 
    component: LoginComponent,
    // resolve: {
    //   ratedata:UserResolver
    // }
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard], 
    component: DashboardComponent,
  },
  { 
    path: 'profile', 
    canActivate: [AuthGuard], 
    component: ProfileComponent,
  },
  { 
    path: 'help', 
    canActivate: [AuthGuard], 
    component: HelpComponent,
  },
  { 
    path: 'about', 
    canActivate: [AuthGuard], 
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
