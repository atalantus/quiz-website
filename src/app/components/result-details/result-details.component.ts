import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Question} from '../../value-types/question';
import {QuizService} from '../../services/quiz.service';
import {QuizResultService} from '../../services/quiz-result.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultDetailsComponent implements OnInit {

  questionResultDetail: Question;
  currentQuestion: number;
  questionsAmount: number;
  uuid: string;
  loadingQuestionDetails: boolean;

  @ViewChild('answerACheckbox') answerACheckbox;
  @ViewChild('answerBCheckbox') answerBCheckbox;
  @ViewChild('answerCCheckbox') answerCCheckbox;
  @ViewChild('answerDCheckbox') answerDCheckbox;

  constructor(private quizService: QuizService,
              private quizResultService: QuizResultService,
              private location: Location) {
  }

  ngOnInit() {
    this.uuid = this.quizResultService.uuid;
    this.loadingQuestionDetails = false;

    this.currentQuestion = -1;
    this.questionsAmount = this.quizResultService.wrongAnsweredQuestionIds.length - 1;

    this.getResultDetailsForQuestion();
  }

  getResultDetailsForQuestion() {
    this.loadingQuestionDetails = true;

    const qid = this.quizResultService.wrongAnsweredQuestionIds[this.currentQuestion + 1];

    this.quizService.getResultDetails(this.uuid, qid).subscribe(data => {
      if (data != null) {
        console.log('Loaded result details successfully');
        console.log(data);

        this.currentQuestion++;
        this.loadingQuestionDetails = false;
        this.questionResultDetail = data;
      } else {
        console.log('An error occurred while loading result details!');
      }
    });
  }

  continue() {
    if (this.currentQuestion < this.questionsAmount) {
      this.getResultDetailsForQuestion();
    } else {
      this.location.back();
    }
  }
}
