import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { PlayerComponent } from './player/player.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ViewedVideosPipe } from './viewed-videos.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PlayerComponent,
    ViewedVideosPipe
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatIconModule, MatSnackBarModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
