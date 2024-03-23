import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'

import { Hero } from '../models/hero.model'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl = 'http://example.com/api/heroes'

  constructor(private http: HttpClient) { }

  // Fetch all heroes
  getHeroes(): Observable<Hero[]> {
    return of([
      {
        id: 1,
        name: 'Superman',
        realName: 'Clark Kent',
        description: 'Superman hero',
        image: 'https://example.com'
      }
    ])
  }

  // Fetch a single hero by ID
  getHero(id: number): Observable<Hero> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  // Add a new hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }

  // Update an existing hero
  updateHero(hero: Hero): Observable<any> {
    const url = `${this.apiUrl}/${hero.id}`;
    return this.http.put(url, hero);
  }

  // Delete a hero
  deleteHero(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}