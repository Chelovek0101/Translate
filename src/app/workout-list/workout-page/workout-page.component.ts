import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../services/in-mem-workouts.service';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.scss'],
})
export class WorkoutPageComponent implements OnInit {
  workout: Workout | undefined;

  constructor(
    private activatedRouter: ActivatedRoute,
    private woSvc: WorkoutService
  ) {}

  ngOnInit(): void {
    const workoutIdStr = this.activatedRouter.snapshot.paramMap.get('id');
    if (workoutIdStr) {
      const id = parseInt(workoutIdStr, 10);
      this.woSvc
        .getWorkoutById(id)
        .then((data) => (this.workout = data as Workout));
    }
  }
}
