import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApi } from 'src/app/models/game_api';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  editGameForm: FormGroup;
  game: GameApi;
  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.game = this.gameService.selectedGame;
    this.editGameForm = this.fb.group({
      name: new FormControl(this.game.name, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)]),
      description: new FormControl(this.game.description, Validators.required),
      players: new FormControl(this.game.players, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10)]),
      for_age: new FormControl(this.game.for_age, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20)]),
      difficulty: new FormControl(this.game.difficulty, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20)]),
      avrg_time: new FormControl(this.game.avrg_time, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20)]),
      price: new FormControl(this.game.price, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10)]),
      producer: new FormControl(this.game.producer, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)]),
      creation_date: new FormControl(this.game.creation_date, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20)]),
    });
  }
  onBackClicked(): void {
    this.router.navigate(['']);
  }
  onEditSubmitted(): void {
    const game = <GameApi>this.editGameForm.value;
    game.id = this.game.id;
    this.gameService.updateGame(game).subscribe((value) => {
      this.router.navigate(['']);
    })
  }
}

