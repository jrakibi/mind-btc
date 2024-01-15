import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MindmapComponent } from './components/mindmap/mindmap.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgAnimatedBorderModule } from 'ng-animated-border';
import { StoryBoardComponent } from './components/story-board/story-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AnswerDialogComponent } from './components/answer-dialog/answer-dialog.component';
import { ProblemComponent } from './components/problem/problem.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MindmapComponent,
    StoryBoardComponent,
    DashboardComponent,
    QuizComponent,
    AnswerDialogComponent,
    ProblemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    NgxGraphModule,

    DragDropModule,

    NgAnimatedBorderModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
