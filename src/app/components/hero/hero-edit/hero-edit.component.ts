
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero.model';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {
  hero: Hero = {
    id: 5,
    name: '',
    realName: '',
    description: '',
    image: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit(): void {
    // Retrieve the hero ID from route parameters
    this.route.params.subscribe(params => {
      const heroId = params['id'];
      this.heroService.getHero(heroId).subscribe(hero => {
        this.hero = hero
      })
    });
  }

  onSubmit(): void {
    this.heroService.updateHero(this.hero).subscribe(heroes => {});

    this.router.navigate(['/']);
  }
}
