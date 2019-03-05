import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private quizService: QuizService,
              private router: Router) {
  }

  ngOnInit() {
  }

  startQuiz() {
    const uuid = this.generateUUID();

    this.quizService.registerUser(uuid).subscribe(value => {
      if (value != null) {
        console.log('Registered user successfully');
        // Start quiz
        this.router.navigateByUrl('/question');
      } else {
        console.log('An error occurred while registering the user!');
      }
    });
  }

  generateUUID(): string {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
