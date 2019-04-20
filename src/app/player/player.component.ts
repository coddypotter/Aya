import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../http.service';
import { ConnectionService } from '../connection.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  tag; videoId; urlParams; url: SafeResourceUrl;
  videoDetail:any;
  connectionStatus: boolean;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpService, private connection: ConnectionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.urlParams = this.route
      .paramMap
      .subscribe(params => {
        this.videoId = params.get('id');
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/' + this.videoId);

        this.getVideoDetails(this.videoId)

      });


     this.connection.online$.subscribe( status => {
       this.connectionStatus = status;
       if(!status){
         this.snackBar.open('No Connection', 'Dismiss', {duration: 5000})
       }
     });
  }

  getVideoDetails(videoId){
    this.http.getVideoDescription(videoId).subscribe(
      (data: any) => {
        this.videoDetail = data.items[0]

      }
    )
  }
  ngOnDestroy(){
    const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos'));
    if(viewedVideos){
      viewedVideos.push(this.videoDetail.id)
      localStorage.setItem('viewedVideos',JSON.stringify(viewedVideos))
    }else{
      localStorage.setItem('viewedVideos', JSON.stringify([this.videoDetail.id]))
    }
  }

}
