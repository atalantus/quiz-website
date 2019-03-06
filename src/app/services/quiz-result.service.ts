import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  correctAnswered: number;
  totalQuestions: number;

  constructor() { }
}
