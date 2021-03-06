import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from '../connection.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  videoList: any;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  scrolledViewPort = 0;
  nextPageToken: string;


  //debouncing search for better UX
  searchTextChanged = new Subject<string>();
  subscription;
  connectionStatus: boolean;

  constructor(private http: HttpService, private router: Router, private scrollDispatcher: ScrollDispatcher, 
    private cD: ChangeDetectorRef, private sw: SwUpdate, private connection: ConnectionService,
    private snackBar: MatSnackBar) {

  }

  checkForSWUpdates(){
    if(this.sw.isEnabled){
      this.sw.available.subscribe(
        data => window.location.reload()
      )
    }
  }

  init(){
    this.videoList = JSON.parse(localStorage.getItem('snapshot'));
    if (this.videoList) {
      this.scrolledViewPort = parseInt(localStorage.getItem('scrollId'));
      this.nextPageToken = localStorage.getItem('pageId');
      this.scrollTo(this.scrolledViewPort)
    }
  }

  ngOnInit() {
    this.init()
    this.subscription = this.searchTextChanged.
    pipe(
      debounceTime(500)
    ).subscribe(value => this.searchVideos('q='+value));

    this.connection.online$.subscribe( status => this.connectionStatus = status);
  }

  showOfflineSnackBar(){
    this.snackBar.open('No Connection', 'Dismiss', {duration: 5000})
  }
  ngAfterViewInit() { // Pagination using page code by youtube api and VirtualScroll APi
    this.scrollDispatcher.scrolled().pipe(
      filter(event => this.viewport.measureScrollOffset('bottom') < 2)
    ).subscribe(event => {
      this.searchVideos('pageToken='+this.nextPageToken, true);

    })
  }
  scrollEvent(event){
    this.scrolledViewPort = event;
  }

  scrollTo(index) {
    this.viewport.scrollToIndex(index, 'smooth')
  }
  searchVideos(value, append=false){
    this.http.searchVideos(value).subscribe(
      (data: any) => {
        if(append){
          this.videoList = [...this.videoList.concat(data.items)];
          this.cD.detectChanges();
        }else{
          this.videoList = data.items;
        }
        this.nextPageToken = data.nextPageToken;
      }
    )
  }
  searchKeyword(event){
    this.searchTextChanged.next(event.target.value);
  }

  openPlayer(video) {
    // Handle online offline mode of the app
    if(!this.connectionStatus){
      this.showOfflineSnackBar()
      return;
    }
    //store state
    localStorage.removeItem('snapshot')
    localStorage.removeItem('scrollId')
    localStorage.removeItem('pageId')
    localStorage.setItem('snapshot', JSON.stringify(this.videoList))

    //store scrolled index
    localStorage.setItem('scrollId', "" + this.scrolledViewPort);
    localStorage.setItem('pageId', this.nextPageToken);


    this.router.navigateByUrl('player/'+video.id.videoId)
  }

}
