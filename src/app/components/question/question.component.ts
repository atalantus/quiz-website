import {Component, OnInit} from '@angular/core';
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
  private questionId: number;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.questionId = 0;
    this.getQuestion();
  }

  getQuestion() {
    this.quizService.getQuestion(this.questionId).subscribe(question => {
      if (question != null) {
        console.log('Loaded question successfully');
        console.log(question);
        this.question = question;
      } else {
        console.log('An error occurred while loading the question!');
      }
    });
  }
}
