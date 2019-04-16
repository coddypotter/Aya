import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'player/:id', component: PlayerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
