import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private questionId: number;

  constructor(private quizService: QuizService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion() {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));

    this.quizService.getQuestion(this.questionId).subscribe(question => {
      if (question != null) {
        console.log('Loaded question successfully');
        console.log(question);
      } else {
        console.log('An error occurred while loading the question!');
      }
    });
  }
}
