import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../value-types/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Question;
  currentQuestion: number;
  questionsAmount: number;
  loadingQuestion: boolean;

  @ViewChild('answerACheckbox') answerACheckbox;
  @ViewChild('answerBCheckbox') answerBCheckbox;
  @ViewChild('answerCCheckbox') answerCCheckbox;
  @ViewChild('answerDCheckbox') answerDCheckbox;
  private alreadyToggled = false;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.currentQuestion = 1;
    this.getQuestionsAmount();
    this.getQuestion();
  }

  getQuestionsAmount() {
    this.quizService.getQuestionAmount().subscribe(amount => {
      if (amount !== -1) {
        console.log('Loaded total amount of questions successfully');
        console.log(amount);
        this.questionsAmount = amount;
      } else {
        console.log('An error occurred while loadingQuestion the total amount of questions!');
      }
    });
  }

  getQuestion() {
    this.loadingQuestion = true;
    this.quizService.getQuestion().subscribe(question => {
      this.loadingQuestion = false;
      if (question != null) {
        console.log('Loaded question successfully');
        console.log(question);
        this.question = question;
      } else {
        console.log('An error occurred while loadingQuestion the question!');
      }
    });
  }

  continue() {
    if (this.currentQuestion < this.questionsAmount) {
      // Load next question
      this.getQuestion();
      this.currentQuestion++;
    } else {
      console.log('Show results');
    }
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
