import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { EditprofileComponent } from './user/editprofile/editprofile.component';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthResolver } from './core/resolver/auth.resolver';
const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    resolve: {
      auth: AuthResolver,
    },
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    resolve: {
      auth: AuthResolver,
    },
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
  {
    path: 'profile/edit/:id',
    component: EditprofileComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'tasks/create',
    component: CreateTaskComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'tasks/edit/:id',
    component: EditTaskComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
