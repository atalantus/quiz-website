import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './components/question/question.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
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
