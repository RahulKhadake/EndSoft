import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/Register/register/register.component';
import { UserListComponent } from './Login/Userlist/user-list/user-list.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

    // Default route to redirect to login
  { path: '', redirectTo: 'Login', pathMatch: 'full' },

  // Login page route
  { path: 'Login', component: LoginComponent, title: 'Login Page' },
   // Register page route (accessible without logging in)
   { path: 'register', component: RegisterComponent, title: 'Register-Page',canActivate:[authGuard]},
   { path: 'Userlistpage', component: UserListComponent, title: 'Userlist-Page',canActivate:[authGuard]},

   // Wildcard route for handling 404 (redirect to login if path not found)
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];
