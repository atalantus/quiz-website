import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';
import {Question} from '../../value-types/question';
import {QuizResultService} from '../../services/quiz-result.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

  question: Question;
  currentQuestion: number;
  questionsAmount: number;
  loadingQuestion: boolean;
  uuid: string;
  askedQuestions: number[];

  @ViewChild('answerACheckbox') answerACheckbox;
  @ViewChild('answerBCheckbox') answerBCheckbox;
  @ViewChild('answerCCheckbox') answerCCheckbox;
  @ViewChild('answerDCheckbox') answerDCheckbox;
  private alreadyToggled = false;

  constructor(private quizService: QuizService,
              private quizResultService: QuizResultService,
              private router: Router) {
  }

  ngOnInit() {
    this.uuid = this.quizResultService.uuid;
    this.askedQuestions = [];

    this.currentQuestion = 1;
    this.getQuestionsAmount();
    this.getQuestion();
  }

  getQuestionsAmount() {
    this.quizService.getQuestionAmount(this.uuid).subscribe(amount => {
      if (amount !== -1) {
        console.log('Loaded total amount of questions successfully');
        console.log(amount);
        this.questionsAmount = amount;
      } else {
        console.log('An error occurred while loadingQuestion the total amount of questions!');
        this.questionsAmount = 10;
      }

      this.quizResultService.totalQuestions = this.questionsAmount;
    });
  }

  getQuestion() {
    this.quizService.getQuestion(this.uuid).subscribe(question => {
      this.loadingQuestion = false;

      if (this.answerACheckbox !== undefined) {
        this.answerACheckbox.checked = false;
        this.answerBCheckbox.checked = false;
        this.answerCCheckbox.checked = false;
        this.answerDCheckbox.checked = false;
      }

      if (question != null) {
        console.log('Loaded question successfully');
        console.log(question);

        this.question = question;
      } else {
        console.log('An error occurred while loading the question!');
      }
    });
  }

  continue() {
    // Send answers
    this.sendAnswers();
  }

  sendAnswers() {
    this.loadingQuestion = true;

    this.askedQuestions.push(this.question.id);

    const answers = [];

    if (this.answerACheckbox.checked) {
      answers.push(0);
    }
    if (this.answerBCheckbox.checked) {
      answers.push(1);
    }
    if (this.answerCCheckbox.checked) {
      answers.push(2);
    }
    if (this.answerDCheckbox.checked) {
      answers.push(3);
    }

    this.quizService.checkAnswer(this.uuid, this.question.id, answers).subscribe(value => {
      console.log(`Answered question correct: ${value}`);

      if (this.currentQuestion >= this.questionsAmount) {

        this.quizService.getCorrectQuestionsAmount(this.uuid).subscribe(amount => {
          this.quizResultService.correctAnsweredQuestions = amount;

          this.router.navigateByUrl('/result');
        });
      } else {
        // Load next question
        this.getQuestion();
        this.currentQuestion++;
      }
    });
  }

  clickedCard(answer: number) {
    if (this.alreadyToggled) {
      this.alreadyToggled = false;
      return;
    }

    let el;

    switch (answer) {
      case 0:
        el = this.answerACheckbox;
        break;
      case 1:
        el = this.answerBCheckbox;
        break;
      case 2:
        el = this.answerCCheckbox;
        break;
      case 3:
        el = this.answerDCheckbox;
        break;
    }

    el.toggle();
    el.ripple.launch();
  }
}
