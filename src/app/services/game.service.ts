import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameApi } from '../models/game_api';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesv2: Observable<GameApi[]>;
  private gamesValue: GameApi[];
  selectedGame: GameApi;
  readonly ROOT_URL = 'https://localhost:3000';
  private searchSource = new BehaviorSubject<string>("");
  currentSearchValue = this.searchSource.asObservable();

  constructor(public afs: AngularFirestore, private http: HttpClient) { }

  changeSearchValue(searchValue: string) {
    this.searchSource.next(searchValue);
  }

  searchGame(searchValue: string) {
    this.gamesv2 = this.http.post<GameApi[]>(this.ROOT_URL + '/search', { text: searchValue });
    this.gamesv2.subscribe((games) => {
      this.gamesValue = games;
    })
    return this.gamesv2;
  }
  
  selectGame(game: GameApi) {
    this.selectedGame = game;
  }
  getSelectedGame(id: string) {
    if (typeof this.gamesValue === 'undefined') {
      return null;
    } else {
      this.selectedGame = this.gamesValue.find(x => x.id == id);
      return this.selectedGame;
    }
  }
  getGamesV2() {
    this.gamesv2 = this.http.get<GameApi[]>(this.ROOT_URL + '/games');
    return this.gamesv2;
  }
  addGame(game: GameApi) {
    return this.http.post(this.ROOT_URL + '/game', game);
  }
  deleteGame(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };
    return this.http.delete(this.ROOT_URL + '/game', options);
  }
  updateGame(game: GameApi) {
    return this.http.put(this.ROOT_URL + '/game', game);
  }
}
