import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApi } from 'src/app/models/game_api';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  addGameForm: FormGroup;
  game: GameApi;
  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.addGameForm = this.fb.group({
      name: new FormControl('', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)]),
      description: new FormControl('', Validators.required),
      players: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)]),
      for_age: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]),
      difficulty: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]),
      avrg_time: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)]),
      producer: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)]),
      creation_date: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]),
    });
  }
  backToGames(){
    this.router.navigate(['']);
  }

  addGame() {
    if (this.addGameForm.valid) {
      const game = <GameApi>this.addGameForm.value;
      this.gameService.addGame(game).subscribe(value => {
        if (value) {
          this.router.navigate(['']);
        } else {

        }
      })
    }else{
    }
  }

}
