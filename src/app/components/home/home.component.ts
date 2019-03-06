import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('userIdInput') userIdInput;

  constructor(private quizService: QuizService,
              private router: Router) {
  }

  ngOnInit() {
  }

  startQuiz() {
    const uuid = this.userIdInput.nativeElement.value;

    this.quizService.registerUser(uuid).subscribe(value => {
        // Start quiz
        this.router.navigateByUrl('/question');
    });
  }
}
