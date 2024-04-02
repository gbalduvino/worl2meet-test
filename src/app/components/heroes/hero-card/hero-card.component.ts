import { Component, EventEmitter, Input, Output } from '@angular/core'

import { Hero } from '../../../models/hero.model'

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() hero!: Hero

  @Output() deleteEvent = new EventEmitter<number>();

  deleteHero() {
    this.deleteEvent.emit(this.hero.id);
  }
}
