
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Hero } from '../../../models/hero.model'
import { HeroService } from '../../../services/hero.service'

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero: Hero = {
    id: Math.random(),
    name: '',
    realName: '',
    description: '',
    image: ''
  }

  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const heroId = params['id'];
      this.heroService.getHero(heroId).subscribe(hero => {
        this.hero = hero
      })
    })
  }

  onSubmit(): void {
    this.heroService.updateHero(this.hero).subscribe(() => {
      this.snackBar.open('Hero edited successfully', '', {
        duration: 3000,
        panelClass: ['success-snackbar']
      })
    })

    this.router.navigate(['/'])
  }
}
