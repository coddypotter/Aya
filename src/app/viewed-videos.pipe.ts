import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'viewedVideos'
})
export class ViewedVideosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos'));
    if(viewedVideos && viewedVideos.length){
      return value.filter(
        item => !(viewedVideos.indexOf(item.id.videoId) > -1)
      )
    }else{
      return value;
    }
  }

}
