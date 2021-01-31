import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameApi } from 'src/app/models/game_api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: GameApi;
  isGameLoaded = false;
  isAdmin = false;
  constructor(private gameService: GameService, private auth: AngularFireAuth, private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.game = this.gameService.getSelectedGame(params.id.toString());
        this.isGameLoaded = true;
      }
    })
    this.authService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    })
  }

  backToGames(): void {
    this.router.navigate(['']);
  }

  editGame(): void {
    this.router.navigate(['/editgame']);
  }

  deleteGame() {
    this.gameService.deleteGame(this.game.id).subscribe((value) => {
      this.router.navigate(['']);
    })
  }

}
