import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Hero } from '../models/hero.model'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = 'http://example.com/api/heroes'

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    const url = `${this.apiUrl}`
    return this.http.get<Hero[]>(url)
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Hero>(url)
  }

  addHero(hero: Partial<Hero>): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero)
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.apiUrl}/${hero.id}`
    return this.http.put<Hero>(url, hero)
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }
}
