import {Injectable} from '@angular/core';
import {InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  question = [
    {
      question: 'Which fictional city is the home of Batman?',
      answer1: 'Gotham City',
      answer2: 'Munich',
      answer3: 'New York',
      answer4: 'Atlantis',
      id: 0
    },
    {
      question: 'Which planet is nearest the sun?',
      answer1: 'Earth',
      answer2: 'Mercury',
      answer3: 'Mars',
      answer4: 'Venus',
      id: 1
    },
    {
      question: 'What is the largest number of five digits?',
      answer1: '00000',
      answer2: '1234567890',
      answer3: '99999',
      answer4: '23495',
      id: 2
    },
    {
      question: 'What colour to do you get when you mix red and white?',
      answer1: 'Blue',
      answer2: 'White',
      answer3: 'Red',
      answer4: 'Pink',
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

    if (url === 'api/sendAnswer') {
      console.log(requestInfoUtils);

      newUrl = 'api/questionCorrectAnswer?questionId=0';
    } else if (url === 'api/question/total') {
      newUrl = 'api/questionsAmount';
    } else if (url === 'api/getQuestion') {
      const questionId = Math.floor(Math.random() * this.question.length);

      newUrl = `api/question/${questionId}`;
    } else {
      newUrl = url;
    }

    return requestInfoUtils.parseRequestUrl(newUrl);
  }
}
