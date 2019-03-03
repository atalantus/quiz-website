import {Injectable} from '@angular/core';
import {InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  question = [
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
      question: 'Which planet is nearest the sun?', answers:
        [
          'Earth',
          'Mercury',
          'Mars',
          'Venus'
        ],
      id: 1
    },
    {
      question: 'What is the largest number of five digits?', answers:
        [
          '00000',
          '1234567890',
          '99999',
          '23495'
        ],
      id: 2
    },
    {
      question: 'What colour to do you get when you mix red and white?', answers:
        [
          'Blue',
          'White',
          'Red',
          'Pink'
        ],
      id: 3
    }
  ];

  createDb() {
    const question = this.question;

    const questionCorrectAnswer = [
      {questionId: 0, correctAnswerIndex: 0},
      {questionId: 1, correctAnswerIndex: 1},
      {questionId: 2, correctAnswerIndex: 2},
      {questionId: 3, correctAnswerIndex: 3},
    ];

    const questionsAmount = this.question.length;

    return {question, questionCorrectAnswer, questionsAmount};
  }

  parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    let newUrl = '';

    if (url === 'api/checkAnswer') {
      console.log(requestInfoUtils);

      newUrl = 'api/questionCorrectAnswer?questionId=0';
    } else if (url === 'api/question/total') {
      newUrl = 'api/questionsAmount';
    } else if (url === 'api/question') {
      const questionId = Math.floor(Math.random() * this.question.length);

      newUrl = `api/question/${questionId}`;
    } else {
      newUrl = url;
    }

    return requestInfoUtils.parseRequestUrl(newUrl);
  }
}
