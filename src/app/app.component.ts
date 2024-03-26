import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { heroesData } from './mock/heroes.mock'
import { LoaderService } from './services/loader.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading$?: Observable<boolean>

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = loaderService.isLoading$
  }

  ngOnInit(): void {
    localStorage.setItem('heroes', JSON.stringify(heroesData))
  }
}
