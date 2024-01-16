import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MindMapperResponse } from '../model/mind-map.api.interfaces';
import { StoryBoardResponse } from '../model/story-board.model';
import { Workspace } from '../enums/workspace.enum';
import { ProblemSolutionResponse } from '../model/problem-solution.model';
import { QuizResponse } from '../model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class AppContext {
  private apiUrl = `${environment.apiUrl}/categories`;
  private mindMapperData: MindMapperResponse | null = null;
  private storyBoardData: StoryBoardResponse | null = null;
  private problemSolutionData: ProblemSolutionResponse | null = null;
  private quizData: QuizResponse | null = null;
  public topic: string = "";
  public activeWorkspace: Workspace = Workspace.MindMap;

  constructor() { }


  // Method to store data
  storeMindMapperData(data: MindMapperResponse) {
    this.mindMapperData = data;
  }

  // Method to retrieve data
  retrieveMindMapperData(): MindMapperResponse | null {
    return this.mindMapperData;
  }

  storeStoryBoardData(data: StoryBoardResponse) {
    this.storyBoardData = data;
  }

  retrieveStoryBoardData(): StoryBoardResponse | null {
    return this.storyBoardData;
  }

  storeTopic(topic: string) {
    this.topic = topic;
  }

  retrieveTopic(): string {
    return this.topic;
  }

  storeActiveWorkspace(workspace: Workspace) {
    this.activeWorkspace = workspace;
  }

  retrieveActiveWorkspace(): Workspace {
    return this.activeWorkspace;
  }


  storeProblemSolutionData(data: ProblemSolutionResponse) {
    this.problemSolutionData = data;
  }

  retrieveProblemSolutionData(): ProblemSolutionResponse | null {
    return this.problemSolutionData;
  }


  storeQuizData(data: QuizResponse) {
    this.quizData = data;
  }

  retrieveQuizData(): QuizResponse | null {
    return this.quizData;
  }

}