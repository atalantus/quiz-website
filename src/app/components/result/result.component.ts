import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {QuizResultService} from '../../services/quiz-result.service';

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

  @ViewChild('resultDataTable') resultDataTable;

  constructor(private quizResultService: QuizResultService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.correctAnswered = this.quizResultService.correctAnswered;
    this.totalQuestions = this.quizResultService.totalQuestions;

    this.targetResult = +(this.correctAnswered / this.totalQuestions * 100).toFixed(0);

    if (isNaN(this.targetResult)) {
      this.targetResult = 0;
    }

    if (isNaN(this.correctAnswered)) {
      this.correctAnswered = 0;
    }

    if (isNaN(this.totalQuestions)){
      this.totalQuestions = 0;
    }

    this.showResult();
  }

  async showResult() {
    await this.startResultAnimation();

    await this.delay(250);

    console.log(this.resultDataTable);
    this.resultDataTable.nativeElement.className = '';
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
