import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss']
})
export class SearchGameComponent implements OnInit {
  searchValue: string = '';
  constructor(private gameService: GameService){}

  ngOnInit(): void {
  }
  
  searchGames(): void{
    this.gameService.changeSearchValue(this.searchValue);
  }

  clearSearch(){
    this.searchValue = '';
    this.gameService.changeSearchValue(this.searchValue);
  }
}
