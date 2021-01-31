import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './games-list/games-list.component';
import { MatCardModule } from '@angular/material/card';
import { SearchGameComponent } from './search-game/search-game.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AuthenticationService } from 'src/app/services/authentication.service';



@NgModule({
  declarations: [GamesListComponent, SearchGameComponent, GameDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [
    AuthenticationService
  ],
})
export class GamesModule { }
