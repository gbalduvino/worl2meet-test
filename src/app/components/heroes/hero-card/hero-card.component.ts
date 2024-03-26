import { Component, EventEmitter, Input, Output } from '@angular/core'

import { Hero } from '../../../models/hero.model'
import { HeroService } from '../../../services/hero.service'

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
  @Input() hero!: Hero

  @Output() deleteEvent = new EventEmitter<number>();

  constructor(private heroService: HeroService) { }

  deleteHero() {
    console.log('Hero ID', this.hero.id)
    this.deleteEvent.emit(this.hero.id);
    // this.heroService.deleteHero(this.hero.id).subscribe(heroes => {})
  }
}
