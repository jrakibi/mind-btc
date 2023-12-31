import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogueResponse, MindMapperResponse } from '../components/model/mind-map.api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private baseUrl: string = `${environment.apiUrl}/openai`;

  constructor(private http: HttpClient) {}


  askGPT(question: string): Observable<string> {
    const url = `${this.baseUrl}/chat?prompt=${question}`;
    return this.http.get(url, { responseType: 'text' }); // Expecting text
  }
  
    // Send email content and receive a structured dialogue response
    emailToDialogue(emailContent: string): Observable<DialogueResponse> {
      const url = `${this.baseUrl}/email-to-dialogue`;
      // Since we are expecting a JSON object, we don't need to specify a response type here
      return this.http.post<DialogueResponse>(url, emailContent);
    }
  
    getMindMapper(topic: string): Observable<MindMapperResponse> {
      debugger
      const url = `${this.baseUrl}/mind-mapper?topic=${topic}`;
      // Since we are expecting a JSON object, we don't need to specify a response type here
      return this.http.get<MindMapperResponse>(url, { responseType: 'json' }); // Expecting text
    }

}
