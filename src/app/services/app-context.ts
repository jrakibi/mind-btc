import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MindMapperResponse } from '../components/model/mind-map.api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppContext {
  private apiUrl = `${environment.apiUrl}/categories`;
  private mindMapperData: MindMapperResponse | null = null;

  constructor(private http: HttpClient) { }


  // Method to store data
  storeMindMapperData(data: MindMapperResponse) {
    this.mindMapperData = data;
  }

  // Method to retrieve data
  retrieveMindMapperData(): MindMapperResponse | null {
    return this.mindMapperData;
  }
}