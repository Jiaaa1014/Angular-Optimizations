import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  characters = []
  activatedRoute: ActivatedRoute
  swService: StarWarsService
  loadedSide = 'all'
  subscription

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute
    this.swService = swService
  }

  ngOnInit() {
    // 一個大物件，裡面有路由的訊息

    // 路由參數觸發getCharacters()
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side
      }
    )
    // 轉換陣營也觸發getCharacters()
    this.subscription = this.swService.charactersChanged.subscribe(
      () => this.characters = this.swService.getCharacters(this.loadedSide)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
