import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutListRoutingModule } from './workout-list-routing.module';
import { WorkoutListComponent } from './workout-list.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { LoadDialogModule } from './load-dialog/load-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadDialogComponent } from './load-dialog/load-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';

@NgModule({
  declarations: [WorkoutListComponent, WorkoutPageComponent],
  entryComponents: [LoadDialogComponent],
  imports: [
    CommonModule,
    WorkoutListRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LoadDialogModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class WorkoutListModule {}
