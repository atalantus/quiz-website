import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionComponent} from './components/question/question.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatFormFieldModule, MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule, MatSelectModule
} from '@angular/material';
import {HomeComponent} from './components/home/home.component';
import {ResultComponent} from './components/result/result.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HomeComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // TODO: Remove it when a real server is ready to receive requests.

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false, passThruUnknownUrl: false, delay: 1000}
    ),

    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
