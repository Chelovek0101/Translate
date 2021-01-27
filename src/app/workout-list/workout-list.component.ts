import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../services/in-mem-workouts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoadDialogComponent } from './load-dialog/load-dialog.component';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  workoutList: Array<Workout> = [];
  displayedColumns: Array<string> = [
    'view',
    'title',
    'dateWorkout',
    'edit',
    'delete',
  ];

  constructor(private woSvc: WorkoutService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.woSvc
      .getWorkoutList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.workoutList = data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addWorkoutDialog(): void {
    this.dialog
      .open(LoadDialogComponent, {
        maxWidth: 700,
        width: '100%',
      })
      .afterClosed()
      .subscribe((rowData: string) => {
        if (rowData && rowData !== 'cancel') {
          const workoutData: {
            title: string;
            description: string;
            dateWorkout: Date;
            videos: null;
          } = JSON.parse(rowData);
          this.woSvc.addWorkout(
            workoutData.title,
            workoutData.description,
            workoutData.dateWorkout
          );
        }
      });
  }

  editWorkoutDialog(id: number): void {
    this.dialog
      .open(LoadDialogComponent, {
        maxWidth: 700,
        width: '100%',
        data: { id },
      })
      .afterClosed()
      .subscribe((rowData: string) => {
        if (rowData && rowData !== 'cancel') {
          const workoutData: {
            id: number;
            title: string;
            description: string;
            dateWorkout: Date;
            videos: null;
          } = JSON.parse(rowData);
          this.woSvc.updateWorkout(
            id,
            workoutData.title,
            workoutData.description,
            workoutData.dateWorkout
          );
        }
      });
  }

  delete(id: number): void {
    this.woSvc.deleteWorkout(id);
  }
}
