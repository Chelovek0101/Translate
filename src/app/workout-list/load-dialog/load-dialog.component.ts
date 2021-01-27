import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../services/in-mem-workouts.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LoadDialogComponent {
  dialogForm: FormGroup;

  textAcceptButton = 'Добавить';
  matDialogTitleText = 'Новая тренировка';

  progressBarIsDisplay = true;

  constructor(
    private woSvc: WorkoutService,
    @Inject(MAT_DIALOG_DATA) private data?: { id: number }
  ) {
    this.dialogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      dateWorkout: new FormControl(moment()),
      videos: new FormControl(null, FileUploadValidators.filesLimit(1)),
    });
    this.dialogForm.disable();

    if (this.data) {
      this.textAcceptButton = 'Сохранить';
      this.woSvc.getWorkoutById(this.data.id).then((workoutData) => {
        const workout = workoutData as Workout;
        this.dialogForm.patchValue({
          title: workout.title,
          description: workout.description,
          dateWorkout: workout.dateWorkout,
        });
        this.matDialogTitleText = this.dialogForm.value.title;
        this.dialogForm.enable();
        this.progressBarIsDisplay = false;
      });
    } else {
      this.dialogForm.enable();
      this.progressBarIsDisplay = false;
    }
  }

  getFormFields(): string {
    return JSON.stringify(this.dialogForm.getRawValue());
  }

  titleChanging(): void {
    if (this.data) {
      if (this.dialogForm.value.title) {
        this.matDialogTitleText = this.dialogForm.value.title;
      } else {
        this.matDialogTitleText = '\u0000';
      }
    }
  }
}
