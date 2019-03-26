import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Stores quiz related data between components
 */
export class QuizResultService {
  correctAnsweredQuestions: number;
  totalQuestions: number;
  userId: string;
  uuid: string;

  constructor() { }
}
