import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QuizResultService} from '../../services/quiz-result.service';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements AfterViewInit {

  targetResult: number;
  resultValue = -1;
  resultValueStr: string;
  correctAnswered: number;
  totalQuestions: number;

  @ViewChild('resultDataContainer') resultDataContainer;

  constructor(private quizService: QuizService,
              public quizResultService: QuizResultService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  showDetails() {
    this.router.navigateByUrl('/resultDetails');
  }

  ngAfterViewInit() {
    this.correctAnswered = this.quizResultService.correctAnsweredQuestions;
    this.totalQuestions = this.quizResultService.totalQuestions;

    this.targetResult = +(this.correctAnswered / this.totalQuestions * 100).toFixed(0);

    if (isNaN(this.targetResult)) {
      this.targetResult = 0;
    }

    if (isNaN(this.correctAnswered)) {
      this.correctAnswered = 0;
    }

    if (isNaN(this.totalQuestions)) {
      this.totalQuestions = 0;
    }

    this.showResult();
  }

  async showResult() {
    await this.startResultAnimation();

    await this.delay(250);

    this.resultDataContainer.nativeElement.className = '';
  }

  async startResultAnimation() {
    while (this.resultValue < this.targetResult) {

      if (this.targetResult - this.resultValue >= 1) {
        this.resultValue += 1;
      } else {
        this.resultValue = this.targetResult;
      }
      this.resultValueStr = this.resultValue.toFixed(0);

      this.changeDetectorRef.detectChanges();

      await this.delay(25);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
