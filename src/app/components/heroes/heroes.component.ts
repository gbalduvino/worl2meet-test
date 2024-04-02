import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []
  filteredHeroes$: Observable<Hero[]> | undefined
  searchControl = new FormControl('')

  constructor(public dialog: MatDialog, private heroService: HeroService) {}

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
      this.heroes = heroes;
      this.filteredHeroes$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterHeroes(value || ''))
      );
    })
  }

  openDeleteDialog(heroId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteHero(heroId);
      }
    });
  }
}
