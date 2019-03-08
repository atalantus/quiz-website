import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

const apiBaseUrl = 'rest/demo';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  correctAnsweredQuestions: number;
  totalQuestions: number;
  userId: string;

  constructor(private http: HttpClient) { }

  /**
   * GET - get`s the total amount of correct answered questions
   */
  getCorrectQuestionsAmount(userId: string): Observable<number> {
    return this.http.get<number>(`${apiBaseUrl}/getResults?uid=${userId}`)
      .pipe(
        tap(data => console.log(`QuizResultService - getCorrectQuestionsAmount(${userId})`)),
        catchError(this.handleError(`getCorrectQuestionsAmount(${userId})`, 0))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
