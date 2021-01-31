import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GameApi } from 'src/app/models/game_api';
import { PageEvent } from '@angular/material/paginator';
import { AfterContentInit } from '@angular/core'

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games: GameApi[];
  gamesToShow: GameApi[];
  length = 0;
  lowValue = 0;
  highValue = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;
  constructor(private gameService: GameService, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.gameService.currentSearchValue.subscribe(searchValue => {
      this.gameService.searchGame(searchValue).subscribe(games => {
        this.games = games;
        this.highValue = this.lowValue + this.pageSize;
        this.length = games.length;
      })
    })
  }
  onGameClicked(game: GameApi){
    this.gameService.selectGame(game);
    this.router.navigate(['/game',game.id]);
  }

  onPageFired(event: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
