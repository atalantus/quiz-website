import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './components/question/question.component';
import {HomeComponent} from './components/home/home.component';
import {ResultComponent} from './components/result/result.component';
import {ResultDetailsComponent} from './components/result-details/result-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'result', component: ResultComponent},
  {path: 'resultDetails', component: ResultDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
