import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutPageComponent } from './workout-page/workout-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutListComponent,
    data: { title: 'Список тренировок' },
  },
  {
    path: ':id',
    component: WorkoutPageComponent,
    data: { title: 'Страница тренировки' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutListRoutingModule {}
