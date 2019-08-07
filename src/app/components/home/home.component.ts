import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';
import {QuizResultService} from '../../services/quiz-result.service';

export interface Belt {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  started = false;

  @ViewChild('userIdInput') userIdInput;
  @ViewChild('userBeltInput') userBeltInput;

  belts: Belt[] = [
    {value: 'purple', viewValue: 'Purple'},
    {value: 'brown', viewValue: 'Brown'},
    {value: 'white', viewValue: 'White'}
  ];

  constructor(private quizService: QuizService,
              private quizResultService: QuizResultService,
              private router: Router) {
  }

  ngOnInit() {
  }

  startQuiz() {
    this.started = true;

    const uid = this.userIdInput.nativeElement.value;
    const belt = this.userBeltInput.value;

    this.quizResultService.userId = uid;

    this.quizService.registerUser(uid, belt.value).subscribe(uuid => {
      this.quizResultService.uuid = uuid;
      this.quizResultService.selectedBelt = belt;

      // Start quiz
      this.router.navigateByUrl('/question');
    });
  }
}
