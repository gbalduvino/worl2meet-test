import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Hero } from '../../../models/hero.model';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent {
  hero: Partial<Hero> = {
    id: 5,
    name: '',
    realName: '',
    description: '',
    image: ''
  };

  constructor(private router: Router, private snackBar: MatSnackBar, private heroService: HeroService) {}

  onSubmit(): void {
    this.heroService.addHero(this.hero).subscribe(heroes => {
      this.snackBar.open('Operation completed successfully', '', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    });

    this.router.navigate(['/']);
  }
}
