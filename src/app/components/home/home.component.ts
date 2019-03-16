import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';
import {QuizResultService} from '../../services/quiz-result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('userIdInput') userIdInput;

  constructor(private quizService: QuizService,
              private quizResultService: QuizResultService,
              private router: Router) {
  }

  ngOnInit() {
  }

  startQuiz() {
    const uid = this.userIdInput.nativeElement.value;

    this.quizResultService.userId = uid;

    this.quizService.registerUser(uid).subscribe(uuid => {
      this.quizResultService.uuid = uuid;
      // Start quiz
      this.router.navigateByUrl('/question');
    });
  }
}
