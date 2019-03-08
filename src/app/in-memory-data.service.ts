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

    const questionCorrectAnswer = true;

    const questionsAmount = this.question.length;

    const registerUser = {};

    return {question, questionCorrectAnswer, questionsAmount, registerUser};
  }

  parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    let newUrl = '';

    if (url.includes('rest/demo/sendAnswer')) {
      console.log(requestInfoUtils);

      newUrl = 'api/questionCorrectAnswer';
    } else if (url === 'rest/demo/getNumberOfQuestions') {
      newUrl = 'api/questionsAmount';
    } else if (url === 'rest/demo/getQuestion') {
      const questionId = Math.floor(Math.random() * this.question.length);

      newUrl = `api/question/${questionId}`;
    } else if (url.includes('rest/demo/start?userid')) {
      newUrl = 'api/registerUser';
    } else if (url.includes('rest/demo/getResults')) {
      newUrl = 'api/questionsAmount';
    }

    return requestInfoUtils.parseRequestUrl(newUrl);
  }
}
