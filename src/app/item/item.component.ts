import { Component, Input } from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
  // ListCompomnt傳的資料
  @Input() character
  swService: StarWarsService

  constructor(swService: StarWarsService) {
    this.swService = swService
  }

  onAssign(side) {
    this.swService.onSideChosen({ name: this.character.name, side })
  }
}
