import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Question} from '../../value-types/question';
import {QuizService} from '../../services/quiz.service';
import {QuizResultService} from '../../services/quiz-result.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {

  questionResultDetail: Question[];
  currentQuestion: number;
  questionsAmount: number;
  uuid: string;

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

    this.currentQuestion = 1;
    this.getResultDetails();
  }

  getResultDetails() {
    this.quizService.getResultDetails(this.uuid).subscribe(data => {
      if (this.answerACheckbox !== undefined) {
        this.answerACheckbox.checked = false;
        this.answerBCheckbox.checked = false;
        this.answerCCheckbox.checked = false;
        this.answerDCheckbox.checked = false;
      }

      if (data != null) {
        console.log('Loaded result details successfully');
        console.log(data);

        this.currentQuestion = 0;
        this.questionsAmount = data.length - 1;
        this.questionResultDetail = data;
      } else {
        console.log('An error occurred while loading result details!');
      }
    });
  }

  continue() {
    if (this.currentQuestion < this.questionsAmount) {
      this.currentQuestion++;
    } else {
      this.location.back();
    }
  }
}
