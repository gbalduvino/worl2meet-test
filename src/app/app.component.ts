import { Component, OnInit } from '@angular/core'
import { heroesData } from './mock/heroes.mock'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem('heroes', JSON.stringify(heroesData))
  }
}
