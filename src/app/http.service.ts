import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOwewoEdi1voV3k8eQsyxIydbwnBe20hY&part=snippet&type=video&maxResults=25&q=';
  constructor(private http: HttpClient) { }

  getMethod(q){
    return this.http.get(this.URL+q);
  }
}
