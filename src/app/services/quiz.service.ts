import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Question} from '../value-types/question';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {
  }

  /**
   * GET - get`s a question
   * @param questionId - the id of the question
   * @return - null if an error occurred otherwise a Question object
   */
  getQuestion(questionId: number): Observable<Question | null> {
    return this.http.get<Question>(`api/question/${questionId}`)
      .pipe(
        tap(data => console.log(`QuizSerivce - getQuestion(${questionId})`)),
        map(data => {
          const q = new Question();
          q.loadData(data);
          return q;
        }),
        catchError(this.handleError(`getQuestion${questionId}`, null))
      );
  }

  /**
   * POST - checks if a question was correctly answered
   * @param questionId - id of the question
   * @param answerIndex - index of the chosen answer
   */
  checkAnswer(questionId: number, answerIndex: number): Observable<boolean | null> {
    return this.http.post<boolean>(`api/checkAnswer`, {questionId, answerIndex}, httpOptions)
      .pipe(
        tap(data => console.log(`QuizService - checkAnswer(${questionId}, ${answerIndex})`)),
        catchError(this.handleError('checkAnswer', null))
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
