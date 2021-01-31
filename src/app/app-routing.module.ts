import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesListComponent } from './features/games/games-list/games-list.component';
import { LoginFormComponent } from './features/login/login-form/login-form.component';
import { RegisterComponent } from './features/login/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AddGameComponent } from './features/add-game/add-game.component';
import { GameDetailsComponent } from './features/games/game-details/game-details.component';
import { EditGameComponent } from './features/edit-game/edit-game.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login', component: LoginFormComponent,
  },
  {
    path: 'addgame', component: AddGameComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'game/:id', component: GameDetailsComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'editgame', component: EditGameComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '', component: GamesListComponent,
    canActivate: [AngularFireAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
