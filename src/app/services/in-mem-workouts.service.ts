import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export interface Workout {
  title: string;
  description: string;
  dateWorkout: string;
  path: string;
  annotations: Array<any>;
  dateCreating: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class InMemWorkoutsService implements InMemoryDbService {
  createDb(): { workouts: Workout[] } {
    const workouts: Workout[] = [
      {
        title: 'Поднимаю штангу',
        description: '7 подходов по 80кг',
        dateWorkout: '2020-12-19T12:21:26.172Z',
        path: 'videos/Становая тяга.mp4',
        annotations: [],
        dateCreating: '2020-12-22T10:55:00.408Z',
        id: 1,
      },
      {
        title: 'Поднимаю гирю',
        description: '3 подхода по 12 раз: 20кг',
        dateWorkout: '2020-12-21T12:21:38.408Z',
        path: 'videos/Становая тяга.mp4',
        annotations: [],
        dateCreating: '2020-12-22T11:01:00.408Z',
        id: 2,
      },
      {
        title: 'Становая тяга',
        description: '3 подхода по 12 раз: 45кг',
        dateWorkout: '2020-12-25T12:00:00.408Z',
        path: 'videos/Становая тяга.mp4',
        annotations: [],
        dateCreating: '2020-12-22T11:01:00.408Z',
        id: 3,
      },
    ];
    return { workouts };
  }
}
