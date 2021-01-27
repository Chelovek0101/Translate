import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout } from './in-mem-workouts.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutUrl = 'api/workouts';
  private workoutList$ = new BehaviorSubject<Workout[]>([]);

  constructor(private http: HttpClient) {}

  getWorkoutList(): Observable<Workout[]> {
    // Возвращает весь список тренировок
    this.get();
    return this.workoutList$.asObservable();
  }

  getWorkoutById(id: number): Promise<object> {
    return this.http.get(`${this.workoutUrl}/${id}`).toPromise();
  }

  addWorkout(title: string, description: string, dateWorkout: Date): void {
    let workout: any = {
      title,
      description,
      dateWorkout,
      path: 'videos/Становая тяга.mp4',
      annotations: [],
      dateCreating: new Date(),
    };
    this.http
      .get<Workout[]>(this.workoutUrl)
      .toPromise()
      .then((data) => {
        if (data.length === 0) {
          workout = Object.assign(workout, { id: 1 });
        }
        this.post(workout).then(() => this.get());
      });
  }

  updateWorkout(
    id: number,
    title: string,
    description: string,
    dateWorkout: Date
  ): void {
    const workout: any = {
      title,
      description,
      dateWorkout,
      path: 'videos/Становая тяга.mp4',
      annotations: [],
      dateCreating: new Date(),
      id,
    };
    this.put(workout).then(() => this.get());
  }

  deleteWorkout(id: number): void {
    this.delete(id).then(() => this.get());
  }

  private get(): void {
    this.http
      .get<Workout[]>(this.workoutUrl)
      .toPromise()
      .then((data) => this.workoutList$.next(data));
  }

  private post(workout: Workout): Promise<object> {
    return this.http.post(this.workoutUrl, workout).toPromise();
  }

  private put(workout: Workout): Promise<object> {
    return this.http.put(`${this.workoutUrl}`, workout).toPromise();
  }

  private delete(id: number): Promise<object> {
    return this.http.delete(`${this.workoutUrl}/${id}`).toPromise();
  }
}
