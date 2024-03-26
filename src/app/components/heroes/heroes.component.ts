import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []
  filteredHeroes$: Observable<Hero[]> | undefined
  searchControl = new FormControl('')

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.filteredHeroes$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterHeroes(value || ''))
      );
    })
  }

  filterHeroes(value: string): Hero[] {
    const filterValue = value.toLowerCase();
    return this.heroes.filter(hero => hero.name.toLowerCase().includes(filterValue));
  }

  deleteHero(heroId: number) {
    this.heroService.deleteHero(heroId).subscribe(heroes => {
      this.heroes = heroes
    })
  }
}
