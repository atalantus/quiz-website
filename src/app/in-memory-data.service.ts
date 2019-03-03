import {Injectable} from '@angular/core';
import {InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const question = [
      {
        question: 'Which fictional city is the home of Batman?', answers:
          [
            'Gotham City',
            'Munich',
            'New York',
            'Atlantis'
          ],
        id: 0
      },
      {
        question: 'Question 2', answers:
          [
            'Answer A',
            'Answer B',
            'Answer C',
            'Answer D'
          ],
        id: 1
      },
      {
        question: 'Question 3', answers:
          [
            'Answer A',
            'Answer B',
            'Answer C',
            'Answer D'
          ],
        id: 2
      },
      {
        question: 'Question 4', answers:
          [
            'Answer A',
            'Answer B',
            'Answer C',
            'Answer D'
          ],
        id: 3
      }
    ];

    const questionCorrectAnswer = [
      {questionId: 0, correctAnswerIndex: 0},
      {questionId: 1, correctAnswerIndex: 1},
      {questionId: 2, correctAnswerIndex: 2},
      {questionId: 3, correctAnswerIndex: 3},
    ];

    return {question, questionCorrectAnswer};
  }

  parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    let newUrl = '';

    if (url === 'api/checkAnswer') {
      console.log(requestInfoUtils);

      newUrl = 'api/questionCorrectAnswer?questionId=0';
    } else {
      newUrl = url;
    }

    return requestInfoUtils.parseRequestUrl(newUrl);
  }
}
