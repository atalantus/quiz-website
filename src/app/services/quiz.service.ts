import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {Question} from '../value-types/question';
import {catchError, map, tap} from 'rxjs/operators';

const apiBaseUrl = 'rest/demo';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {
  }

  registerUser(uuid: string): Observable<undefined> {
    return this.http.get<undefined>(`${apiBaseUrl}/start?userid=${uuid}`)
      .pipe(
        tap(data => console.log(`QuizService - registerUser(${uuid})`)),
        catchError(this.handleError(`registerUser(${uuid})`, null))
      );
  }

  /**
   * GET - get`s a question
   * @return - null if an error occurred otherwise a Question object
   */
  getQuestion(): Observable<Question | null> {
    return this.http.get<Question>(`${apiBaseUrl}/getQuestion`)
      .pipe(
        tap(data => console.log(`QuizSerivce - getQuestion()`)),
        map(data => {
          const q = new Question();
          q.loadData(data);
          return q;
        }),
        catchError(this.handleError(`getQuestion()`, null))
      );
  }

  /**
   * GET - get`s the total amount of questions
   */
  getQuestionAmount(): Observable<number> {
    return this.http.get<number>(`${apiBaseUrl}/getNumberOfQuestions`)
      .pipe(
        tap(data => console.log(`QuizService - getQuestionAmount()`)),
        catchError(this.handleError(`getQuestionAmount()`, -1))
      );
  }

  /**
   * GET - checks if a question was correctly answered
   * @param questionId - id of the question
   * @param answerIndexes - indexes of the chosen answers
   */
  checkAnswer(questionId: number, answerIndexes: number[]): Observable<boolean | null> {
    const chosenAnswerIndexes = answerIndexes.map(i => i + 1).join('');

    return this.http.get<boolean>(`${apiBaseUrl}/sendAnswer?qid=${questionId}&answer=${chosenAnswerIndexes}`)
      .pipe(
        tap(value => console.log(`QuizService - checkAnswer(${questionId}, ${chosenAnswerIndexes})`)),
        catchError(this.handleError(`checkAnswer(${questionId}, ${chosenAnswerIndexes})`, null))
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
