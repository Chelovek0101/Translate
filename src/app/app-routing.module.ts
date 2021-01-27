import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { AuthGuard } from './guard/auth.guard';*/

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () =>
  //     import('./home/home.module').then((module) => module.HomeModule),
  // },
  {
    path: 'workout',
    loadChildren: () =>
      import('./workout-list/workout-list.module').then(
        (module) => module.WorkoutListModule
      ),
    /*canActivate: [AuthGuard],*/
  },
  /*{
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((module) => module.LoginModule),
  },
  { path: '**', redirectTo: 'login' },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
