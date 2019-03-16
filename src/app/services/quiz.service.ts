import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {Question} from '../value-types/question';
import {catchError, map, tap} from 'rxjs/operators';
import {text} from '@angular/core/src/render3';
import {forEach} from '@angular/router/src/utils/collection';

const apiBaseUrl = 'rest/demo';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {
  }

  /**
   * GET - registers a new user
   * @param uid - id of the user
   * @return - the unique user id for the client
   */
  registerUser(uid: string): Observable<string> {
    return this.http.get(`${apiBaseUrl}/start?userid=${uid}`, {responseType: 'text'})
      .pipe(
        tap(data => console.log(`QuizService - registerUser(${uid})`)),
        catchError(this.handleError(`registerUser(${uid})`, ''))
      );
  }

  /**
   * GET - get`s a question
   * @param alreadyAsked - collection of the ids of the already asked questions
   * @return - null if an error occurred otherwise a Question object
   */
  getQuestion(alreadyAsked: number[]): Observable<Question | null> {
    let alreadyAskedIds = '';

    alreadyAsked.forEach(id => {
      alreadyAskedIds += `&id=${id}`;
    });

    if (alreadyAskedIds !== '') {
      alreadyAskedIds = alreadyAskedIds.substring(1);
    }

    return this.http.get<Question>(`${apiBaseUrl}/getQuestion?${alreadyAskedIds}`)
      .pipe(
        tap(data => console.log(`QuizSerivce - getQuestion(${alreadyAsked})`)),
        map(data => {
          const q = new Question();
          q.loadData(data);
          return q;
        }),
        catchError(this.handleError(`getQuestion(${alreadyAsked})`, null))
      );
  }

  /**
   * GET - get`s the total amount of questions
   * @return - total amount of questions
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
   * @param uuid - unique user id
   * @param questionId - id of the question
   * @param answerIndexes - indexes of the chosen answers
   */
  checkAnswer(uuid: string, questionId: number, answerIndexes: number[]): Observable<boolean | null> {
    const chosenAnswerIndexes = answerIndexes.map(i => i + 1).join('');

    return this.http.get<boolean>(`${apiBaseUrl}/sendAnswer?uuid=${uuid}?qid=${questionId}&answer=${chosenAnswerIndexes}`)
      .pipe(
        tap(value => console.log(`QuizService - checkAnswer(${uuid}, ${questionId}, ${chosenAnswerIndexes})`)),
        catchError(this.handleError(`checkAnswer(${uuid}, ${questionId}, ${chosenAnswerIndexes})`, null))
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
