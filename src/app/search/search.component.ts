import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  videoList: any;

  //debouncing search for better UX
  searchTextChanged = new Subject<string>();
  subscription;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.subscription = this.searchTextChanged.
    pipe(
      debounceTime(1000)
    ).subscribe(value => this.searchVideos(value));
  }

  searchVideos(value){
    this.http.getMethod(value).subscribe(
      (data: any) => {
        this.videoList = data.items;
        console.log(data)
      }
    )
  }
  searchKeyword(event){
    this.searchTextChanged.next(event.target.value);
  }

}
