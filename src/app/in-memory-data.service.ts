import {Injectable} from '@angular/core';
import {InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  question = [
    {
      question: 'Which fictional city is the home of Batman?',
      answer1: 'Atlantis',
      answer2: 'Munich',
      answer3: 'New York',
      answer4: 'Gotham City',
      id: 0,
      correct: '34'
    },
    {
      question: 'Which planet is nearest the sun?',
      answer1: 'Lorem ipsum sit dolem lala Lorem ipsum Lorem ipsum lala tam kot',
      answer2: 'Mercury',
      answer3: 'Mars',
      answer4: 'n/a',
      id: 1,
      correct: '12'
    },
    {
      question: 'What is the largest number of five digits?',
      answer1: '00000',
      answer2: '1234567890',
      answer3: 'n/a',
      answer4: 'n/a',
      id: 2,
      correct: '2'
    },
    {
      question: 'What colour to do you get when you mix red and white?',
      answer1: 'Blue',
      answer2: 'n/a',
      answer3: 'n/a',
      answer4: 'n/a',
      id: 3,
      correct: '1'
    }
  ];

  nextQuestion = 0;

  createDb() {
    const question = this.question;

    const questionCorrectAnswer = true;

    const questionsAmount = this.question.length;

    const wrongAnsweredQuestionIds = '0,1,2,3';

    const registerUser = 'abc123';

    return {question, questionCorrectAnswer, wrongAnsweredQuestionIds, questionsAmount, registerUser};
  }

  parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    let newUrl = '';

    if (url.includes('rest/demo/sendAnswer')) {
      console.log(requestInfoUtils);

      newUrl = 'api/questionCorrectAnswer';
    } else if (url.includes('rest/demo/getNumberOfQuestions')) {
      newUrl = 'api/questionsAmount';
    } else if (url.includes('rest/demo/getQuestion')) {
      const questionId = this.nextQuestion;

      this.nextQuestion++;

      newUrl = `api/question/${questionId}`;
    } else if (url.includes('rest/demo/start?userid')) {
      newUrl = 'api/registerUser';
    } else if (url.includes('rest/demo/getResults')) {
      newUrl = 'api/wrongAnsweredQuestionIds';
    } else if (url.includes('rest/demo/getResultDetails')) {
      newUrl = 'api/question';
    }

    return requestInfoUtils.parseRequestUrl(newUrl);
  }
}
