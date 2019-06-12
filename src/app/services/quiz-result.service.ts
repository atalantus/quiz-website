import { Injectable } from '@angular/core';
import {Belt} from '../components/home/home.component';

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
  selectedBelt: Belt;

  constructor() { }
}
