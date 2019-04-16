import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  tag; videoId; urlParams; url: SafeResourceUrl;
  videoDetail:any;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpService) { }

  ngOnInit() {
    this.urlParams = this.route
      .paramMap
      .subscribe(params => {
        this.videoId = params.get('id');
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/' + this.videoId);

        this.getVideoDetails(this.videoId)

      });
  }

  getVideoDetails(videoId){
    this.http.getVideoDescription(videoId).subscribe(
      (data: any) => {
        this.videoDetail = data.items[0]
        console.log(' >> ', this.videoDetail)

      }
    )
  }

}
