import { Injectable } from '@angular/core';

import { Observable, fromEvent, of, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  online$: Observable<boolean>;

  constructor() { 
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
  }
}
