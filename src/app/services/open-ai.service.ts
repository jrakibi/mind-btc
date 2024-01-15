import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogueResponse, MindMapperResponse } from '../model/mind-map.api.interfaces';
import { StoryBoardResponse } from '../model/story-board.model';
import { ProblemSolutionResponse } from '../model/problem-solution.model';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private baseUrl: string = `${environment.apiUrl}/openai`;

  constructor(private http: HttpClient) { }

  askGPT(question: string): Observable<string> {
    if (!question?.trim()) {
      return throwError(() => new Error('The question is empty or null.'));
    }
    const url = `${this.baseUrl}/chat?prompt=${encodeURIComponent(question)}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' }); // Expecting text
  }

  emailToDialogue(emailContent: string): Observable<DialogueResponse> {
    if (!emailContent?.trim()) {
      return throwError(() => new Error('The email content is empty or null.'));
    }
    const url = `${this.baseUrl}/email-to-dialogue`;
    return this.http.post<DialogueResponse>(url, { emailContent });
  }

  getMindMapper(topic: string): Observable<MindMapperResponse> {
    if (!topic?.trim()) {
      return throwError(() => new Error('The topic is empty or null.'));
    }
    const url = `${this.baseUrl}/mind-mapper?topic=${encodeURIComponent(topic)}`;
    return this.http.get<MindMapperResponse>(url);
  }

  generateStoryBoard(topic: string): Observable<StoryBoardResponse> {
    if (!topic?.trim()) {
      return throwError(() => new
        Error('The topic is empty or null.'));
    }
    const url = `${this.baseUrl}/story-board?topic=${encodeURIComponent(topic)}`;
    return this.http.get<StoryBoardResponse>(url);
  }

  generateProblemSolution(topic: string): Observable<ProblemSolutionResponse> {
    if (!topic?.trim()) {
      return throwError(() => new
        Error('The topic is empty or null.'));
    }
    const url = `${this.baseUrl}/problem-solution?topic=${encodeURIComponent(topic)}`;
    return this.http.get<ProblemSolutionResponse>(url);
  }
}
