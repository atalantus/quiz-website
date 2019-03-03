import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './components/question/question.component';

const routes: Routes = [
  {path: '', redirectTo: '/question', pathMatch: 'full'},
  {path: 'question', component: QuestionComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
